import { Field, ID, InputType } from "type-graphql"




@InputType()
export class CreateRoomInput {

   @Field()
   name: string

}

@InputType()
export class SetRoomStatusInput{
   @Field(() => ID)
   roomId: string

   @Field(() => ID)
   statusId: string

}