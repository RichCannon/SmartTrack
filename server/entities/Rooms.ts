import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { Users } from "./Users";



@ObjectType()
export class Rooms {
   @Field(() => ID)
   _id: string

   @Field(() => String, { nullable: true, })
   @prop({ ref: 'Users', required: false })
   ownerId: Types.ObjectId

   @prop({ ref: 'Status' })
   @Field(() => String)
   status: Types.ObjectId

   @prop()
   @Field()
   name: string

   @Field(() => [Users], { nullable: true })
   doc: [Users]

}

export const RoomsModel = getModelForClass(Rooms)