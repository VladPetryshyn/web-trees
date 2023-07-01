import { loginValidation, validateHandleFields } from "@/helpers/validation";
import { db } from "../db";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { SECRET } from "@/helpers/config";

interface authenticationDataI {
  password: string,
  email: string
}
interface regisrationDataI extends authenticationDataI {
  username: string;
}

export async function authenticateUser({ password, email }: authenticationDataI) {
  validateHandleFields(loginValidation, { password, email })
  try {
    const userU = await db.User.findOne({ username: email }).select(["-createdAt", "-updatedAt"])
    const userE = await db.User.findOne({ email }).select(["-createdAt", "-updatedAt"])

    const user = userU ?? userE

    if (!user || !bcrypt.compareSync(password, user.hash)) {
      throw { email: "Username or password is incorrect", }
    }


    try {
      const token = jwt.sign({ id: userU.id, username: userU.username }, String(SECRET), { expiresIn: "7d" })
      return {
        ...userU.toJSON(),
        token
      }
    }
    catch {
      throw { error: "Internal Server Error" }
    }
  } catch (err) {
    if (typeof err === "string") throw { error: "Internal Server Error" }
    throw err
  }
}

export async function createUser({ username, password, email }: regisrationDataI) {
  if (await db.User.findOne({ username })) return { username: `Username: ${username} is already taken.` }
  if (await db.User.findOne({ email })) return { email: `E-mail: ${email} is already taken.` }

  try {
    const user = new db.User({
      username,
      email,
      hash: bcrypt.hashSync(password, 10)
    });

    await user.save();
  } catch (err) {
    return { error: "Server side error" }
  }
}
