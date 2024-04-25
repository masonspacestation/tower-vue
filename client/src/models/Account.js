export class Account {
  constructor(data) {
    this.id = data.id ? data.id : null
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
  }
}
