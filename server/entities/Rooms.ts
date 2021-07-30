import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { Status } from "./Status";




@ObjectType()
export class Rooms {
   @Field(() => ID)
   _id: string

   @Field(() => String, { nullable: true, defaultValue: null })
   @prop({ ref: 'Users', required: false, default: null })
   ownerId: Types.ObjectId | null

   @prop({ ref: 'Status' })
   @Field(() => String)
   status: Types.ObjectId

   @prop()
   @Field()
   name: string


   @Field(() => Status, { nullable: true, })
   statusData: Status

}

export const RoomsModel = getModelForClass(Rooms)