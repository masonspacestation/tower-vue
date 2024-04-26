import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js"




class CommentsService {
  async getEventComments(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    console.log('Comments!', response.data);
    const comments = response.data.map(commentData => new Comment(commentData))
    AppState.eventComments = comments
  }
  async createNewComment(commentData) {
    const response = await api.post('api/comments', commentData)
    console.log('comment', response.data);
    const newComment = new Comment(response.data)
    AppState.eventComments.push(newComment)
  }

}


export const commentsService = new CommentsService