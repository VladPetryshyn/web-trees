import { TreesItems } from "./components/items";

export const metadata = {
  title: "Trees",
}

export default async function TreesPage() {
  return <div className="mt-10">
    <h2 className="text-5xl text-light-fg md:text-7xl">Trees</h2>
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <TreesItems />
    </div>
  </div>
}
