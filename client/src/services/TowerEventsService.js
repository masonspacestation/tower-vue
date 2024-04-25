/* eslint-disable no-console */
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"




class TowerEventsService{
  async deleteEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    console.log('Event to delete', response.data);
    const eventToDelete = AppState.towerEvents.findIndex(event => event.id == eventId)
    AppState.towerEvents.splice(eventToDelete, 1)
    console.log('Event deleted', eventToDelete);
  }


  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    console.log('Event to cancel', response.data);
    // const eventToCancel = AppState.towerEvents.find(event => event.id == eventId)
    // const eventToCancel = new TowerEvent(response.data)
    // console.log('this one', eventToCancel);
    const eventToCancel = AppState.activeTowerEvent
eventToCancel.isCanceled = !eventToCancel.isCanceled
console.log('canceled', eventToCancel);
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