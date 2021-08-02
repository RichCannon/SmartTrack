import { Field, ID, InputType } from "type-graphql"
import { MaxLength } from "class-validator";



@InputType()
export class CreateRoomInput {
   @MaxLength(3)
   @Field()
   name: string

}

@InputType()
export class UpdateRoomInput {
   
   @Field()
   roomName: string

   @Field()
   id: string
}

@InputType()
export class DeleteRoomInput {
   @Field()
   id: string
}

@InputType()
export class SetRoomStatusInput {
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

