import {
    Controller,
    Get,
    UseGuards,
    Request,
    Post,
    Body,
    HttpStatus,
    Res
} from "@nestjs/common";
import { ChangePasswordDto } from "../user/dto/change-password.dto"; 
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // User Details From The SignIn Token
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    //Change Password After SignIn
    @UseGuards(JwtAuthGuard)
    @Post('change')
    async reset(
        @Request() req,   // access to the current logedIn token
        @Res() res: Response,
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        const data = await this.authService.changePassword(req.user.userId, changePasswordDto)

        res.status(HttpStatus.OK).send({
            success: HttpStatus.OK,
            data,
            message: "Password changed successfully",
        });
    }
}