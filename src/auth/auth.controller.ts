import { Body, ConsoleLogger, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signUpDto, loginDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('signup')
    signup(@Body() dto: signUpDto) {
        return this.authService.signUp(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: loginDto) {
        return this.authService.login(dto)
    }
}

