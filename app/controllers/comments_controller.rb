class CommentsController < ApplicationController
  	before_action :set_post

  	def index
	    @comments = @post.comments.includes(:author)
	    render json: @comments, :include => {:author => {:only => :name}}
	end

  	def create
	    @comment = @post.comments.new comment_params
	    @comment.author = current_user
	    if @post.save
	      render json: @comment, :include => {:author => {:only => :name}}
	    else
	      render json: @comment.errors, status: :unprocessable_entity
	    end
  	end
   	private
	    # Use callbacks to share common setup or constraints between actions.
	    def set_post
	      @post = Post.find(params[:post_id])
	    end
	    def comment_params
	      params.require(:comment).permit(:content, :anonymous)
	    end
end