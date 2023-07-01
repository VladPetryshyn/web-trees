import { getLink } from "@/server/handlers/links";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { link: string } }) {
  const { link } = params;
  const { host } = new URL(req.url)

  const notFoundURL = new URL(`${host}/404`)
  if (!link) return NextResponse.redirect(notFoundURL)

  const data = await getLink(link)

  if (!data) return NextResponse.redirect(notFoundURL)

  return NextResponse.redirect(new URL(data.link))
}
