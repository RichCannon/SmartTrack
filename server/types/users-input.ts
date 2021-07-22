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

   @Field({ nullable: true })
   specialization: string

}

@InputType()
export class AddRoomToDoctor {
   @Field(() => ID)
   doctorId: string

   @Field(() => ID)
   roomId: string

}