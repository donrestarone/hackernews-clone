document.addEventListener("DOMContentLoaded", function(event){
	var url = 'https://clone-hackernews.herokuapp.com/articles/api?count=90&type=topstories';
	var localHost = 'http://localhost:3000/articles/api?count=90&type=topstories';
	// select UL that will be the parent of all the articles 
	var articleList = document.getElementById('articles');
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
	// add listener fir the readstate change
	request.addEventListener("readystatechange", processRequest, false);
	request.onreadystatechange = processRequest;
	// process the response
	function processRequest(e) {
		if (request.readyState === 4 && request.status === 200) {
			var response = JSON.parse(request.responseText);
			console.log(response)
		}
	}
});