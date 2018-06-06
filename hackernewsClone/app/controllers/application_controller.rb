class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def fetch_hacker_news(article_count, type)
  		top_articles = []
		top_stories_ids_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
		top_story_ids = JSON.parse(HTTParty.get(top_stories_ids_url).body)
	i = 0
	for i in 0..article_count.to_i do
		story_url = "https://hacker-news.firebaseio.com/v0/item/#{top_story_ids[i]}.json?"
		top_article = JSON.parse(HTTParty.get(story_url).body)
		top_articles.push(top_article)
		if top_articles.count == 30
			break
		end
	end
	return top_articles
  end
end
