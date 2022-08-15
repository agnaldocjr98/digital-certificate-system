import { GetClientsModel } from "../models";

export interface GetClientsParams {
  search: string;
}

export interface UCGetClients {
  get(params: GetClientsParams): Promise<GetClientsModel>;
}
