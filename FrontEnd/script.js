function fetchOne() {
	fetch('/api')
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (!data) {
				return null;
			} else {
				console.log( "DATA: " ,data);
				data.forEach(element => {
					const news = document.createElement('div');
					const date = document.createElement('h2');
					const imageNew = document.createElement('img');
					const news2 = document.createElement('div');
					const title = document.createElement('h2');
					const header = document.createElement('h2');
					const description = document.createElement('p');

					main.appendChild(news);
					main.appendChild(date);
					main.appendChild(imageNew);
					main.appendChild(news2);
					news2.appendChild(title);
					news2.appendChild(header);
					news2.appendChild(description);

					main.classList.add('main');
					news2.classList.add('news2');
					imageNew.classList.add('image');
					description.classList.add('description');
					title.classList.add('title');

					date.innerText = element.TV.id.time;
					imageNew.src = element.TV.id.image;
					title.innerText = element.TV.id.name;
					header.innerText = element.TV.id.language;
					description.innerText = element.TV.description;
				})
            }
		})
		.catch((error) => console.log(error));
}
const searchNews = (event) => {
	const searchInput = document.getElementById('search-input').value;
	console.log('result: ', searchInput);
    const key = searchInput;
	fetch(`/search/{key}`)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => console.log(err));
	event.preventDefault();
};
function setup() {
	const rootElem = document.getElementById('root');
	const searchButton = document.getElementById('search-button');
	const main = document.getElementById('main');
	searchButton.addEventListener('click', (event) => searchNews(event));
	fetchOne();
}

window.onload = setup;
