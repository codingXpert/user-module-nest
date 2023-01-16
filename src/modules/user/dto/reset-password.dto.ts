import { IsNotEmpty, IsString, Matches } from "class-validator"
import { MESSAGES, REGEX  } from "src/password-utils";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    password: string

    @IsNotEmpty()
    @IsString()
    conformPassword: string
}