// ================= Imports for Firestore =================
import { db } from "./firebase-config.js";
import { collection, getDocs, orderBy, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ================= Global Variables =================
let key = "3c2b7c6b562b4f46ae97f1aa300da1aa"; //  API key
let cardData = document.querySelector(".cardData");
let searchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let searchType = document.getElementById("type");
const loader = document.getElementById("loader");

// ================= Date Filter Helper =================
function getDateFilterRange(option) {
  let today = new Date();
  if (option === "today") {
    today.setHours(0,0,0,0);
    return today;
  } else if (option === "7days") {
    today.setDate(today.getDate() - 7);
    today.setHours(0,0,0,0);
    return today;
  } else if (option === "30days") {
    today.setDate(today.getDate() - 30);
    today.setHours(0,0,0,0);
    return today;
  }
  return null; // all time
}

// ================= Fetch News from API =================
async function getData(input) {
  try {
    loader.style.display = "block";
    cardData.innerHTML = "";

    let filter = document.getElementById("dateFilter").value;
    let fromDate = getDateFilterRange(filter);

    let url = `https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`;
    if (fromDate) {
      url += `&from=${fromDate.toISOString().split("T")[0]}`;
    }

    let res = await fetch(url);
    let jsonData = await res.json();

    loader.style.display = "none";
    searchType.innerText = input.charAt(0).toUpperCase() + input.slice(1);

    if (!jsonData.articles || jsonData.articles.length === 0) {
      cardData.innerHTML = "<p style='text-align:center;'>No articles found.</p>";
      return;
    }

    jsonData.articles.forEach(article => {
      let divs = document.createElement("div");
      divs.classList.add("card");

      divs.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <small style="color:gray; margin: 0 12px 12px; display:block;">
          ${new Date(article.publishedAt).toLocaleString()}
        </small>
      `;

      divs.addEventListener("click", () => window.open(article.url, "_blank"));
      cardData.appendChild(divs);
    });
  } catch (err) {
    console.error("Error fetching API news:", err);
    loader.style.display = "none";
    cardData.innerHTML = "<p style='text-align:center;'>Failed to load API news.</p>";
  }
}

// ================= Load Recent News from Firestore =================
async function loadRecentNews() {
  cardData.innerHTML = "";
  loader.style.display = "block";
  searchType.innerText = "Recently Added";

  try {
    let filter = document.getElementById("dateFilter").value;
    let fromDate = getDateFilterRange(filter);

    let q;
    if (fromDate) {
      q = query(
        collection(db, "news"),
        where("createdAt", ">=", fromDate),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        collection(db, "news"),
        orderBy("createdAt", "desc")
      );
    }

    const snapshot = await getDocs(q);
    loader.style.display = "none";

    if (snapshot.empty) {
      cardData.innerHTML = "<p style='text-align:center;'>No recent articles found.</p>";
      return;
    }

    snapshot.forEach(docSnap => {
      const news = docSnap.data();
      const id = docSnap.id;

      let divs = document.createElement("div");
      divs.classList.add("card");

      divs.innerHTML = `
        <img src="${news.imageUrl || 'https://via.placeholder.com/400x200'}" alt="News Image">
        <h3>${news.title}</h3>
        <p>${news.description || ''}</p>
        <small style="color:gray; margin: 0 12px 12px; display:block;">
          Recently Added
        </small>
      `;

      divs.addEventListener("click", () => {
        window.open(`news.html?id=${id}`, "_blank");
      });

      cardData.appendChild(divs);
    });

  } catch (err) {
    console.error("Error fetching Firestore news:", err);
    loader.style.display = "none";
    cardData.innerHTML = "<p style='text-align:center;'>Failed to load recent news.</p>";
  }
}
window.loadRecentNews = loadRecentNews;

// ================= Default Load =================
window.addEventListener("load", () => {
  getData("India");   // Default API news
});

// ================= Search =================
searchBtn.addEventListener("click", () => {
  let text = inputData.value.trim();
  if (text) getData(text);
  else cardData.innerHTML = "<p style='text-align:center;'>Please enter a search term.</p>";
});

// ================= Navigation =================
function navClick(name) {
  document.querySelectorAll(".categories li").forEach(li => li.classList.remove("active"));
  let clicked = document.getElementById(name);
  if (clicked) clicked.classList.add("active");

  if (name === "recent") loadRecentNews();
  else getData(name);
}
window.navClick = navClick;

// ================= Filter Listener =================
document.getElementById("dateFilter").addEventListener("change", () => {
  let activeCategory = document.querySelector(".categories li.active");
  let category = activeCategory ? activeCategory.id : "India";

  if (category === "recent") {
    loadRecentNews(); // Firestore filter apply
  } else {
    getData(category); // API filter apply
  }
});


