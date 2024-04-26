import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class TowerEventsService {

  async deleteEvent(eventId, userId) {
    const eventToDelete = await this.getTowerEventById(eventId)
    if (!eventToDelete) throw new Error(`No event with ID: ${eventId}`)
    if (eventToDelete.creatorId != userId) throw new Forbidden(`You cannot delete somebody else's party`)

    await eventToDelete.populate('creator ticketCount')
    await eventToDelete.deleteOne()

    return `Event ${eventToDelete.name} has been deleted`
  }


  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getTowerEventById(eventId)
    if (eventToCancel.creatorId != userId) throw new Forbidden(`You cannot cancel somebody else's party`)

    eventToCancel.isCanceled = !eventToCancel.isCanceled
    await eventToCancel.save()
    return `${eventToCancel.name} has been canceled`
  }


  async editEvent(eventData, userId) {
    // const eventToUpdate = await this.getTowerEventById(eventId)

    const eventToUpdate = await dbContext.TowerEvents.findById(eventData.id)

    // FIXME Use userId to validate they are the owner of eventToUpdate
    if (eventToUpdate.creatorId != userId) throw new Forbidden(`You cannot decide what to do at somebody else's party`)


    // FIXME See if event is cancelled, if it is throw an error
    if (eventToUpdate.isCanceled == true) throw new Error(`That event has been canceled, and cannot be modified`)

    eventToUpdate.name = eventData.name ?? eventToUpdate.name
    eventToUpdate.description = eventData.description ?? eventToUpdate.description

    await eventToUpdate.save()
    return eventToUpdate
  }
  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator ticketCount')
    return towerEvent
  }
  async createTowerEvent(newTowerEventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(newTowerEventData)
    await newTowerEvent.populate('creator ticketCount')
    return newTowerEvent
  }
  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator ticketCount')
    return towerEvents
  }

}


export const towerEventsService = new TowerEventsService