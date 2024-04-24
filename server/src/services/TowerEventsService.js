import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class TowerEventsService {
  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getTowerEventById(eventId)
    if (eventToCancel.creatorId != userId) throw new Forbidden(`You cannot cancel somebody else's party`)

    eventToCancel.isCanceled = !eventToCancel.isCanceled
    await eventToCancel.save()
    return `${eventToCancel.name} has been canceled`
  }


  async editEvent(eventId, eventData) {
    // const eventToUpdate = await this.getTowerEventById(eventId)

    const eventToUpdate = await dbContext.TowerEvents.findById(eventId)

    eventToUpdate.name = eventData.name ?? eventToUpdate.name
    eventToUpdate.description = eventData.description ?? eventToUpdate.description

    await eventToUpdate.save()
    return eventToUpdate
  }
  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator')
    return towerEvent
  }
  async createTowerEvent(newTowerEventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(newTowerEventData)
    await newTowerEvent.populate('creator')
    return newTowerEvent
  }
  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator')
    return towerEvents
  }

}


export const towerEventsService = new TowerEventsService