class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def fetch_hacker_news(article_count, type)
  	if type == "topstories" && article_count.to_i < 500
	  		top_articles = []
			top_stories_ids_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
			top_story_ids = JSON.parse(HTTParty.get(top_stories_ids_url).body)
		i = 0
		if article_count.to_i > 30
			start_num = article_count.to_i - 30
		else
			start_num = 0
		end
			for i in (start_num.to_i)..article_count.to_i do
				story_url = "https://hacker-news.firebaseio.com/v0/item/#{top_story_ids[i]}.json?"
				top_article = JSON.parse(HTTParty.get(story_url).body)
				top_articles.push(top_article)
				if top_articles.count == 30
					break
				end
			end
		return top_articles
		else
			return {"success": "false"}
		end
  end
end
