import { getModelForClass,prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";



@ObjectType()
export class Status {
   @Field(() => ID)
   _id: string

   @Field()
   @prop({ required: true })
   color!: string

   @Field()
   @prop({ required: true, unique: true })
   description!: string
}


export const StatusModel = getModelForClass(Status)