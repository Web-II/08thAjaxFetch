showReadyState = function(){
	const request = new XMLHttpRequest();
	console.log(`Readystate: ${request.readyState}`);
	request.open('GET', 'https://official-joke-api.appspot.com/random_joke');
	console.log(`Readystate: ${request.readyState}`);
	request.onreadystatechange = () => {
		console.log(`Readystate: ${request.readyState} - Status: ${request.status} - Response: ${request.responseText}`)			
	};
	request.send();	
}

window.onload = showReadyState;
