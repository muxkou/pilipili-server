import { Controller, Get, UseGuards, Request, Post, ParseIntPipe, Param, UsePipes, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ParsePhonePipe } from '../../common/pipes/phone.pip';
import secret from 'src/config/secret.config';
import { LoginDTO } from './dto/login.dto';
const CryptoJS = require("crypto-js");

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return req.user;
  }
}
