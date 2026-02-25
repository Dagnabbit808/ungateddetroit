// Artist Application Form Handler
const artistForm = document.getElementById('artistForm');
const formMessage = document.getElementById('formMessage');

if (artistForm) {
    artistForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(artistForm);

        // Show submitting message
        formMessage.className = 'form-message';
        formMessage.textContent = 'Submitting your application...';
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = '#d1ecf1';
        formMessage.style.color = '#0c5460';

        try {
            // Submit to FormSpree
            const response = await fetch(artistForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show brief success message
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Submission successful! Redirecting...';
                formMessage.style.backgroundColor = '#d4edda';
                formMessage.style.color = '#155724';

                // Redirect to thank you page after 1 second
                setTimeout(() => {
                    window.location.href = 'thanks.html';
                }, 1000);
            } else {
                // Show error message
                const errorData = await response.json();
                formMessage.className = 'form-message error';
                formMessage.textContent = 'There was a problem submitting your application. Please try again or contact us directly at info@ungateddetroit.com';
                formMessage.style.backgroundColor = '#f8d7da';
                formMessage.style.color = '#721c24';
                console.error('FormSpree error:', errorData);
            }
        } catch (error) {
            // Show error message
            formMessage.className = 'form-message error';
            formMessage.textContent = 'There was a problem submitting your application. Please check your internet connection and try again.';
            formMessage.style.backgroundColor = '#f8d7da';
            formMessage.style.color = '#721c24';
            console.error('Submission error:', error);
        }
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}
