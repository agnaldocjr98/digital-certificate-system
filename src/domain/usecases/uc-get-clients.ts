import { GetClientsModel } from "../models";

export interface GetClientsParams {
  search: string;
}

export interface UCGetClients {
  getClients(params: GetClientsParams): Promise<GetClientsModel>;
}
