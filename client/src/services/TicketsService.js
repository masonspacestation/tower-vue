import { AppState } from "../AppState.js";
import { Ticket } from "../models/Ticket.js";
import { api } from "./AxiosService.js"




class TicketsService{
  async getTicketHolders(eventData) {
    const response = await api.get(`api/events/${eventData}/tickets`)
    console.log('tickets!', response.data);
    const tickets = response.data.map(eventData => new Ticket(eventData))
    AppState.tickets = tickets
  }
  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    console.log('New Ticket', response.data);
    const ticket = new Ticket(response.data)
    console.log('Made it this far');
AppState.tickets.push(ticket)
  }

}


export const ticketsService = new TicketsService