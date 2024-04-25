import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";




export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
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


  async deleteTicket(request, response, next) {
    try {
      const ticketId = request.params.ticketId
      const userId = request.userInfo.id
      const message = await ticketsService.deleteTicket(ticketId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }


}