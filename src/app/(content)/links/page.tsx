import { LinksItems } from "./components/items"

export const metadata = {
  title: "Links",
  description: "Links page"
}

export default function Links() {
  return <div className="mt-10">
    <h2 className="text-5xl text-light-fg md:text-7xl">Links</h2>
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <LinksItems />
    </div>
  </div>
}
