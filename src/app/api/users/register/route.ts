import { registrValidation, validateHandleFields } from "@/helpers/validation";
import { createUser } from "@/server/handlers/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const err = validateHandleFields(registrValidation, body);
    if (err) return NextResponse.json(err, { status: err.code })
    const resp = await createUser(body)
    if (!resp) return NextResponse.json({}, { status: 200 });

    return NextResponse.json(resp, { status: 409 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })
  }
}
