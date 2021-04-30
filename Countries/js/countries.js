function ajaxRequest(url) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open('GET', url);
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
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
function fetchRequest(url) {
	return fetch(url)
		.then(body => body.json());
}
class Country {
	constructor(countryName, capital, region, flag) {
		this._countryName = countryName;
		this._capital = capital;
		this._region = region;
		this._flag = flag;
	}
	get countryName() {
		return this._countryName;
	}

	get capital() {
		return this._capital;
	}

	get region() {
		return this._region;
	}

	get flag() {
		return this._flag;
	}

}
class CountriesRepository {
	constructor() {
		this._countries = [];
	}

	get countries() { return this._countries; }
	addCountry(name, capital, region, flag) {
		this._countries.push(new Country(name, capital, region, flag));
	}
	getCountries(searchString) {
		return !searchString ? this.countries
			: this.countries.filter((c) => c.countryName.toLowerCase().startsWith(searchString.toLowerCase()));
	}
}
class CountriesApp {
	constructor() {
		this.getData();
	}

	getData() {
		//ajaxRequest('https://restcountries.eu/rest/v2/all')
		fetchRequest('https://restcountries.eu/rest/v2/all')
			.then(resultValue => {
				this._countriesRepository = new CountriesRepository();
				resultValue.forEach(r => this._countriesRepository.addCountry(`${r.name} - ${r.nativeName}`, r.capital, r.region, r.flag));
				document.getElementById('body').classList.remove('hide');
				this.showCountries();
			})
			.catch(rejectValue => {
				document.getElementById('message').classList.remove('hide');
				document.getElementById('message').innerText = `Something went wrong retrieving the data: ${rejectValue}`;
			});
	}
	showCountries = (event) => {
		const countries = this._countriesRepository.getCountries(event ? event.target.value : '');
		document.getElementById("countries").innerHTML = '';
		document.getElementById("number").innerText = `Number of countries: ${countries.length} `;
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

const init = function () {
	const app = new CountriesApp();
	document.getElementById('search').addEventListener('keyup', app.showCountries);
}

window.onload = init;