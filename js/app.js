document.getElementById('btn-search').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    loadNewsData(searchInputValue);
    searchInput.value = '';
})

const API_KEY = `317a06010b8f49a4a08e3bb54667ec58`;
// TOP HEADLINES --> https://newsapi.org/v2/top-headlines?country=us&apiKey=317a06010b8f49a4a08e3bb54667ec58

const loadNewsData = async searchText => {
    const url = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsData(data.articles);
}

const displayNewsData = articles => {
    const containerDiv = document.getElementById('container-div');
    containerDiv.textContent = '';
    // console.log(articles);
    articles.forEach(article => {
        // console.log(article);
        const { author, description, publishedAt, title, url, urlToImage } = article;

        const split = publishedAt.split('T');
        // console.log(split[0]);
        const time = split[1];
        const onlyTime = time.split('Z');
        // console.log(onlyTime[0]);

        console.log(publishedAt);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${urlToImage ? urlToImage : 'No image found'}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a target="_blank" href="${url}">Source</a>
                <p><b>Author:</b> ${author ? author : '-'}</p>
                <span><p><b>Date: </b> ${split[0]} at ${onlyTime[0]}</p></span>
            </div>
        </div>
        `;
        containerDiv.appendChild(div);
    })
}