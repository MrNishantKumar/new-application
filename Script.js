const apikey = "2d854b40f9c840bc888f96b704655528";

const blogContainer = document.getElementById("blog-container");

const searchField =document.getElementById("search-input")

const searchButton =document.getElementById("search-button")

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=20&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}
searchButton.addEventListener('click', async()=>{
  const query = searchField.value.trim()
  if(query !==""){
    try{
        const articles = await fetchNewsQuery(query)
        displayBlogs(articles)
    }catch(error){
      console.log("Error fetching news by query",error)
    }
  }
})

 async function fetchNewsQuery(query){
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}



function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    // const img = document.createElement("img");
    // img.src = article.urlToImage;

    const img = document.createElement("img");

img.onerror = function() {
  // Handle image load error
  this.src =  "https://picsum.photos/200/300"; // Replace with your default image
};

img.src = article.urlToImage ||  "https://picsum.photos/200/300"; // Use default image if article.urlToImage is empty or null

// For a more dynamic random image:
// function getRandomImage() {
//   // Logic to fetch a random image from an array or API
// }
// img.src = article.urlToImage || getRandomImage();

    img.alt = article.title;
    const title = document.createElement("h2");

    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "....."
        : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");

  // description.onerror = function() {
  //     // Handle image load error
  //     this.src ="https://www.lipsum.com/ "; // Replace with your default image
  //   };
    
  //   description.src = article.description || "https://www.lipsum.com/";

    const truncatedDes =
      article.description.length > 130
        ? article.description.slice(0, 130) + "....."
        : article.description;
    description.textContent = truncatedDes;

    description.textContent = article.description;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click', ()=>{
      window.open(article.url,"_blank");
    })
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
