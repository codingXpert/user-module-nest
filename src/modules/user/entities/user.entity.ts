import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
    
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number

    @Column({
        name: "first_name",
        length: 30,
        type: "varchar"
    })
    firstName: string


    @Column({
        name: "last_name",
        length: 30,
        type: "varchar"
    })
    lastName: string

    @Column({
        name: "user_name",
        length: 30,
        type: "varchar"
    })
    userName: string

    @Column({
        name: "email",
        length: 30,
        type: "varchar"
    })
    email: string

    @Column({
        name: "password",
        length: 30,
        type: "varchar"
    })
    password: string
  length: any;

}
