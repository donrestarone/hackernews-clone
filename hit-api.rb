require 'httparty'

article_count = 40
num = 0
articles = []
top_articles = []
load_30 = false
load_30_top_stories = true
counter = 0

	
# if load_30_top_stories == true
# 	##get top stories here
# 		top_stories_ids_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
# 		top_story_ids = JSON.parse(HTTParty.get(top_stories_ids_url).body)

# 	i = 0
# 	for i in 1..30 do
# 		story_url = "https://hacker-news.firebaseio.com/v0/item/#{top_story_ids[i]}.json?"
# 		top_article = JSON.parse(HTTParty.get(story_url).body)
# 		top_articles.push(top_article)
# 		if top_articles.count == 30
# 			break
# 		end
# 	end

# 	top_articles.each do |article|
# 		p article["title"]
# 		p article["url"]
# 	end
# end



if load_30_top_stories == true
	##get top stories here
		top_stories_ids_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
		top_story_ids = JSON.parse(HTTParty.get(top_stories_ids_url).body)

	i = 0
	for i in 30..60 do
		story_url = "https://hacker-news.firebaseio.com/v0/item/#{top_story_ids[i]}.json?"
		top_article = JSON.parse(HTTParty.get(story_url).body)
		top_articles.push(top_article)
		if top_articles.count == 30
			break
		end
	end

	top_articles.each do |article|
		p article["title"]
		p article["url"]
	end
end















p top_articles.count



if load_30 == true
	##get latest stories here
	max_item_number_url = "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty"
	max_num = JSON.parse(HTTParty.get(max_item_number_url).body)

	article_count.times do 
		max_num  -= 1
		url = "https://hacker-news.firebaseio.com/v0/item/#{max_num}.json?print=pretty"
		an_article = JSON.parse(HTTParty.get(url).body)
		if an_article["title"]
			articles.push(an_article)
		else
			article_count += 1
		end
		
	end 
	p articles.count
	articles.each do |article|
		p article["title"]
		p article["url"]
	end
end





#p top_story_ids.count

