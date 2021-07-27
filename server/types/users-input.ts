import { Field, ID, InputType } from "type-graphql";

import { Users } from '../entities/Users'
import { RoleT } from "./types";



@InputType()
export class CreateUserInput implements Partial<Users> {
   @Field()
   name: string

   @Field()
   email: string

   @Field()
   role: RoleT

   @Field()
   phoneNum: string

   @Field({ nullable: true })
   specialization?: string

}

@InputType()
export class UpdateUserInput extends CreateUserInput {
   @Field()
   _id: string
}

@InputType()
export class AddRoomToDoctorInput {
   @Field(() => ID)
   doctorId: string

   @Field(() => ID)
   roomId: string

}