import { Field,  ID,  InputType } from "type-graphql"

import { Status } from "../entities/Status"



@InputType()
export class CreateStatusInput implements Partial<Status> {
   @Field()
   color!: string

   @Field()
   description!: string

}


@InputType()
export class UpdateStatusInput extends CreateStatusInput {
   @Field(() => ID)
   _id: string

}