import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";




export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .delete('/:eventId', this.cancelEvent)
      .put('/:eventId', this.editEvent)
  }


  async cancelEvent(request, response, next) {
    const eventId = request.params.eventId
    const userId = request.userInfo.id
    const message = await towerEventsService.cancelEvent(eventId, userId)
    response.send(message)
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
}