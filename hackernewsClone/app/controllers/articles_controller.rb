class ArticlesController < ApplicationController
  def index
  end

  def api
  	##endpoint
  	#/articles/api?count=30&type=topstories
  	count = params[:count]
  	type = params[:type]
  	data = fetch_hacker_news(count, type)
  	render json: data
  end
end
