import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

import { Field, ID, ObjectType } from "type-graphql";



@ObjectType()
export class Rooms {
   @Field(() => ID)
   _id: string

   @Field(() => String)
   @prop({ ref: 'Users' })
   ownerId: Types.ObjectId

   @prop()
   @Field()
   status: string

   @prop()
   @Field()
   name: string

   @prop({ required: false })
   @Field({ nullable: true })
   description: string

   @prop({ required: false })
   @Field({ nullable: true })
   color: string
}

export const RoomsModel = getModelForClass(Rooms)