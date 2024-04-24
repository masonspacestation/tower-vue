/* eslint-disable no-console */
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"




class TowerEventsService{
  async cancelEvent(eventId) {
    const response = await api.put(`api/events/${eventId}`)
    console.log('Event to cancel', response.data);
    // const eventToCancel = AppState.towerEvents.find(event => event.id == eventId)
    // const eventToCancel = new TowerEvent(response.data)
    // console.log('this one', eventToCancel);
AppState.activeTowerEvent.isCanceled = !AppState.activeTowerEvent.isCanceled
console.log('canceled', AppState.activeTowerEvent);
  }
  async updateEvent(eventId) {
    const response = await api.put(`api/events/${eventId}`)
    console.log('Event to update', response.data);
  }
  async createNewEvent(newEventData) {
    const response = await api.post('api/events', newEventData)
   console.log('creating new event', response.data);
   const newEvent = new TowerEvent(response.data)
   AppState.towerEvents.push(newEvent) 
   return newEvent
  }

  
  async getTowerEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    console.log('found event', response.data);
    const activeTowerEvent = new TowerEvent(response.data)
    AppState.activeTowerEvent = activeTowerEvent
    console.log('Appstate!', AppState.towerEvents);
  }


  async getEvents() {
    const response = await api.get('api/events')
    console.log('events!', response.data);
    const towerEvents = response.data.map(towerEventsData => new TowerEvent(towerEventsData))
    AppState.towerEvents = towerEvents
  }

}


export const towerEventsService = new TowerEventsService