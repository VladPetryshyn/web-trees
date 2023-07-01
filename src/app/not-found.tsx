import Link from "next/link"

export const metadata = {
  title: "404",
  description: "This page doesn't exist"
}

export default function NotFound() {
  return <div className="h-96 flex flex-col items-center justify-end">
    <h2 className="text-light-fg text-center text-8xl">404</h2>
    <h2 className="text-light-fg text-center text-4xl mt-5">Do you want to be redirected to <Link href="/" className="text-light-grey"> Home page </Link></h2>
  </div>
}
