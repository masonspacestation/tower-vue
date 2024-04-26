import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class CommentsService {


  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId).populate('creator')
    if (!commentToDelete) throw new Error('No comment found with that Id')
    if (commentToDelete.creatorId != userId) throw new Forbidden(`You didn't say it, so you can't take it back`)

    await commentToDelete.populate('creator')
    await commentToDelete.deleteOne()

    return `Comment ${commentToDelete.body} has been deleted.`
  }


  async getEventComments(eventId) {
    const eventComments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return eventComments
  }


  async createComment(newCommentData) {
    const newComment = await dbContext.Comments.create(newCommentData)
    await newComment.populate('creator')
    return newComment
  }
}


export const commentsService = new CommentsService