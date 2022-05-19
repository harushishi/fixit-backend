import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }
}
