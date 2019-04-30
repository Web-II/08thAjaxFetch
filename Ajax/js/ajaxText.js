function ajaxRequest(url){
	// creatie van het XHR object
	const request = new XMLHttpRequest();
	// open(Methode, URL, Asynchronous, Username, Password)
	request.open('GET', url);
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

class JokeApp{
	getData(){
		ajaxRequest('https://official-joke-api.appspot.com/random_joke');
	}
}

const init = function(){
	const jokeApp = new JokeApp();
	document.getElementById("joke").onclick = () => {
		jokeApp.getData();
	};
}

window.onload = init;





