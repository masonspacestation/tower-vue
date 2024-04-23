import { dbContext } from "../db/DbContext.js"




class TicketsService {
  async createTicket(newTicketData) {
    const newTicket = await dbContext.Tickets.create(newTicketData)
    await newTicket.populate('profile')
    return newTicket
  }

}


export const ticketsService = new TicketsService