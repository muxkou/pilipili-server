import { Controller, Get, Param, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { DTOTransformInterceptor } from 'src/common/interceptors/dto.interceptor';
import { UserDTO } from './dto/user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  @UseInterceptors(new DTOTransformInterceptor(UserDTO))
  async fetch(@Request() req) {
    return await this.userService.getUser(req.user.uuid);
  }
}
