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
    const containerNews = document.createElement('div');
    main.appendChild(containerNews);
    containerNews.classList.add('containerNews');

    const containerTitle = document.createElement('div');
    containerNews.appendChild(containerTitle);
    containerTitle.classList.add('containerTitle');
    const title = document.createElement('a');
    containerTitle.appendChild(title);
    title.innerHTML = news.title.title;
    title.classList.add('title');

    const containerSummery = document.createElement('div');
    containerNews.appendChild(containerSummery);
    containerSummery.classList.add('containerSummery');
    const summery = document.createElement('a');
    containerSummery.appendChild(summery);
    summery.innerHTML = news.summary.excerpt;
    summery.classList.add('summery');

    const containerByline = document.createElement('div');
    containerNews.appendChild(containerByline);
    containerByline.classList.add('containerByline');
    const byline = document.createElement('p');
    containerByline.appendChild(byline);
    byline.innerHTML = news.editorial.byline;
    byline.classList.add('byline');
    
    const containerEditorial = document.createElement('div');
    containerNews.appendChild(containerEditorial);
    containerEditorial.classList.add('containerEditorial');
    const subheading = document.createElement('p');
    containerEditorial.appendChild(subheading);
    subheading.innerHTML = news.editorial.subheading;
    subheading.classList.add('subheading');
    const date = document.createElement('p');
    containerByline.appendChild(date);
    date.innerText = news.lifecycle.initialPublishDateTime;
    date.classList.add('data');
}

function fetchOne({page, limit}) {

	fetch(`/api?page=${page}&limit=${limit}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => setupPage(data))
		.catch((error) => console.log(error));
}

const searchNews = (event , page , limit ) => {

	const searchInput = document.getElementById('search-input').value;
    const key = searchInput;
	fetch(`http://localhost:3000/search/?key=${key.trim()}&page=${page}&limit=${limit}`)
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
	searchButton.addEventListener('click', (event) => searchNews(event , page , limit));

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
