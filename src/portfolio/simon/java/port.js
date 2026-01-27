document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("t-TVKXpygBu9st5lL");


  const form = document.getElementById('contact-form');
  if (!form) {
    console.error("Form with id='contact-form' not found");
    return;
  }


  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const serviceID = 'service_a2woqce';
    const templateID = 'template_5c6y6dm';

    emailjs.sendForm(serviceID, templateID, form)
      .then(function (response) {
        console.log('SUCCESS', response);
        alert("✅ Message sent successfully! We'll get back to you soon.");
        form.reset();
      }, function (error) {
        console.error('FAILED', error);
        alert("❌ Failed to send message. Check console for details.");
      });
  });
});



// DATA
const projects = [
  {
    title: "Synthetic Archive",
    description: "A PHP & MySQL feedback system with CRUD operations."
  },
  {
    title: "Portfolio Website",
    description: "A responsive personal portfolio built with HTML, CSS, and JS."
  },
  {
    title: "Expedition of the Thousand Shores",
    description: "A landing page where they can download our capstone mobile game application and has community forum."
  }
];


// YOUTUBE CONFIG

const API_KEY = "AIzaSyCLet4SJCMrZ2labYwQZdZWVlHTji_aY6E"; 
const MAX_RESULTS = 30;

const keywords = [
  "web development project demo",
  "javascript portfolio project",
  "php mysql project demo",
  "student capstone system",
  "frontend web app demo"
];

// FUNCTIONS
async function loadRandomVideo() {
  const iframe = document.getElementById("youtube-embed");
  if (!iframe) return;

  const randomKeyword =
    keywords[Math.floor(Math.random() * keywords.length)];

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${API_KEY}` +
      `&part=snippet` +
      `&q=${encodeURIComponent(randomKeyword)}` +
      `&type=video` +
      `&maxResults=${MAX_RESULTS}` +
      `&safeSearch=strict`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.error("No videos found");
      return;
    }

    const randomVideo =
      data.items[Math.floor(Math.random() * data.items.length)];

    iframe.src = `https://www.youtube.com/embed/${randomVideo.id.videoId}`;

  } catch (error) {
    console.error("YouTube API Error:", error);
  }
}

function loadRandomProject() {
  const projectSummary = document.getElementById("project-summary");
  if (!projectSummary) return;

  const project =
    projects[Math.floor(Math.random() * projects.length)];

  projectSummary.textContent =
    `${project.title}: ${project.description}`;
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  loadRandomVideo();
  loadRandomProject();

  const randomizeBtn = document.getElementById("randomize-video");
  if (randomizeBtn) {
    randomizeBtn.addEventListener("click", loadRandomVideo);
  }
});
