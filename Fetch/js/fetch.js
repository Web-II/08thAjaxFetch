function fetchRequest(url){
	return fetch(url)
  		.then(body => body.json());
}

class JokeApp{
	getData(){
		fetchRequest('https://official-joke-api.appspot.com/random_joke') //retourneert promise object met response
  		.then(data => this.toHtml(data)) //resolve promise (argument is response)
		.catch(error => console.error(error)); //reject promise (argument is error)		
	}
	toHtml(joke) {
		document.getElementById("category").innerHTML = `Category = ${joke.type}`;
		document.getElementById("setup").innerHTML = `Q: ${joke.setup}`;
		document.getElementById("punchline").innerHTML = `A: ${joke.punchline}`;
	}
}

const init = function(){
	const jokeApp = new JokeApp();
	document.getElementById("joke").onclick = () => {
		jokeApp.getData();
	};
}

window.onload = init;