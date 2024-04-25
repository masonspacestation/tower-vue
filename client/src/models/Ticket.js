import { Account } from "./Account.js"
import { Profile } from "./Profile.js"
import { TowerEvent } from "./TowerEvent.js"




export class Ticket{
  constructor(data){
  this.id = data.id
  this.accountId = data.accountId
  this.eventId = data.eventId
  
  this.createdAt = new Date(data.createdAt)
  this.updatedAt = new Date(data.updatedAt)
  this.profile = data.profile ? new Profile(data.profile) : null
  this.event = data.event ? new TowerEvent(data.event) : null
}
}