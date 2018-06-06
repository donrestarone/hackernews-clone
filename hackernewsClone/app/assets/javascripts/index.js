document.addEventListener("DOMContentLoaded", function(event){
	var count = 30
	var url = 'https://clone-hackernews.herokuapp.com/articles/api?count=' + count + '&type=topstories';
	var localHost = 'http://localhost:3000/articles/api?count=' + count + '&type=topstories';
	var safe = false
	
	// make request to internal api
	var request = new XMLHttpRequest();

	request.open('GET', url, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			console.log('success');
		} else {
			console.log('fail');
		}
	}
	// sends the request to the server
	request.send();
	// add listener for the ready state change
	request.addEventListener("readystatechange", processRequest, false);
	// request.onreadystatechange = processRequest;
	var articleList = document.createElement('ul');
	// process the response
	function processRequest(e) {
		if (request.readyState === 4 && request.status === 200) {
			
			var body = document.querySelector('.container')
			body.append(articleList);

			var response = JSON.parse(request.responseText);
			
			response.forEach(function(article){
				var articleUl = document.createElement('ul');
				var articleLi = document.createElement('li');
				var articleLinkliWithTitle = document.createElement('a');
				var authorPTag = document.createElement('p');
				if ("kids" in article) {
					authorPTag.innerText = article.score + ' points|' + ' by ' + article.by + ' ' + article.kids.length + ' comments'
				} else {
					authorPTag.innerText = article.score + ' points|' + ' by ' + article.by + ' no comments'
				}

				articleLinkliWithTitle.setAttribute('href', article.url);
				articleLinkliWithTitle.innerText = article.title;

				articleLi.appendChild(articleLinkliWithTitle);
				articleLi.appendChild(authorPTag);
				articleList.append(articleLi);
				safe = true
				
			});
			
			
		}
	}	


	document.addEventListener=document.addEventListener || document.attachEvent;
	document.addEventListener('scroll',function(ev){
	    var st = getScrollTop();
	    if(!st){
	            console.log('top');
	    }
	    if((st+document.documentElement.clientHeight)>=document.documentElement.scrollHeight ){
	            console.log('bottom');
			count += 30
	    	alert('bottom');
			
			var request = new XMLHttpRequest();
			var infiniteUrlLocal = 'http://localhost:3000/articles/api?count=' + count + '&type=topstories';
			var infiniteUrl = 'https://clone-hackernews.herokuapp.com/articles/api?count=' + count + '&type=topstories';
			request.open('GET', infiniteUrl, true);
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					console.log('success');
					var data = request.responseText
					var dataObj = JSON.parse(data);
					dataObj.forEach(function(article){
						var articleUl = document.createElement('ul');
						var articleLi = document.createElement('li');
						var articleLinkliWithTitle = document.createElement('a');
						var authorPTag = document.createElement('p');
						if ("kids" in article) {
							authorPTag.innerText = article.score + ' points|' + ' by ' + article.by + ' ' + article.kids.length + ' comments'
						} else {
							authorPTag.innerText = article.score + ' points|' + ' by ' + article.by + ' no comments'
						}

						articleLinkliWithTitle.setAttribute('href', article.url);
						articleLinkliWithTitle.innerText = article.title;

						articleLi.appendChild(articleLinkliWithTitle);
						articleLi.appendChild(authorPTag);
						articleList.append(articleLi);
						console.log('article count is' + count)
					})
				} else {
					console.log('fail');
				}
			}
			request.send()
	    }                     
	});


	function getScrollTop(){
	    return Math.max(document.documentElement.scrollTop,document.body.scrollTop);
	}


	// testing scroll bottom
	document.addEventListener('scroll', function (event) {
	    if (document.body.scrollHeight == 
	        document.body.scrollTop +        
	        window.innerHeight && safe === true) {
	    	
	    }
	});

	//listener for the bottom of the page

});