const apiKey = 'fd804c14adba4e168cef1942bc976692';

        async function fetchNews(category) {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`);
                const data = await response.json();
                const article=data.articles;
                return article;
            } catch (error) {
                console.error('Error fetching news:', error);
                return [];
            }
        }

        function createNewsCard(article) {
            console.log("article="+article);
            const newsCard = document.createElement('div');
            newsCard.classList.add('carousel-card');
            console.log(article.title);
            const title = document.createElement('h3');
            title.textContent = article.title;
    
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = article.title;
    
            const description = document.createElement('p');
            description.textContent = article.description;
    
            newsCard.appendChild(title);
            newsCard.appendChild(image);
            newsCard.appendChild(description);
    
            return newsCard;
        } 
function createCarousel(category, container) {
    const carousel = document.getElementById(container);
    const prevArrow = document.getElementById(`prev${category}`);
    const nextArrow = document.getElementById(`next${category}`);
    let currentIndex = 0;
    const cardsPerSlide = 4;
    let articles = [];

    async function updateCarousel() {
        articles = await fetchNews(category);
        const startIndex = currentIndex;
        const endIndex = Math.min(startIndex + cardsPerSlide, articles.length);

        carousel.innerHTML = ''; // Clear the carousel

        for (let i = startIndex; i < endIndex; i++) {
            const article = articles[i];
            const newsCard = createNewsCard(article);
            carousel.appendChild(newsCard);
        }
    }
    // event listeners to arrow buttons
    prevArrow.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - cardsPerSlide, 0);
        updateCarousel();
    });

    nextArrow.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + cardsPerSlide, articles.length - cardsPerSlide);
        updateCarousel();
    });

    // Initial load
    updateCarousel();
}


createCarousel('general', 'generalCarousel');
createCarousel('sports', 'sportsCarousel');
createCarousel('health', 'healthCarousel');
createCarousel('business', 'businessCarousel');
createCarousel('entertainment','entertainmentCarousel');
createCarousel('science', 'scienceCarousel');
createCarousel('technology', 'technologyCarousel');



