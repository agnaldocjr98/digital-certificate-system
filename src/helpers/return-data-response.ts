import { HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import {
  InvalidCredentialsError,
  ServerOffline,
  UnexpectedError,
} from "@/domain/errors";

export function ReturnDataResponse(
  code: HttpStatusCode,
  httpResponse: HttpResponse
): any {
  switch (code) {
    case HttpStatusCode.ok:
      return httpResponse.body;
    case HttpStatusCode.created:
      return httpResponse.body;
    case HttpStatusCode.unauthorized:
      throw new InvalidCredentialsError();
    case HttpStatusCode.badGateway:
      throw new ServerOffline();
    default:
      throw new UnexpectedError();
  }
}
