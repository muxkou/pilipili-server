import { Controller, Get, UseGuards, Request, Post, ParseIntPipe, Param, UsePipes, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ParsePhonePipe } from '../../common/pipes/phone.pip';
import secret from 'src/config/secret.config';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserCheckerDTO } from './dto/userChecker.dto';
const CryptoJS = require("crypto-js");

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('exsit')
  async isExsit(@Query() query: UserCheckerDTO) {
    if (query.phone === undefined && query.nickName === undefined) {
      throw new HttpException("Need phone or nickName to check user isExist", HttpStatus.BAD_REQUEST);
    };
    const found = await this.authService.findOneUser(query);
    return found != undefined;
  }
  
  @Get('send/:phone')
  sendCode(@Param('phone', new ParsePhonePipe()) phone) {
    // Mock Send Vertify Code to user's phone
    const encryptJson = JSON.stringify({ code: "0000", phone: phone });
    const encrypted = CryptoJS.AES.encrypt(encryptJson, secret.aes).toString(); 
    return { data: true, encryptedCode: encrypted };
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const { encryptedCode, phone, code } = body;
    const user = await this.authService.validateUserByPhoneCode(encryptedCode, phone, code);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {    
    const user = await this.authService.findOneUser({ phone: body.phone, nickName: body.nickName });
    if (user) {
      throw new HttpException("The nickName or phone is already registered", HttpStatus.BAD_REQUEST);
    }
    return this.authService.register(body);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return req.user;
  }
}
