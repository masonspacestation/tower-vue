import { dbContext } from "../db/DbContext.js"




class TowerEventsService {
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