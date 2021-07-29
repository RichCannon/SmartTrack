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


// @InputType()
// export class ChangeAllRoomOwnerInput {
//    @Field(() => String)
//    prevDocId: string

//    @Field(() => String)
//    roomId: string
// }

@InputType()
export class ChangeAllRoomOwnerInputArr {
   @Field(() => [String])
   roomsId: string[]

   @Field(() => String)
   docId: string
}

