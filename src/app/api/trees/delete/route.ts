import { protectHandler } from "@/server/handlers/helpers";
import { deleteTree } from "@/server/handlers/trees";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await protectHandler(deleteTree)(body.handle)
    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })
  }
}
