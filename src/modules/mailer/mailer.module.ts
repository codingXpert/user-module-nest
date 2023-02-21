import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";

require('dotenv').config();
// import * as dotenv from 'dotenv' 
// dotenv.config()

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.TRANSPORT_HOST,
                auth :{
                    user: process.env.API_USER,
                    pass: process.env.API_PASS
                }
            }
        })
    ]
})
export class Mailer{}