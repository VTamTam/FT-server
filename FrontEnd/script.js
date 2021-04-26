function setupPage(data) {
    if (!data) {
        return null;
    } else {
        const newData = data;
        console.log( "DATA: " ,newData);
        if(typeof(data) === "string"){newData = JSON.parse(data)}
        newData.forEach(element => {createNews(element); console.log(element)})
    }
}
function createNews(news) {
    console.log( "1 by one: " ,news);
    const news1 = document.createElement('div');
    const date = document.createElement('h2');
    const imageNew = document.createElement('img');
    const news2 = document.createElement('div');
    const title = document.createElement('h2');
    const header = document.createElement('h2');
    const description = document.createElement('p');

    main.appendChild(news1);
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

    date.innerText = news.TV.id.time;
    imageNew.src = news.TV.id.image;
    title.innerText = news.TV.id.name;
    header.innerText = news.TV.id.language;
    description.innerText = news.TV.description;
}

function fetchOne() {
	fetch('/api')
		.then((res) => {
			return res.json();
		})
		.then((data) => setupPage(data))
		.catch((error) => console.log(error));
}

const searchNews = (event) => {
	const searchInput = document.getElementById('search-input').value;
	console.log('result: ', searchInput);
    const key = searchInput;
	fetch(`/search/{key}`)
		.then((res) => {
			return res.json();
		})
        .then((data) => setupPage(data))
		.catch((error) => console.log(error));
	event.preventDefault();
};


function setup() {
	const rootElem = document.getElementById('root');
	const searchButton = document.getElementById('search-button');
	const main = document.getElementById('main');

	searchButton.addEventListener('click', (event) => searchNews(event));
	fetchOne();
};

window.onload = setup;
