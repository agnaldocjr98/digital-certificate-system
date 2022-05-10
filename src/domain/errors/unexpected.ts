export class UnexpectedError extends Error {
  constructor () {
    super('Algo deu errado. Tente novamente mais tarde.')
    this.name = 'UnexpectedError'
  }
}
