export class ServerOffiline extends Error {
  constructor() {
    super("Servidor offline, tente mais tarde!");
    this.name = "ServerOffiline";
  }
}
