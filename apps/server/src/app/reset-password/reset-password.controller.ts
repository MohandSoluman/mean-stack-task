import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResetPasswordService } from './reset-password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('forgot')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() res: Response
  ) {
    const result = await this.resetPasswordService.forgotPassword(
      forgotPasswordDto.email
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('reset')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response
  ) {
    const result = await this.resetPasswordService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword
    );
    return res.status(HttpStatus.OK).json(result);
  }
}
