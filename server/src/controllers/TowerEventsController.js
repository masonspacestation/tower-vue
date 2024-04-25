import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";




export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId/tickets', this.getEventTickets)
      .get('/:eventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .delete('/:eventId', this.cancelEvent)
      .delete('/:eventId', this.deleteEvent)
      .put('/:eventId', this.editEvent)
  }


  async deleteEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const user = request.userInfo
      const message = await towerEventsService.deleteEvent(eventId, user.Id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const message = await towerEventsService.cancelEvent(eventId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const eventData = request.body
      const towerEvent = await towerEventsService.editEvent(eventId, eventData)
      response.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }


  async getTowerEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const towerEvent = await towerEventsService.getTowerEventById(eventId)
      response.send(towerEvent)
    } catch (error) {
      next(error)

    }
  }


  async createTowerEvent(request, response, next) {
    try {
      const user = request.userInfo
      const newTowerEventData = request.body
      newTowerEventData.creatorId = user.id
      const newTowerEvent = await towerEventsService.createTowerEvent(newTowerEventData)
      response.send(newTowerEvent)
    }
    catch (error) {
      next(error)
    }
  }
  async getTowerEvents(request, response, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()
      response.send(towerEvents)
    }
    catch (error) {
      next(error)
    }
  }

  async getEventTickets(request, response, next) {
    try {
      const eventId = request.params.eventId
      const eventTickets = await ticketsService.getEventTickets(eventId)
      response.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }
}