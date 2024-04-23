import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";




export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
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