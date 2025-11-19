import { auth, db } from "./firebase-config.js";
import { 
  collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const newsForm = document.getElementById("newsForm");
const newsList = document.getElementById("newsList");
const logoutBtn = document.getElementById("logoutBtn");

// ================= Sidebar Navigation =================
document.querySelectorAll(".sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    let sectionId = item.getAttribute("data-section");
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
  });
});

// ================= Add News =================
newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("imageUrl").value || "https://via.placeholder.com/150";

  try {
    await addDoc(collection(db, "news"), {
      title,
      description,
      imageUrl,
      createdAt: serverTimestamp()
    });

    alert("✅ News added successfully!");
    newsForm.reset();
    loadNews();
  } catch (error) {
    console.error("Error adding news:", error);
  }
});

// ================= Load & Manage News =================
async function loadNews() {
  newsList.innerHTML = "<p>Loading...</p>";
  const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  newsList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const news = docSnap.data();

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${news.imageUrl}" alt="">
      <h3>${news.title}</h3>
      <p>${news.description}</p>
      <button class="deleteBtn">Delete</button>
    `;

    // Delete news
    div.querySelector(".deleteBtn").addEventListener("click", async () => {
      await deleteDoc(doc(db, "news", docSnap.id));
      loadNews();
    });

    newsList.appendChild(div);
  });
}
loadNews();

// ================= Logout =================
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
