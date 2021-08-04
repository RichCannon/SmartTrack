
import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "typegoose";
import { IsEmail, IsPhoneNumber, Max, Min } from "class-validator";

import { RoleT } from "../types/types";
import { Rooms } from "./Rooms";



@ObjectType()
export class Users {

   @Field(() => ID)
   _id: string

   @Field()
   @prop()
   @Max(16)
   @Min(4)
   name: string

   @Field()
   @prop()
   password: string

   @Field()
   @prop({ unique: true })
   @IsEmail()
   email: string

   @Field()
   @prop()
   role: RoleT

   @Field({ nullable: true })
   @prop({ required: false })
   @Max(16)
   @Min(4)
   specialization?: string

   @Field()
   @prop({ unique: true })
   @IsPhoneNumber()
   phoneNum: string

   @Field(() => [ID], { defaultValue: [] })
   @prop({ ref: 'Rooms', })
   rooms!: [Ref<Rooms>]

   @Field(() => [Rooms], { nullable: true })
   docRooms: [Rooms]


}



export const UsersModel = getModelForClass(Users)