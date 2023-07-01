import { protectHandler } from "@/server/handlers/helpers"
import { getTrees } from "@/server/handlers/trees"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const data = await protectHandler(getTrees)()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Some error occured" }, { status: 400 })
  }
}
