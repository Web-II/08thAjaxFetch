class JokeApp{
	getData(){
		new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', 'https://official-joke-api.appspot.com/random_joke');
			request.onreadystatechange = () => {
				if (request.readyState === 4){
				  	if (request.status === 200) {			  	
						resolve(JSON.parse(request.responseText));
					}
					else {
						reject(`ERROR ${request.status} while processing.`);
					}
				}
			}
			request.send();
		})
		.then(resolveValue => { this.toHtml(resolveValue); })
		.catch(rejectValue => { console.log(rejectValue); });
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