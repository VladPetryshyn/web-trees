import { protectHandler } from "@/server/handlers/helpers"
import { getTree } from "@/server/handlers/trees"
import { NextResponse } from "next/server"

export const GET = async (_: any, context: { params: { handle: string } }) => {
  const { handle } = context.params;
  try {
    const data = await protectHandler(getTree, false)(handle)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })
  }
}
