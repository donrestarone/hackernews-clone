document.addEventListener("DOMContentLoaded", function(event){
	var count = 30
	var url = 'https://clone-hackernews.herokuapp.com/articles/api?count=' + count + '&type=topstories';
	var localHost = 'http://localhost:3000/articles/api?count=' + count + '&type=topstories';
	var safe = false
	var loadingModal = document.getElementById('loading');
	// make request to internal api
	var request = new XMLHttpRequest();
	// to show modal for loading

	if (safe === false) {
		loadingModal.style.display = 'block';
	}
	request.open('GET', localHost, true);
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
			var main = document.createElement('main');
			var body = document.querySelector('.container');
			body.append(main);
			main.classList.add('container');
			main.append(articleList);

			var response = JSON.parse(request.responseText);
			
			response.forEach(function(article){
				var articleUl = document.createElement('ul');
				var articleLi = document.createElement('li');
				var articleLinkliWithTitle = document.createElement('a');
				var authorPTag = document.createElement('p');
				if ("kids" in article) {
					authorPTag.innerText = article.score + ' points|' + ' by ' + article.by + '| ';
					var commentLink = document.createElement('a');
					commentLink.setAttribute('href', 'https://news.ycombinator.com/item?id=' + article.id);
					commentLink.innerText = article.kids.length + ' comments';
					authorPTag.appendChild(commentLink);
				} else {
					authorPTag.innerText = article.score + ' points|' + ' by ' + article.by + ' no comments';
				}

				articleLinkliWithTitle.setAttribute('href', article.url);
				articleLinkliWithTitle.innerText = article.title;

				articleLi.appendChild(articleLinkliWithTitle);
				articleLi.appendChild(authorPTag);
				articleList.append(articleLi);
				loadingModal.style.display = 'none';
				safe = true
				
			});
			
			
		}
	}	

	poll = true
	document.addEventListener=document.addEventListener || document.attachEvent;

	document.addEventListener('scroll',function(ev){
		var st = getScrollTop();
		
		if(!st){
				console.log('top');
		}
		if((st+document.documentElement.clientHeight)>=document.documentElement.scrollHeight && poll == true ){
				console.log('bottom');
				poll = false;
			count += 30
			console.log('bottom');
			var loadingPTag = document.createElement('p');
			loadingPTag.innerText = 'Loading Articles';
			articleList.append(loadingPTag);
			// loadingModal.style.display = 'block';
			var request = new XMLHttpRequest();
			var infiniteUrlLocal = 'http://localhost:3000/articles/api?count=' + count + '&type=topstories';
			var infiniteUrl = 'https://clone-hackernews.herokuapp.com/articles/api?count=' + count + '&type=topstories';
			request.open('GET', infiniteUrlLocal, true);
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					console.log('success');
					var data = request.responseText
					var dataObj = JSON.parse(data);
					// break for each 
					// try {
						var endOfTopStories = document.createElement('li');
						if (dataObj.success !== "false" && dataObj.error !== 'Permission denied') {
							for (var i = 0; i < dataObj.length; i++) {
								if (dataObj[i].title !== undefined)	{
									var articleUl = document.createElement('ul');
									var articleLi = document.createElement('li');
									var articleLinkliWithTitle = document.createElement('a');
									var authorPTag = document.createElement('p');
									if ("kids" in dataObj[i]) {
										authorPTag.innerText = dataObj[i].score + ' points|' + ' by ' + dataObj[i].by + '| ';
										var commentLink = document.createElement('a');
										commentLink.setAttribute('href', 'https://news.ycombinator.com/item?id=' + dataObj[i].id);
										commentLink.innerText = dataObj[i].kids.length + ' comments';
										authorPTag.appendChild(commentLink);
									} else {
										authorPTag.innerText = dataObj[i].score + ' points|' + ' by ' + dataObj[i].by + ' no comments';
									}
									loadingPTag.style.display = 'none';
									articleLinkliWithTitle.setAttribute('href', dataObj[i].url);
									articleLinkliWithTitle.innerText = dataObj[i].title;

									articleLi.appendChild(articleLinkliWithTitle);
									articleLi.appendChild(authorPTag);
									articleList.append(articleLi);
									console.log('article count is' + count)
									
									// loadingModal.style.display = 'none';
								} else if (dataObj[i].title == undefined) {
									endOfTopStories.innerText = 'End Of Top Stories';
									articleList.append(endOfTopStories);
									break;
									// if (endOfTopStories.classList === 'excepti_on') throw BreakException;
								}
							}
							poll = true
						}
					// } catch (e) {
					// 	// if (e !== BreakException) throw e;
					// }
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