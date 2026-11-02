// ============================================================
// PART 3 & 4: JAVASCRIPT
// ============================================================

/* 2.1 LIGHTBOX */
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('myLightbox');
    const img = document.getElementById('lightboxImg');
    if (lightbox && img) {
        img.src = imageSrc;
        lightbox.classList.add('show');
    }
}
function closeLightbox() {
    const lightbox = document.getElementById('myLightbox');
    if (lightbox) lightbox.classList.remove('show');
}

/* 2.2 DYNAMIC CONTENT: SEARCH AND SORT FUNCTIONALITY */
function filterAndSortTreats() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    const grid = document.getElementById('treatGrid');
    const noResults = document.getElementById('noResults');
    
    // Get all cards as an array so we can sort them
    let cards = Array.from(grid.getElementsByClassName('treat-card'));
    let visibleCount = 0;

    // 1. FILTER
    cards.forEach(card => {
        const title = card.querySelector('.treat-name').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // 2. SORT (Only if a sort option other than default is selected)
    if (sortValue !== 'default') {
        cards.sort((a, b) => {
            if (sortValue === 'price-low') {
                return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            } else if (sortValue === 'price-high') {
                return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
            } else if (sortValue === 'name') {
                const nameA = a.getAttribute('data-name').toLowerCase();
                const nameB = b.getAttribute('data-name').toLowerCase();
                return nameA.localeCompare(nameB);
            }
            return 0;
        });

        // Re-append the sorted cards to the grid
        cards.forEach(card => grid.appendChild(card));
    }

    // Show/hide "No results" message
    if (noResults) {
        noResults.style.display = visibleCount > 0 ? 'none' : 'block';
    }
}

/* 2.2 ADD TO CART (DOM Manipulation) */
let cartCount = 0;
function addToCart(itemName) {
    cartCount++;
    const notif = document.createElement('div');
    notif.textContent = `✅ Added ${itemName}! (Total: ${cartCount})`;
    Object.assign(notif.style, {
        position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
        backgroundColor: '#b3446c', color: 'white', padding: '1rem 2rem',
        borderRadius: '2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        zIndex: '1000', fontFamily: 'Quicksand, sans-serif', fontWeight: 'bold',
        transition: 'opacity 0.5s'
    });
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notif), 500);
    }, 2000);
}

/* 4.1 FORM VALIDATION & AJAX SUBMISSION */
function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const errorMsg = document.getElementById('formError');

    if (name === "" || email === "" || message === "") {
        errorMsg.textContent = "Please fill out all required fields.";
        errorMsg.style.display = "block";
        return false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        errorMsg.textContent = "Please enter a valid email address.";
        errorMsg.style.display = "block";
        return false;
    }

    errorMsg.style.display = "none";
    
    const btn = event.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = "Sending... ⏳";
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = "Message Sent! ✅";
        btn.style.backgroundColor = "#4CAF50";
        
        const mailtoLink = `mailto:BakeItPretty_03@gmail.com?subject=Contact from ${name}&body=${message}`;
        
        setTimeout(() => {
            window.location.href = mailtoLink;
            document.getElementById('contactForm').reset();
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = "";
        }, 1000);
    }, 1500);

    return false;
}