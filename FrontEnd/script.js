function setupPage(data) {
    if (!data) {
        return null;
    } else {
        main.innerHTML = "";
        const newData = data;
        if(typeof(data) === "string"){newData = JSON.parse(data)}
        newData.forEach(element => {createNews(element);})
    }
}
function createNews(news) {
    const news1 = document.createElement('div');
    const date = document.createElement('h2');
    const imageNew = document.createElement('img');
    const news2 = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const header = document.createElement('h2');

    main.appendChild(news1);
    main.appendChild(date);
    main.appendChild(imageNew);
    main.appendChild(news2);
    news2.appendChild(title);
    news2.appendChild(description);
    news2.appendChild(header);

    main.classList.add('main');
    news2.classList.add('news2');
    imageNew.classList.add('image');
    description.classList.add('description');
    title.classList.add('title');

    date.innerText = news.lifecycle.initialPublishDateTime;
    imageNew.src = news.location.uri;
    title.innerText = news.title.title;
    description.innerText = news.summary.excerpt;
    header.innerText = news.editorial.byline;
}

function fetchOne({page, limit}) {

	fetch(`/api?page=${page}&limit=${limit}=2`)
		.then((res) => {
			return res.json();
		})
		.then((data) => setupPage(data))
		.catch((error) => console.log(error));
}

const searchNews = (event) => {
	const searchInput = document.getElementById('search-input').value;
    const key = searchInput;
	fetch(`http://localhost:3000/search/${key.trim()}`)
		.then((res) => res.json())
        .then((data) => setupPage(data))
		.catch((error) => console.log(error));
	event.preventDefault();
};


function setup() {
    var limit = 5;
    var page = 1;
	const rootElem = document.getElementById('root');
	const searchButton = document.getElementById('search-button');
	const main = document.getElementById('main');
	searchButton.addEventListener('click', (event) => searchNews(event));

    const limitNumber = document.getElementById('paginatedNumber');
    limitNumber.addEventListener('change', () => {
        limit = document.getElementById('paginatedNumber').value;
        page = 1 ;
        fetchOne({page, limit});
    });

    const pageNumber1 = document.getElementById('pagination1');
    pageNumber1.addEventListener('click', () => {
        if (page == 1) {
        } else {
            page = page -1 ;
            pageNumber2.classList.add("active")
        }
        fetchOne({page, limit});
    });
    const pageNumber2 = document.getElementById('pagination2');
    pageNumber2.addEventListener('click', () => {
        page = 1;
        fetchOne({page, limit});
    });
        const pageNumber3 = document.getElementById('pagination3');
    pageNumber3.addEventListener('click', () => {
        page = 2;
        fetchOne({page, limit});
    });
        const pageNumber4 = document.getElementById('pagination4');
    pageNumber4.addEventListener('click', () => {
        page = 3;
        fetchOne({page, limit});
    });
        const pageNumber5 = document.getElementById('pagination5');
    pageNumber5.addEventListener('click', () => {
        page ++
        fetchOne({page, limit});

    });
	fetchOne({page, limit});
};

window.onload = setup;
