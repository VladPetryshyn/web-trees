import { protectHandler } from "@/server/handlers/helpers";
import { deleteLink } from "@/server/handlers/links";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (!body.handle) return NextResponse.json({ error: "No handle provided" }, { status: 400 })
    await protectHandler(deleteLink)(body.handle)
    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })
  }
}
