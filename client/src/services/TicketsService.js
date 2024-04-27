/* eslint-disable no-console */
import { AppState } from "../AppState.js";
import { Ticket } from "../models/Ticket.js";
import { api } from "./AxiosService.js"




class TicketsService{
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    console.log('deleting ticket', response.data);
    const ticketIndex = AppState.accountTickets.findIndex(ticket => ticket.id == ticketId)

    if(ticketIndex == -1) throw new Error('Error with find index funtion')
    // AppState.activeTowerEvent.ticketCount--
    AppState.accountTickets.splice(ticketIndex, 1)
  }
  async getMyTickets() {
    const response = await api.get('account/tickets')
    console.log('my tickets', response.data);
    const accountTickets = response.data.map(ticketData => new Ticket(ticketData))
    AppState.accountTickets = accountTickets
  }
  async getTicketHolders(eventData) {
    const response = await api.get(`api/events/${eventData}/tickets`)
    console.log('tickets!', response.data);
    const tickets = response.data.map(eventData => new Ticket(eventData))
    AppState.tickets = tickets
  }
  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    console.log('New Ticket', response.data);
    const ticket = new Ticket(response.data);
    // AppState.activeTowerEvent.ticketCount.push(ticket) //this line gave me the error "null reading 'push'". I was trying this to have the remaining ticket count on the eventdetails page update when I grab a ticket
    AppState.activeTowerEvent.ticketCount++
    AppState.tickets.push(ticket)
    // FIXME increase ticketCount on activeTowerEvent
  }

}


export const ticketsService = new TicketsService