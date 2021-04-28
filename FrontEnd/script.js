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
    title.href = news.location.uri;
    title.classList.add('title');

    const containerSummery = document.createElement('div');
    containerNews.appendChild(containerSummery);
    containerSummery.classList.add('containerSummery');
    const summery = document.createElement('p');
    containerSummery.appendChild(summery);
    summery.innerHTML = news.summary.excerpt;
    summery.classList.add('summery');

    const containerEditorial = document.createElement('div');
    containerNews.appendChild(containerEditorial);
    containerEditorial.classList.add('containerEditorial');
    const subheading = document.createElement('a');
    containerEditorial.appendChild(subheading);
    subheading.innerHTML = news.editorial.subheading;
    subheading.href = news.location.uri;
    subheading.classList.add('subheading');

    const containerByline = document.createElement('div');
    containerNews.appendChild(containerByline);
    containerByline.classList.add('containerByline');
    const byline = document.createElement('p');
    containerByline.appendChild(byline);
    if(news.editorial.byline){
        byline.innerHTML = news.editorial.byline;
        byline.classList.add('byline');
    }else {
        byline.innerHTML = null
        byline.classList.add('byline');
    }
    
    
    const containerDate = document.createElement('div');
    containerByline.appendChild(containerDate);
    containerDate.classList.add('containerDate');
    const dateT = document.createElement('p');
    const timeD = document.createElement('p');
    containerDate.appendChild(dateT).className = "date";
    containerDate.appendChild(timeD).className = "date";
    if (news.lifecycle.initialPublishDateTime) {
        var date = news.lifecycle.initialPublishDateTime.split("T")[0];
        var time = news.lifecycle.initialPublishDateTime.split("T")[1].split(".")[0].split(":").slice(0,2).join(':');
    }
    dateT.innerHTML = date;
    timeD.innerHTML = time;
    
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
    Time();
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
 const Time = () => {
     //link to TvMaze
        const img = document.getElementById("Time");
        const Time = document.createElement("p");
        Time.className = "TimeZone";
        img.appendChild(Time);
        setInterval(myTimer, 1000);

        function myTimer() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        Time.innerHTML = t;
        }
 }
window.onload = setup;
