import { Account } from "./Account.js"




export class Comment{
  constructor(data){
    this.id = data.id
    // this.creatorId = data.creatorId
    this.eventId = data.eventId
    
    // from db
    this.body = data.body
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    // virtual
    this.creatorId = data.creatorId ? new Account(data.creatorId) : null
  }

}