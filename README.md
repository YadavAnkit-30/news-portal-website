📰 News Portal Website — Real-Time News + Editor Dashboard
A responsive and dynamic News Portal Website that displays real-time global news using NewsAPI and allows editors to upload their own articles stored securely in Firebase Firestore.
The system includes a modern UI, category-based browsing, search & filter features, and a “Recently Added” section for editor-submitted content.

🌟 Website Preview
-Modern card-based UI
-Fully mobile responsive
-Real-time news from NewsAPI
-Editor Dashboard for article uploads
-Detailed article page with related news
-Firebase-powered backend

🚀 Features

📰 User Features
-Fetches global news in real-time using NewsAPI
-Category-wise browsing (Technology, Sports, Politics, etc.)
-Search news by keywords
-Filter news by date
-View recently added editor articles
-Open full news in a separate, detailed page

✍️ Editor Features
-Secure Login using Firebase Authentication
-Add news with:
 -Title
 -Description
 -Image URL
 -Category

-Articles automatically appear under Recently Added
-Simple and easy-to-use dashboard interface

🎨 Modern UI/UX
-Clean card-based interface
-Responsive layout for all devices
-Smooth grid alignment
-Easy readability with perfect spacing & typography

📁 Project Structure
project/
├── app.html               # Main UI page for users
├── app.css                # Styling for main website
├── app.js                 # Fetch API news + Firestore news
│
├── dashboard.html         # Editor login + article submission
├── dashboard.css          # Editor dashboard styles
├── dashboard.js           # Logic for adding editor articles
│
├── news.html              # Single article full view page
│
├── firebase-config.js     # Firebase initialization settings
└── README.md              # Project documentation

⚙️ Technologies Used
-Frontend
-HTML5
-CSS3
-JavaScript

Backend
-Firebase Firestore
-Firebase Authentication
-Firebase Cloud Storage

API Integration
-NewsAPI (for fetching worldwide news)

Tools
-Visual Studio Code
-Live Server
-Git & GitHub

✨ Author
-Ankit Yadav
