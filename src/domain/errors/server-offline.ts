export class ServerOffline extends Error {
  constructor() {
    super("Servidor offline, tente mais tarde!");
    this.name = "ServerOffiline";
  }
}
