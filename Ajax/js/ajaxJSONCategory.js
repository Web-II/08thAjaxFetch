class JokeApp{
	getData(){
		// creatie van het XHR object
		const request = new XMLHttpRequest();
		// open(Methode, URL, Asynchronous, Username, Password)
		request.open('GET', 'https://official-joke-api.appspot.com/jokes/programming/random');
		// callback functie declareren om de request af te handelen
		request.onreadystatechange = () => {
			// readyState en status worden geëvalueerd
			if (request.readyState === 4 && request.status === 200) {
				const joke = JSON.parse(request.responseText);
				this.toHtml(...joke);
			}
		};
		// verstuur het verzoek naar de server
		request.send();
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





