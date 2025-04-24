//--------Theme----------

const darkThemeConfig = {
    navigation: "#3d3d3d",
    textOverlay: "#ff6b6b",
    cards: "#404040",
    visionText: "#ffffff",
    reviewCards: "#505050",
    reviewText: "#ffffff", 
    visionSection: "#40404080",
    socialIcons: "brightness(0) invert(1)",
    titles: "#ff6b6b",
    links: "#ff6b6b",
    themeIcon: "images/dark.png", 
    footer: '#333333', 
	copyrightBackground: "#222222",
};

const lightThemeConfig = {
    navigation: "#F5F5F5",
    textOverlay: "#9E4644",
    cards: "#F2F2F2",
    visionText: "#666",
    reviewCards: "white",
    reviewText: "#666", 
    visionSection: "#f7f0e381",
    socialIcons: "none",
    titles: "#9E4644",
    links: "#9E4644",
    themeIcon: "images/light.png", 
    footer: '#ffffff',
	copyrightBackground: "#EAEAEA",
};

// Local Storage Functions
function setThemeInLocalStorage(theme) {
    localStorage.setItem('theme', theme);
}

function getThemeFromLocalStorage() {
    return localStorage.getItem('theme');
}

//  Update Function
function updateElements(config) {
    document.querySelector(".navigation").style.backgroundColor = config.navigation;
    document.querySelector(".text-overlay").style.color = config.textOverlay;
    
    document.querySelectorAll(".card_item-Activiteho").forEach(card => {
        card.style.backgroundColor = config.cards;
    });
    
    document.querySelectorAll(".review-card").forEach(card => {
        card.style.backgroundColor = config.reviewCards;
    });
    
    document.querySelector(".Vision").style.backgroundColor = config.visionSection;
    
    document.querySelectorAll(".social-media img").forEach(icon => {
        icon.style.filter = config.socialIcons;
    });
    
    document.querySelectorAll(".title-home").forEach(title => {
        title.style.color = config.titles;
    });
    
    document.querySelectorAll("a").forEach(link => {
        link.style.color = config.links;
    });
    
    document.querySelectorAll(".review-text").forEach(text => {
        text.style.color = config.reviewText;
    });
    
    document.querySelectorAll(".Vision-txt").forEach(text => {
        text.style.color = config.visionText;
    });
    
    document.querySelector(".footer").style.backgroundColor = config.footer;
	document.querySelector(".copyright").style.backgroundColor = config.copyrightBackground;
    
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
        themeIcon.src = config.themeIcon;
    }
}


function applyTheme(theme) {
    const config = theme === 'dark' ? darkThemeConfig : lightThemeConfig;
    document.body.setAttribute('data-theme', theme);
    updateElements(config);
    setThemeInLocalStorage(theme);
}

// Initial Load
window.onload = function () {
    const savedTheme = getThemeFromLocalStorage() || 'light';
    applyTheme(savedTheme);
};

// Toggle Theme Function
function toggleTheme() {
    const currentTheme = getThemeFromLocalStorage() || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// ------Review-------
document.querySelectorAll(".review-card").forEach(function(card) {
    const name = card.querySelector(".review-header h3").textContent;
    const reviewText = card.querySelector(".review-text").textContent;
    const starCount = (card.querySelector(".stars").textContent.match(/⭐/g) || []).length;

    const hoverDiv = document.createElement("div");
    hoverDiv.innerHTML = 
        "<p><strong>Parent:</strong> " + name + "</p>" +
        "<p><strong>Rating:</strong> " + starCount + "/5</p>" +
        "<p><strong>Feedback:</strong> " + reviewText + "</p>";

  hoverDiv.style.display = "none";
    hoverDiv.style.position = "absolute";
    hoverDiv.style.top = "40%";
    hoverDiv.style.left = "2px";
    hoverDiv.style.width = "240px";
    hoverDiv.style.background = "rgba(253, 250, 246, 0.85)";
    hoverDiv.style.border = "1px solid #aaa";
    hoverDiv.style.padding = "12px";
    hoverDiv.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
    hoverDiv.style.zIndex = "1000";
    hoverDiv.style.fontSize = "12px";
    hoverDiv.style.color = "#333";
    hoverDiv.style.borderRadius = "12px";
    card.style.position = "relative";
	
    card.appendChild(hoverDiv);
    
    card.onmouseover = function() {
        hoverDiv.style.display = "block";
    };

    card.onmouseout = function() {
        hoverDiv.style.display = "none";
    };
});

//--------------scroll-------------


	const cardList = document.querySelector('.card_list-Activiteho');
	const prevBtn = document.querySelector('.prev');
	const nextBtn = document.querySelector('.next');

	const card = document.querySelector('.card_item-Activiteho');
	const cardWidth = card.offsetWidth;
	const gap = 50; 


	nextBtn.addEventListener('click', () => {
    cardList.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
    });
});


	prevBtn.addEventListener('click', () => {
		cardList.scrollBy({
			left: -(cardWidth + gap),
			behavior: 'smooth'
    });
});

