import { Field,  InputType } from "type-graphql";
import { ObjectId } from "mongodb";
import { RoleT, Users } from '../entities/Users'


export type Ref<T> = T | ObjectId;


@InputType()
export class CreateUserInput implements Partial<Users> {
   @Field()
   name: string

   @Field()
   email: string

   @Field()
   role: RoleT

}