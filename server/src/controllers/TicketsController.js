import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";




export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
  }


  async createTicket(request, response, next) {
    try {
      const newTicketData = request.body
      const user = request.userInfo
      newTicketData.accountId = user.id
      const newTicket = await ticketsService.createTicket(newTicketData)
      response.send(newTicket)
    } catch (error) {
      next(error)
    }
  }



}