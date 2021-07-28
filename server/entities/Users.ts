
import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "typegoose";

import { RoleT } from "../types/types";
import { Rooms } from "./Rooms";
import { Status } from "./Status";



@ObjectType()
export class Users {

   @Field(() => ID)
   _id: string

   @Field()
   @prop()
   name: string

   @Field()
   @prop()
   email: string

   @Field()
   @prop()
   role: RoleT

   @Field({nullable: true})
   @prop({ required: false })
   specialization?: string

   @Field()
   @prop()
   phoneNum: string

   @Field(() => [ID], { defaultValue: [] })
   @prop({ ref: 'Rooms', })
   rooms!: [Ref<Rooms>]

   @Field(() => [Rooms], { nullable: true })
   docRooms: [Rooms]


   @Field(() => [Status], { nullable: true, })
   statusData: [Status]
}



export const UsersModel = getModelForClass(Users)