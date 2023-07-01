import { getUser } from "@/server/handlers/helpers";
import { TreeForm } from "./components/form";

interface Props {
  params: {
    treeId: string
  }
}

export const metadata = {
  title: "Tree page"
}

export default async function TreePage({ params: { treeId } }: Props) {
  const user = getUser()

  return <div className="my-7">
    <h2 className="text-light-fg text-5xl text-center block lg:text-left lg:text-8xl">Tree</h2>
    <TreeForm user={user} handle={treeId} />
  </div>
}
