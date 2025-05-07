// Navbar scroll effect with enhanced transparency
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = `rgba(26, 26, 26, ${Math.min(0.95, 0.7 + scrollPosition/1000)})`;
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

// Smooth scroll with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced scroll animations with intersection observer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if(entry.target.classList.contains('card')) {
                    entry.target.classList.add('float');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Enhanced number formatting
function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}

// Enhanced quiz functionality with detailed feedback
const quizForm = document.getElementById('cyberQuiz');
if (quizForm) {
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const answers = {
            q1: document.querySelector('input[name="q1"]:checked')?.value,
            q2: document.querySelector('input[name="q2"]:checked')?.value
        };
        
        let score = 0;
        if (answers.q1 === 'b') score++;
        if (answers.q2 === 'b') score++;
        
        const feedback = document.createElement('div');
        feedback.className = 'alert mt-3';
        
        let feedbackMessage = '';
        let feedbackClass = '';
        
        switch(score) {
            case 2:
                feedbackMessage = `
                    <h4><i class="fas fa-trophy text-warning"></i> Excellent!</h4>
                    <p>You're a cybersecurity pro! Your knowledge of security best practices is impressive.</p>
                    <p>Keep up the good work and continue staying informed about the latest security threats.</p>
                `;
                feedbackClass = 'alert-success';
                break;
            case 1:
                feedbackMessage = `
                    <h4><i class="fas fa-star text-warning"></i> Good Job!</h4>
                    <p>You have a good understanding of basic security concepts.</p>
                    <p>Consider exploring our advanced security guides to enhance your knowledge further.</p>
                `;
                feedbackClass = 'alert-warning';
                break;
            default:
                feedbackMessage = `
                    <h4><i class="fas fa-book text-warning"></i> Keep Learning!</h4>
                    <p>Cybersecurity is a continuous learning journey.</p>
                    <p>Check out our beginner's guide to strengthen your security knowledge.</p>
                `;
                feedbackClass = 'alert-danger';
                break;
        }
        
        feedback.innerHTML = feedbackMessage;
        feedback.classList.add(feedbackClass);
        
        const existingFeedback = quizForm.querySelector('.alert');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        quizForm.appendChild(feedback);
        
        // Scroll to feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Enhanced checklist with progress tracking
const checkboxes = document.querySelectorAll('.form-check-input');
if (checkboxes.length > 0) {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress mt-3';
    progressBar.innerHTML = `
        <div class="progress-bar" role="progressbar" style="width: 0%"></div>
    `;
    checkboxes[0].parentElement.parentElement.appendChild(progressBar);
    
    const progressBarInner = progressBar.querySelector('.progress-bar');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.form-check-input:checked').length;
            const progress = (checkedCount / checkboxes.length) * 100;
            
            progressBarInner.style.width = `${progress}%`;
            progressBarInner.setAttribute('aria-valuenow', progress);
            
            // Add pulse animation to progress bar
            progressBarInner.classList.add('pulse');
            setTimeout(() => progressBarInner.classList.remove('pulse'), 1000);
            
            if (checkedCount === checkboxes.length) {
                const completionMessage = document.createElement('div');
                completionMessage.className = 'alert alert-success mt-3';
                completionMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <strong>Congratulations!</strong> You've completed all security measures!
                    <p class="mb-0 mt-2">Your digital security is now significantly improved.</p>
                `;
                
                const existingMessage = progressBar.parentElement.querySelector('.alert');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                progressBar.parentElement.appendChild(completionMessage);
                
                // Add confetti effect
                if (typeof confetti !== 'undefined') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }
        });
    });
}

// Enhanced newsletter form with validation and animation
const newsletterForm = document.querySelector('form[class*="newsletter"]');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger mt-3';
            errorMessage.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                Please enter a valid email address.
            `;
            
            const existingMessage = this.querySelector('.alert');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            this.appendChild(errorMessage);
            return;
        }
        
        // Simulate form submission with enhanced animation
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            submitButton.classList.add('btn-success');
            
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <strong>Welcome to CyberGuard!</strong>
                <p class="mb-0 mt-2">You'll receive our latest security updates and tips.</p>
            `;
            
            this.appendChild(successMessage);
            
            // Reset form after delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-success');
                successMessage.remove();
                this.reset();
            }, 3000);
        }, 1500);
    });
}

// Animate numbers with proper formatting
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = formatNumber(target);
            }
        };

        updateNumber();
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover',
            placement: 'top',
            animation: true
        });
    });

    // Trigger number animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stats-container').forEach(container => {
        observer.observe(container);
    });
}); 