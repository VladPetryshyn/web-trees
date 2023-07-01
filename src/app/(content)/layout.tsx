import { getUser } from "@/server/handlers/helpers"
import { redirect } from "next/navigation";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const user = getUser()
  if (!user) return redirect("/login")
  return children
}
