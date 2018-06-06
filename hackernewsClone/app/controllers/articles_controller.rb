class ArticlesController < ApplicationController
  def index
  end

  def api
  	##endpoint
    ##localhost -> /articles/api?count=30&type=topstories
    #heroku -> https://clone-hackernews.herokuapp.com/articles/api?count=90&type=topstories
  	count = params[:count]
  	type = params[:type]
  	data = fetch_hacker_news(count, type)
  	render json: data
  end
end
