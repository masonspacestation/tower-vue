import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class TicketsService {
  async deleteTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId).populate('profile event')
    if (!ticketToDelete) throw new Error('No ticket found with that Id')
    if (ticketToDelete.accountId != userId) throw new Forbidden(`This is not your ticket, so you cannot delete it.`)

    await ticketToDelete.populate('profile')
    await ticketToDelete.deleteOne()

    return `Ticket ${ticketToDelete} has been deleted.`
  }
  async getMyTickets(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return myTickets
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