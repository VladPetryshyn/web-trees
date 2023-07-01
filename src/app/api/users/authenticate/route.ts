import { authenticateUser } from "@/server/handlers/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { loginValidation, validateHandleFields } from "@/helpers/validation";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const err = validateHandleFields(loginValidation, body)
    if (err) return NextResponse.json(err, { status: err.code })

    const user = await authenticateUser(body);
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    cookies().set("user", user.token, {
      secure: true,
      expires: expiryDate
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })
  }
}
