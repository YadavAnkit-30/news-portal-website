import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const newsId = params.get("id");

// Your NewsAPI key
let key = "3c2b7c6b562b4f46ae97f1aa300da1aa";

// ================= Load Firestore News Details =================
async function loadNewsDetails() {
  if (!newsId) return;

  try {
    const docRef = doc(db, "news", newsId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const news = docSnap.data();
      document.getElementById("newsTitle").innerText = news.title;
      document.getElementById("newsImage").src = news.imageUrl || "https://via.placeholder.com/400x200";
      document.getElementById("newsDescription").innerText = news.description;
      document.getElementById("newsDate").innerText = news.createdAt?.toDate().toLocaleString() || "Unknown";

      // ✅ Load related news from API using smart keywords
      loadRelatedNewsFromAPI(news.title);
    } else {
      document.body.innerHTML = "<p>News not found.</p>";
    }
  } catch (error) {
    console.error("Error loading news:", error);
    document.body.innerHTML = "<p>Failed to load news.</p>";
  }
}

// ================= Smart Keyword Extractor =================
function extractKeywords(title) {
  let stopWords = ["the", "is", "at", "which", "on", "a", "an", "in", "vs", "of", "and", "to"];
  return title
    .split(" ")
    .filter(word => word.length > 2 && !stopWords.includes(word.toLowerCase()))
    .slice(0, 6) // ✅ max 6 keywords rakhenge
    .join(" ");
}

// ================= Load Related News from API =================
async function loadRelatedNewsFromAPI(title) {
  try {
    let keywords = extractKeywords(title);
    const res = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&apiKey=${key}`);
    const jsonData = await res.json();

    const relatedDiv = document.getElementById("relatedNews");
    relatedDiv.innerHTML = "";

    if (!jsonData.articles || jsonData.articles.length === 0) {
      relatedDiv.innerHTML = "<p>No related news found.</p>";
      return;
    }

    jsonData.articles.slice(0, 3).forEach(article => {
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}">
        <h3>${article.title}</h3>
      `;
      div.addEventListener("click", () => {
        window.open(article.url, "_blank"); // ✅ Direct open API article
      });
      relatedDiv.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching related API news:", err);
  }
}

// ================= Share Function =================
window.shareNews = function(platform) {
  const url = window.location.href;
  const title = document.getElementById("newsTitle").innerText;

  if (platform === "whatsapp") {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank");
  } else if (platform === "twitter") {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
  } else if (platform === "facebook") {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  }
};

loadNewsDetails();
