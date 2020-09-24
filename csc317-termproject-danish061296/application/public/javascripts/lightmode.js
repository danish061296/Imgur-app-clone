const lightmodeButton = document.getElementById("light-button");
const navbar = document.getElementsByTagName("nav");

lightmodeButton.addEventListener("click", lightMode);

function lightMode() {
  document.body.classList.toggle("body");
  navbar.classList.toggle("nav-bar");

  // document.navbar.classList.toggle("nav-bar");
}

function setFlashMessageFadeOut(flashMessageElement) {
  setTimeout(() => {
    let currentOpacity = 1.0;
    let timer = setInterval(() => {
      if (currentOpacity < 0.05) {
        clearInterval(timer);
        flashMessageElement.remove();
      }
      currentOpacity = currentOpacity - 0.05;
      flashMessageElement.style.opacity = currentOpacity;
    }, 50);
  }, 3000);
}

function addFlashFromFrontEnd(message) {
  let flashMessageDiv = document.createElement("div");
  let innerFlashDiv = document.createElement("div");
  let innerTextNode = document.createTextNode(message);
  innerFlashDiv.appendChild(innerTextNode);
  flashMessageDiv.appendChild(innerFlashDiv);
  flashMessageDiv.setAttribute("id", "flash-message");
  innerFlashDiv.setAttribute("class", "alert-success");
  document.getElementsByTagName("body")[0].appendChild(flashMessageDiv);
  setFlashMessageFadeOut(flashMessageDiv);
}

function createCard(postData) {
  return `<div id="post-${postData.id}}" class="image-block">
<img src="${postData.thumbnail}" alt="Missing Image">
<div class="details">
    <p class="img-title">${postData.title}</p>
    <p class="img-text">${postData.description}</p>
    <div class="details-box">
        <a href="/post/${postData.id}" class="detail-button">Details</a>
        <i class="far fa-share-square"></i>
        <i class="far fa-comment-alt"></i>
        <i class="far fa-eye"></i>
    </div>
</div>
</div>`;
}

function executeSearch() {
  let searchTerm = document.getElementById("search-box").value;
  if (!searchTerm) {
    location.replace("/");
    return;
  }
  let mainContent = document.getElementById("landing-page");
  let searchURL = `/posts/search?search=${searchTerm}`;
  fetch(searchURL)
    .then((data) => {
      return data.json();
    })
    .then((data_json) => {
      let newMainContentHTML = "";
      data_json.results.forEach((row) => {
        newMainContentHTML += createCard(row);
      });
      mainContent.innerHTML = newMainContentHTML;
      if (data_json.message) {
        addFlashFromFrontEnd(data_json.message);
      }
    })
    .catch((err) => console.log(err));
}

let flashElement = document.getElementById("flash-message");

if (flashElement) {
  setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById("search-button");
if (searchButton) {
  searchButton.onclick = executeSearch;
}
