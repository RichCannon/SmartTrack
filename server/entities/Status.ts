import { Field, ID, ObjectType } from "type-graphql";



@ObjectType()
export class Rooms {
   @Field(() => ID)
   id: string

   @Field()
   color: string

   @Field()
   description: string
}