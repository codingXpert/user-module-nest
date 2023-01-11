import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto{

    @IsNotEmpty()
    @IsString()
    oldPassword:string

    @IsNotEmpty()
    @IsString()
    newPassword:string
}