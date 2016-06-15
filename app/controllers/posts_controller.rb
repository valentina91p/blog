class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.includes(:author)
    render json: @posts, :include => {:author => {:only => :username}}
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.includes(:author).find(params[:id])
    render json: @post, :include => {:author => {:only => :username}}
  end

  
  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    @post.author = current_user
    if @post.save
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :content)
    end
end
