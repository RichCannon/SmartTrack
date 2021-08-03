import { AuthChecker } from "type-graphql";

import { MyContextT } from "../types/types";
import { getCookie } from "../utils/getCookie";


export const customAuthChecker: AuthChecker<MyContextT> = ({ context: { req } },) => {

   return !!req.headers.cookie && !!getCookie(`token`, req.headers.cookie)
};