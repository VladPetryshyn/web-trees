import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"
import { SECRET } from "@/helpers/config";


export const verifyJWT = (token: string) => jwt.verify(token, String(SECRET))

export interface User extends JwtPayload {
  id: string;
  username: string;
}

export const getUser = (): User | undefined => {
  try {
    const token = cookies().get("user");
    if (!token) return;

    const data = verifyJWT(token.value)
    return data as User;
  } catch {
    return;
  }
}

export const protectHandler = (func: any, isRequired = true) => {
  const user = getUser();
  if (!user && isRequired) throw new Error("Unauthenticated")
  return func(user)
}
