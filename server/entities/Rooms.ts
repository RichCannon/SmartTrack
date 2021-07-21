import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";



@ObjectType()
export class Rooms {
   @Field(() => ID)
   _id: string

   @prop()
   @Field()
   ownerId: string

   @prop()
   @Field(() => ID)
   status: string
   
   @prop()
   @Field()
   name: string
}

export const RoomsModel = getModelForClass(Rooms)