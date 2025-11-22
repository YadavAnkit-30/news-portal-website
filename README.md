title: "News Portal Website — Official Web Application"

description: |
  A responsive and modern News Portal Website that displays global news using NewsAPI
  while allowing Editors to upload their own articles through Firebase.
  The platform combines API-based news, editor-contributed content, and a clean,
  user-friendly interface.

website_preview:
  - "Clean and minimal UI with modern design"
  - "Fully mobile-responsive layout"
  - "Smooth navigation across multiple news sections"
  - "Professional HTML, CSS, JavaScript frontend with Firebase backend"

features:
  homepage:
    - "Displays top headlines fetched from NewsAPI"
    - "Shows editor-uploaded articles in the Recently Added section"

  editor_login:
    - "Secure Firebase Authentication for editors"
    - "Only authorized editors can post articles"

  add_news_module:
    - "Editors enter title, description, category, and image URL"
    - "News is stored inside Firebase Firestore"

  search_module:
    - "Search across API and editor-uploaded news"
    - "Keyword-based searching"

  filter_module:
    - "Filter news articles by date"
    - "Helps users browse older or category-specific news"

  news_details_page:
    - "Shows full news description"
    - "Displays related stories"

  ui_ux:
    - "Responsive card-based layout"
    - "Modern styling and typography"
    

project/
├── index.html              # Homepage – API + Recent News
├── editor-login.html       # Editor Authentication Page
├── add-news.html           # Page for Editors to upload articles
├── news-details.html       # Full article details page
├── assets/
│   ├── css/style.css       # All styling files
│   ├── js/app.js           # Main script for news rendering
│   ├── js/api.js           # NewsAPI handling module
│   ├── js/firebase.js      # Firebase config + Firestore operations
└── README.md               # Project documentation


technologies_used:
  - HTML5
  - CSS3
  - JavaScript ES6
  - Firebase Authentication
  - Firebase Firestore
  - NewsAPI
  - Responsive Web Design
    

how_to_run:
  - "Download or clone the repository"
  - "Open the project in any editor"
  - "Add Firebase config in firebase.js"
  - "Add NewsAPI key in api.js"
  - "Open index.html in browser — no server needed"

author: "Ankit Yadav"

acknowledgments:
  - "Thanks to open-source APIs, Firebase, and contributors who made this project possible."
