import {
    Controller,
    Get,
    UseGuards,
    Request,
    Post,
    Body,
    HttpStatus,
    Res,
    UnauthorizedException
} from "@nestjs/common";
import { ChangePasswordDto } from "../user/dto/change-password.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from 'express';
import { ForgetPasswordDto } from "../user/dto/forget-password.dto";
import appConfig from "src/secretConfig/app.config";
import { UserService } from "../user/user.service";
import { ResetPasswordDto } from "../user/dto/reset-password.dto";

@Controller('/auth')
export class AuthController {
    jwt = require('jsonwebtoken');
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

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
    ): Promise<void> {
        const data = await this.authService.changePassword(req.user.userId, changePasswordDto)

        res.status(HttpStatus.OK).send({
            success: HttpStatus.OK,
            data,
            message: "Password changed successfully",
        });
    }

    // Forget Password
    @Post('/forget')
    async forgetPassword(@Res() res: Response,
        @Body() body: ForgetPasswordDto
    ): Promise<void> {
        const user = await this.authService.forgetPassword(body);
        res.status(HttpStatus.OK).send({
            success: HttpStatus.OK,
            // user,
            message: `Password Reset Link Has Been Sent To Your Email:- ${user.email} `,
        });
    }

    @Post('/resetPassword/:id/:token')
    async resetPassword(@Request() req,
        @Res() res: Response,
        @Body() body: ResetPasswordDto) {

        const { id, token } = req.params;
        const user = await this.userService.findOne(+id)
        if (user.userName) {
            const secret = appConfig().appSecret + user.password;

            try {
                const payload = this.jwt.verify(token, secret);
                if (payload)
                    res.send(await this.authService.setPassword(body));
            } catch (err) {
                console.log(err.message);
                res.send(err);
            }
        } else {
            throw new UnauthorizedException('Invalid User')
        }
    }
}