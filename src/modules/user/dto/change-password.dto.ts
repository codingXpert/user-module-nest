import { IsNotEmpty, IsString, Matches } from "class-validator";
import { MESSAGES, REGEX  } from "src/password-utils";

export class ChangePasswordDto{

    @IsNotEmpty()
    @IsString()
    oldPassword:string

    @IsNotEmpty()
    @IsString()
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    newPassword:string
}