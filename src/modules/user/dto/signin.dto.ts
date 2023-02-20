import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @IsString()
    @IsNotEmpty()
    userName: string

    @IsString()
    @IsNotEmpty()
    password: string
}