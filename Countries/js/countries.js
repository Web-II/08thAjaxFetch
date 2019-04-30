function ajaxRequest(url){
	return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
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
}
function fetchRequest(url){
	return fetch(url)
  		.then(body => body.json());
}
class Country {
	constructor(countryName, capital, region, flag) {
		this.countryName = countryName;
		this.capital = capital;
		this.region = region;
		this.flag = flag;
	}
	get countryName() {
		return this._countryName;
	}
	set countryName(countryName) {
		this._countryName = countryName;
	}
	get capital() {
		return this._capital;
	}
	set capital(capital) {
		this._capital = capital
	}
	get region() {
		return this._region;
	}
	set region(region) {
		this._region = region;
	}
	get flag() {
		return this._flag;
	}
	set flag(flag) {
		this._flag = flag;
	}
}
class CountriesRepository {
  	constructor() {
    	this._countries = [];
  	}

  	get countries() { return this._countries; }

  	addCountries(countries) {
		  this._countries = 
		         countries.map(c=>new Country(`${c.name} - ${c.nativeName}`,c.capital,c.region,c.flag))
  	}

  	getCountries(searchString){
		return searchString === '' ? this.countries 
			: this.countries.filter((c)=>c.countryName.toLowerCase().startsWith(searchString.toLowerCase()));
	} 
}
class CountriesApp {
	constructor() {
		this.countriesRepository = new CountriesRepository();
		this.getData();
	}
	get countriesRepository() {
		return this._countriesRepository;
	}
	set countriesRepository(value) {
		this._countriesRepository = value;
	}
	getData(){
		//ajaxRequest('https://restcountries.eu/rest/v2/all')
		fetchRequest('https://restcountries.eu/rest/v2/all')
		.then(resultValue => {
			this.countriesRepository.addCountries(resultValue);
			this.showCountries();
		})
		.catch(rejectValue => { console.log(rejectValue); });
	}
	showCountries = (event) => {
		const val = typeof(event) === 'undefined'?'': event.target.value;
		const countries = this.countriesRepository.getCountries(val);
		document.getElementById("countries").innerHTML = '';
		document.getElementById("number").innerText= `Number of countries: ${countries.length}`;
		countries.forEach((c) => {
			const tr = document.createElement("tr");
			const td1 = document.createElement("td");
			td1.appendChild(document.createTextNode(c.countryName));
			const td2 = document.createElement("td");
			td2.appendChild(document.createTextNode(c.capital));
			const td3 = document.createElement("td");
			td3.appendChild(document.createTextNode(c.region));
			const td4 = document.createElement("td");
			const icon = document.createElement("img");
			icon.src = c.flag;
			icon.width = "35";
			icon.height = "25";
			td4.appendChild(icon);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			document.getElementById("countries").appendChild(tr);
		});
	}
}

const init = function(){
	const app = new CountriesApp();
	document.getElementById('search').addEventListener('keyup', app.showCountries);
}

window.onload = init;