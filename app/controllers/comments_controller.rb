class CommentsController < ApplicationController
  	before_action :set_post
  	#skip_before_action :ensure_login, only: [:create]
  	def index
	    @comments = @post.comments.includes(:author)
	    render json: @comments, :include => {:author => {:only => :username}}
	end

  	def create

	    @comment = @post.comments.new comment_params
	    if @post.save
	      render json: @comment, :include => {:author => {:only => :username}}
	    else
	      render json: @comment.errors
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