function setup() {
    
    const rootElem = document.getElementById("root");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input").value;
    
    fetch('/')
      .then((data) => {
          res.json();
          console.log(data)
          console.log("fetch")
    })
    .catch((error) => console.log(error));

    console.log("value " , searchInput);
    searchButton.addEventListener("click", searchNews);
};

const searchNews = () => {
    console.log("hhhhhhhhhhh" , )
    const lowCase = "brexit";
    //console.log(searchInput , "this is the search")
    const option = {
        method: 'GET',
        Headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lowCase)
    };
    fetch('/search', option)
    .then(res => {
        console.log(res);
    })
    .catch((err) => console.log(err));
};


window.onload = setup;