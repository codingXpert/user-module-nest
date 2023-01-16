import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports:[
        MailerModule.forRoot({
            transport:{
                host:'0.0.0.0',
                port:'1025'
            },
            defaults:{
                from:'admin@gmail.com'
            }
        })
    ],
    controllers:[],
    providers:[]
})
export class Mailer{}