import axios from "axios";
const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
    
    const card = document.createElement("div");
    const headliner = document.createElement("div");
    const author = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");

    card.classList.add("card");
    headliner.classList.add("headline");
    author.classList.add("author");
    imgContainer.classList.add("img-container");
    
    imgContainer.appendChild(img);
    author.appendChild(imgContainer);
    author.appendChild(span);
    card.appendChild(headliner);
    card.appendChild(author);

    headliner.textContent = article.headline;
    img.src = article.authorPhoto;
    span.textContent = article.authorName;

    card.addEventListener("click", () => {
      console.log(article.headline);
    });

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get("http://localhost:5001/api/articles")
    .then((res) => {
      const allObjects = Object.keys(res.data.articles);
      allObjects.forEach((array) => {
        res.data.articles[array].forEach(object => {
          const cardMaker = Card(object);
          document.querySelector(selector).appendChild(cardMaker);
        })
      })
    })
    .catch((err) => {
      console.error(err);
    })
}

export { Card, cardAppender }
