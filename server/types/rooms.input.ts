import { Field, ID, InputType } from "type-graphql"

import { Rooms } from "../entities/Rooms"



@InputType()
export class CreateRoomInput implements Partial<Rooms> {
   @Field(() => ID)
   status: string

   @Field()
   name: string

   @Field()
   ownerId: string
}

@InputType()
export class SetRoomStatusInput{
   @Field(() => ID)
   roomId: string

   @Field(() => ID)
   statusId: string

}