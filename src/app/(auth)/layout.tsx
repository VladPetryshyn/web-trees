import { getUser } from "@/server/handlers/helpers"
import { redirect } from "next/navigation";

export const metadata = {
  title: "Authentication",
  description: "Authenticate into web trees"
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = getUser();

  if (user) redirect("/trees")
  return children
}
