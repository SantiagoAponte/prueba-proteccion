import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Gallery } from "../../galery/entities";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"name",type:"varchar", length:"30"})
    name!:string;

    @OneToOne(type => Gallery,
        {
            cascade: true, 
            // nullable:false, 
            // eager:true, 
        })
    @JoinColumn()
    profileImage:Gallery;


}
