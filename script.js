window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 1000);
});

// Custom Cursor - FIXED: Better z-index management
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Function to ensure cursor is on top
function setCursorZIndex(modalActive) {
    if (cursor && cursorFollower) {
        if (modalActive) {
            cursor.style.zIndex = '100002';
            cursorFollower.style.zIndex = '100001';
        } else {
            cursor.style.zIndex = '9999';
            cursorFollower.style.zIndex = '9998';
        }
    }
}

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Hover effect
    document.querySelectorAll('a, button, .work-card, .modal-close, .modal-prev, .modal-next, .work-link').forEach(el => {
        if (el) {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect
const typedTextSpan = document.querySelector('.typed-text');
if (typedTextSpan) {
    const textArray = ['Digital Artist', 'Photographer', 'Designer', 'Developer', 'Crochet Artist'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }
    
    setTimeout(type, 1000);
}

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        workItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.dataset.width;
            bar.style.width = width + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
        
        console.log('Form submitted:', formData);
        
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'var(--gradient-2)';
            }, 3000);
        }
    });
}

// GALLERY MODAL 
let currentGalleryIndex = 0;
let currentCategoryItems = [];

// Open gallery modal
function openCategoryGallery(button, category) {
    if (!button) return;
    
    const filterBtn = document.querySelector('.filter-btn.active');
    if (!filterBtn) return;
    
    const filter = filterBtn.dataset.filter;
    
    let items = [];
    if (filter === 'all') {
        items = Array.from(document.querySelectorAll(`.work-item[data-category="${category}"]`));
    } else {
        items = Array.from(document.querySelectorAll('.work-item')).filter(item => {
            return item.style.display !== 'none' && item.dataset.category === filter;
        });
    }
    
    if (items.length === 0) return;
    
    currentCategoryItems = items.map(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3')?.textContent || 'Untitled';
        const category = item.dataset.category || 'Work';
        const description = item.dataset.description || 'A beautiful piece of work.';
        const date = item.dataset.date || '2024';
        const tags = item.dataset.tags || category;
        
        return {
            image: img ? img.src : 'images/placeholder.jpg',
            title: title,
            category: category,
            description: description,
            date: date,
            tags: tags
        };
    });
    
    const workItem = button.closest('.work-item');
    currentGalleryIndex = items.indexOf(workItem);
    
    updateGalleryModal(currentGalleryIndex);
    
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        setCursorZIndex(true);
    }
}

// Update modal content
function updateGalleryModal(index) {
    if (!currentCategoryItems.length) return;
    
    if (index < 0 || index >= currentCategoryItems.length) {
        console.error('Invalid gallery index:', index);
        return;
    }
    
    const item = currentCategoryItems[index];
    
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalDate = document.getElementById('modalDate');
    const modalTags = document.getElementById('modalTags');
    
    if (modalImage) modalImage.src = item.image;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalCategory) modalCategory.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    if (modalDescription) modalDescription.textContent = item.description;
    if (modalDate) modalDate.textContent = item.date;
    if (modalTags) modalTags.textContent = item.tags;
}

// Close gallery modal
function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        // FIXED: Reset cursor z-index when modal closes
        setCursorZIndex(false);
    }
    document.removeEventListener('keydown', handleGalleryKeyPress);
}

// Navigate to previous
function prevGalleryItem() {
    if (!currentCategoryItems.length) return;
    
    currentGalleryIndex = (currentGalleryIndex - 1 + currentCategoryItems.length) % currentCategoryItems.length;
    updateGalleryModal(currentGalleryIndex);
    
    const modalImage = document.querySelector('.modal-image');
    if (modalImage) {
        modalImage.style.animation = 'slideInLeft 0.3s ease';
        setTimeout(() => {
            modalImage.style.animation = '';
        }, 300);
    }
}

// Navigate to next
function nextGalleryItem() {
    if (!currentCategoryItems.length) return;
    
    currentGalleryIndex = (currentGalleryIndex + 1) % currentCategoryItems.length;
    updateGalleryModal(currentGalleryIndex);
    
    const modalImage = document.querySelector('.modal-image');
    if (modalImage) {
        modalImage.style.animation = 'slideInRight 0.3s ease';
        setTimeout(() => {
            modalImage.style.animation = '';
        }, 300);
    }
}

// Keyboard navigation
function handleGalleryKeyPress(e) {
    switch(e.key) {
        case 'Escape':
            closeGallery();
            break;
        case 'ArrowLeft':
            prevGalleryItem();
            break;
        case 'ArrowRight':
            nextGalleryItem();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Close button
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeGallery);
    }
    
    // Overlay click
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeGallery);
    }
    
    // Navigation buttons
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevGalleryItem);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextGalleryItem);
    }
    
    // Prevent modal content clicks from closing
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => e.stopPropagation());
    }
    
    // Attach click handlers to all work links
    document.querySelectorAll('.work-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const workItem = this.closest('.work-item');
            if (workItem) {
                const category = workItem.dataset.category;
                openCategoryGallery(this, category);
            }
        });
    });
    
    setCursorZIndex(false);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.hero-shape');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    shapes.forEach((shape, index) => {
        shape.style.transform = `translate(${scrolled * (0.1 * (index + 1))}px, ${scrolled * (0.05 * (index + 1))}px)`;
    });
});

// Intersection Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.work-item, .about-content, .contact-card').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    }
});

// 3D hover effect for work cards
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});