// Theme Toggle
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', theme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Reviews Carousel
const reviews = [
    {
        name: "Liam Chen",
        rating: 5,
        text: "Thumb Tailor transformed my channel growth! The artists perfectly capture my brand's energy in every thumbnail.",
        photo: "review1.jpg"
    },
    // ... keep all other review objects the same ...
    {
        name: "Charlotte Taylor",
        rating: 5,
        text: "Absolute professionals. Understand YouTube algorithm requirements better than anyone!",
        photo: "review10.jpg"
    }
];

function generateReviews() {
    const track = document.querySelector('.carousel-track');

    reviews.forEach(review => {
        const stars = Array(5).fill()
            .map((_, i) => {
                if(i < Math.floor(review.rating)) return 'star';
                if(i === Math.floor(review.rating) && review.rating % 1 !== 0) return 'star_half';
                return 'star_border';
            })
            .map(icon => `<span class="material-icons">${icon}</span>`)
            .join('');

        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="reviewer-info">
                <img src="${review.photo}" alt="${review.name}" class="reviewer-photo">
                <div class="reviewer-details">
                    <h4>${review.name}</h4>
                    <div class="stars">${stars}</div>
                </div>
            </div>
            <p class="review-text">"${review.text}"</p>
        `;

        track.appendChild(reviewCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateReviews();
    // Clone first 7 reviews for seamless looping
    const track = document.querySelector('.carousel-track');
    const clones = Array.from(track.children).slice(0, 7).map(el => el.cloneNode(true));
    track.append(...clones);
});
// Add lightbox functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.artwork-card')) {
        const lightbox = document.querySelector('.lightbox');
        const imgSrc = e.target.closest('.artwork-card').href;
        lightbox.querySelector('img').src = imgSrc;
        lightbox.classList.add('active');
    }

    if (e.target.closest('.lightbox-close') || e.target.classList.contains('lightbox')) {
        document.querySelector('.lightbox').classList.remove('active');
    }
});

// Prevent default behavior for lightbox links
document.querySelectorAll('.artwork-card').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
});