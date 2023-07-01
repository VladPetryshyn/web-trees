import { req } from "@/server/apiHelper";
import { useToggle } from "./useToggle"

export const useRequests = (initialLoading?: boolean) => {
  const [isLoading, toggleIsLoading] = useToggle(initialLoading);
  const dataFetcher = async (url: string, method: string, body?: any) => {
    if (!initialLoading) toggleIsLoading();
    const resp = await req(url, method, body)

    const data = await resp.json()

    setTimeout(toggleIsLoading, 300);
    if (resp.ok) return { data }
    return { errors: data }
  }

  return [isLoading, dataFetcher, toggleIsLoading] as [boolean, ((url: string, method: string, body?: any) => Promise<{ data: any; errors?: undefined; } | { errors: any; data?: undefined; }>), () => void];
}
