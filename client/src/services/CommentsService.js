/* eslint-disable no-console */
import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { api } from "./AxiosService.js"




class CommentsService {


  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    console.log('Deleting comment', response.data);
    const commentIndex = AppState.eventComments.findIndex(comment => comment.id == commentId)

    if (commentIndex == -1) throw new Error('Finding the wrong index')
    AppState.eventComments.splice(commentIndex, 1)
  }
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