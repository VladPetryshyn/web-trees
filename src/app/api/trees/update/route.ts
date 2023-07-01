import { treeFormValidation, validateHandleFields } from "@/helpers/validation";
import { protectHandler } from "@/server/handlers/helpers";
import { editTree } from "@/server/handlers/trees";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const err = validateHandleFields(treeFormValidation, body)
    if (err) return NextResponse.json(err, { status: err.code })

    await protectHandler(editTree)(body.editTreeHandle, body)
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })

    return NextResponse.json({ ...error as object }, { status: 400 })
  }
}
