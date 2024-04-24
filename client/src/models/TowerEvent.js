import { Account } from "./Account.js"




export class TowerEvent{
  constructor(data){
    //inputs
    this.name = data.name
    this.startDate = new Date(data.startDate)
    this.location = data.location
    
    this.description = data.description
    this.coverImg = data.coverImg
    this.type = data.type
    
    //dynamic
    this.capacity = data.capacity
    this.isCanceled = data.isCanceled
    
    //automatic
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}