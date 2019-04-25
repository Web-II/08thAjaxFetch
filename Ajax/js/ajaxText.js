class JokeApp{
	getData(){
		// creatie van het XHR object
		const request = new XMLHttpRequest();
		// open(Methode, URL, Asynchronous, Username, Password)
		request.open('GET', 'https://official-joke-api.appspot.com/random_joke');
		// callback functie declareren om de request af te handelen
		request.onreadystatechange = () => {
			// readyState en status worden geëvalueerd
			if (request.readyState === 4 && request.status === 200) {
				console.log(request.responseText);
			}
		};
		// verstuur het verzoek naar de server
		request.send();
	}
}

const init = function(){
	const jokeApp = new JokeApp();
	document.getElementById("joke").onclick = () => {
		jokeApp.getData();
	};
}

window.onload = init;





