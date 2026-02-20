// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Artist Application Form
const artistForm = document.getElementById('artistForm');
const formMessage = document.getElementById('formMessage');

artistForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(artistForm);
    const data = Object.fromEntries(formData);

    // Display the collected data in console for now
    console.log('Artist Application:', data);

    // Show success message
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Thank you for your submission! We\'ll review your application and get back to you within 2 weeks.';
    formMessage.style.display = 'block';

    // Reset form
    artistForm.reset();

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Hide message after 10 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 10000);

    // In a real application, you would send this data to a server
    // Example:
    // fetch('/api/submit-application', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
});

// Donation Form
const donationForm = document.getElementById('donationForm');
const tierCards = document.querySelectorAll('.tier-card');
const donationAmountInput = document.getElementById('donationAmount');

// Handle tier card selection
tierCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all cards
        tierCards.forEach(c => c.classList.remove('selected'));

        // Add selected class to clicked card
        this.classList.add('selected');

        // Set the amount in the input field
        const amount = this.getAttribute('data-amount');
        donationAmountInput.value = amount;
    });
});

// Clear tier selection when custom amount is entered
donationAmountInput.addEventListener('input', function() {
    if (this.value) {
        tierCards.forEach(card => card.classList.remove('selected'));
    }
});

donationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = donationAmountInput.value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }

    // Get form data
    const formData = new FormData(donationForm);
    const data = Object.fromEntries(formData);

    console.log('Donation:', data);

    // Show success message
    alert(`Thank you for your generous donation of $${amount}! Payment processing will be available soon. We'll contact you at ${data.donorEmail || 'the provided email'} with payment instructions.`);

    // Reset form
    donationForm.reset();
    tierCards.forEach(card => card.classList.remove('selected'));

    // Update progress bar (mock update for demonstration)
    updateProgressBar(parseInt(amount));

    // In a real application, redirect to payment processor
    // Example: window.location.href = '/payment?amount=' + amount;
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log('Contact Form:', data);

    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.');

    // Reset form
    contactForm.reset();

    // In a real application:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
});

// Progress bar update function (demonstration only)
function updateProgressBar(newAmount) {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    // Get current amount from text
    const currentText = progressText.textContent;
    const currentAmount = parseInt(currentText.match(/\$(\d+)/)[1]);

    // Calculate new total
    const newTotal = currentAmount + newAmount;
    const goal = 5000;
    const percentage = Math.min((newTotal / goal) * 100, 100);

    // Update progress bar
    progressFill.style.width = percentage + '%';
    progressText.textContent = `$${newTotal} / $${goal}`;

    // Update all funding displays
    document.querySelectorAll('.impact-box p strong').forEach(el => {
        if (el.textContent.includes('Current:')) {
            el.parentElement.innerHTML = `<strong>Current: $${newTotal}</strong> (Fair For All grant + donations)`;
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to sections
document.querySelectorAll('.theme-card, .tier-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Add real-time validation feedback
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'var(--primary-color)';
            // Could add error message here
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

document.querySelectorAll('input[type="url"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateURL(this.value)) {
            this.style.borderColor = 'var(--primary-color)';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

// Console welcome message
console.log('%c🎨 UNGATED - Breaking Down Barriers in Art', 'font-size: 20px; font-weight: bold; color: #e63946;');
console.log('%cWebsite for the Ungated Exhibition', 'font-size: 14px; color: #1d3557;');
console.log('%cSupported by Fair For All', 'font-size: 12px; color: #666;');
