import { protectHandler } from "@/server/handlers/helpers"
import { getLinks } from "@/server/handlers/links"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const data = await protectHandler(getLinks)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })
  }
}
