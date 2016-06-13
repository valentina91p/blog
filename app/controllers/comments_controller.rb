class CommentsController < ApplicationController
  	before_action :set_post
  	skip_before_action :ensure_login, only: [:create]
  	def create
	    @comentario = @post.comments.new comment_params
	    if logged_in?
	      @comentario.autor = current_user
	      @comentario.fecha = Date.current
	    end
	    if @post.save
	      redirect_to @post, notice: 'Tu comentario fue registrado.'
	    else
	      redirect_to @post, notice: 'Tu comentario no pudo ser creado.'
	    end
  	end
   	private
	    # Use callbacks to share common setup or constraints between actions.
	    def set_post
	      @post = Post.find(params[:post_id])
	    end
	    def comment_params
	      params.require(:comment).permit(:contenido, :anonimo)
	    end
end