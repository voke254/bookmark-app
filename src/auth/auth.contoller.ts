import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    //authService: AuthService;
    constructor(private authService: AuthService) {}
        //this.authService = authService
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }
}
