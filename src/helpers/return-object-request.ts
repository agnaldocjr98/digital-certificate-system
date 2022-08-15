import { HttpRequest } from "@/data/protocols/http";

export function ReturnObjectRequest(
  endpoint: string,
  method: "get" | "post" | "put" | "delete",
  params: any = ""
): HttpRequest {
  const dataRequest: HttpRequest = {
    url: `${process.env.API_BASEURL}${endpoint}`,
    method: method,
    ...(params && { body: params }),
    headers: {
      "Content-type": "application/json",
      Authorization: process.env.REACT_APP_AUTH_HEADER,
    },
  };
  return dataRequest;
}
