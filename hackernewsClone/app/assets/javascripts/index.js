document.addEventListener("DOMContentLoaded", function(event){
	var url = 'https://clone-hackernews.herokuapp.com/articles/api?count=90&type=topstories';
	var localHost = 'http://localhost:3000/articles/api?count=90&type=topstories';
	var safe = false
	
	// make request to internal api
	var request = new XMLHttpRequest();

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

	// process the response
	function processRequest(e) {
		if (request.readyState === 4 && request.status === 200) {
			var articleList = document.createElement('ul');
			var body = document.querySelector('.container')
			body.append(articleList);

			var response = JSON.parse(request.responseText);
			
			response.forEach(function(article){
				var articleUl = document.createElement('ul');
				var articleLi = document.createElement('li');
				var articleLinkliWithTitle = document.createElement('a');

				articleLinkliWithTitle.src = article.url;
				console.log(articleLinkliWithTitle.src)
				articleLinkliWithTitle.innerText = article.title;

				articleLi.appendChild(articleLinkliWithTitle);
				articleList.append(articleLi);
				safe = true
				
			});
			

		}
	}	

	// var loadMore = function(){
	// 	for (var i = 0; i < 30; i++) {

	// 	}
	// }
			// testing scroll bottom
			document.addEventListener('scroll', function (event) {
			    if (document.body.scrollHeight == 
			        document.body.scrollTop +        
			        window.innerHeight && safe === true) {
			    	alert('bottom');
					var request = new XMLHttpRequest();

					request.open('GET', localHost, true);
					request.onload = function() {
						if (request.status >= 200 && request.status < 400) {
							console.log('success');
						} else {
							console.log('fail');
						}
					}
					processRequest()
			    }
			});

	//listener for the bottom of the page

});