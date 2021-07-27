import { Field, ID, InputType } from "type-graphql"




@InputType()
export class CreateRoomInput {
   @Field(() => ID)
   status: string

   @Field()
   name: string

   @Field(() => String)
   ownerId: string
}

@InputType()
export class SetRoomStatusInput{
   @Field(() => ID)
   roomId: string

   @Field(() => ID)
   statusId: string

}