export const req = async (uri: string, method: string, body?: any, withCache = false,) => await fetch(`/api${uri}`, {
  method: method.toUpperCase(),
  mode: "cors",
  cache: withCache ? undefined : "no-cache",
  body: body ? JSON.stringify(body) : undefined
})
