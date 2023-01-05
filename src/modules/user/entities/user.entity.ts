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
        type: "varchar",
        nullable: true
    })
    firstName: string


    @Column({
        name: "last_name",
        length: 30,
        type: "varchar",
        nullable: false
    })
    lastName: string

    @Column({
        name: "user_name",
        length: 30,
        type: "varchar",
        nullable: false
    })
    userName: string

    @Column({
        name: "email",
        length: 30,
        type: "varchar"
    })
    email: string

    @Column({
        name: "password"
    })
    password: string
}
