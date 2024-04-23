import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"




class TowerEventsService{
  async getEvents() {
    const response = await api.get('api/events')
    console.log('events!', response.data);
    const towerEvents = response.data.map(towerEventsData => new TowerEvent(towerEventsData))
    AppState.towerEvents = towerEvents
  }

}


export const towerEventsService = new TowerEventsService