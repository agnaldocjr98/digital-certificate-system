import { GetInfoClientModel } from "../models/model-get-info-client";

export interface GetInfoClientParams {
  uid: string;
}

export interface UCGetInfoClient {
  getInfoClient(params: GetInfoClientParams): Promise<GetInfoClientModel>;
}
