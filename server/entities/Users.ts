
import { ObjectType, Field, ID } from "type-graphql";

import { prop, getModelForClass } from "@typegoose/typegoose";
import { Rooms } from "./Rooms";
import { Ref } from "typegoose";


// TODO: add @prop to @Field when I will be adding typegoose


export type RoleT = `admin` | `doctor` | `assistant` | `receptionist`



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

   @Field(() => String,{ defaultValue: null })
   @prop({ ref: Rooms, })
   rooms!: Ref<Rooms>
}



export const UsersModel = getModelForClass(Users)