import { reactive } from 'vue'
import { TowerEvent } from "./models/TowerEvent.js"
import { Ticket } from "./models/Ticket.js"
import { Comment } from "./models/Comment.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/ 
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Ticket[]} */
tickets: [],

/** @type {Ticket[]} */
accountTickets: [],

/**@type {TowerEvent[]} */
towerEvents:[],

/**@type {TowerEvent} */
activeTowerEvent: null,

/**@type {Comment[]} */
eventComments: []
})
