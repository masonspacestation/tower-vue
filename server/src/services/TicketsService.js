import { dbContext } from "../db/DbContext.js"




class TicketsService {
  async getMyTickets(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
  }
  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    return tickets
  }
  async createTicket(ticketData) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('profile event')
    return newTicket
  }

}


export const ticketsService = new TicketsService