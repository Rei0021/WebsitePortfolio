window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 1000);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Function so cursor always on top
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

// PORTFOLIO DATA
function getAllWorksFromDOM() {
    const items = document.querySelectorAll('.work-item');
    const works = [];
    
    items.forEach((item, index) => {
        works.push({
            id: index + 1,
            category: item.dataset.category,
            categoryName: item.dataset.categoryName || 
                         (item.dataset.category === 'photo' ? 'Photography' :
                          item.dataset.category === 'design' ? 'Design' :
                          item.dataset.category === 'digital' ? 'Digital Art' : 'Crochet'),
            title: item.dataset.title || item.querySelector('h3')?.textContent || 'Untitled',
            description: item.dataset.description || 'A beautiful piece of work.',
            date: item.dataset.date || '2024',
            tags: item.dataset.tags || item.dataset.category,
            image: item.querySelector('img')?.src || 'images/placeholder.jpg',
            element: item 
        });
    });
    
    return works;
}

// FILTER FUNCTIONS 
const filterBtns = document.querySelectorAll('.filter-btn');
const allWorks = getAllWorksFromDOM(); 
let currentFilter = 'all';

// Function to show items based on filter
function showFilteredItems(filter) {
    const allWorkItems = document.querySelectorAll('.work-item');
    
    allWorkItems.forEach(item => {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
    });
    
    if (filter === 'all') {
        const photoItems = Array.from(allWorkItems).filter(item => item.dataset.category === 'photo');
        const designItems = Array.from(allWorkItems).filter(item => item.dataset.category === 'design');
        const digitalItems = Array.from(allWorkItems).filter(item => item.dataset.category === 'digital');
        const crochetItems = Array.from(allWorkItems).filter(item => item.dataset.category === 'crochet');

        photoItems.slice(0, 2).forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
        
        designItems.slice(0, 2).forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
        
        digitalItems.slice(0, 2).forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
        
        crochetItems.slice(0, 3).forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
    } else {
        const itemsToShow = Array.from(allWorkItems).filter(
            item => item.dataset.category === filter
        );
        
        itemsToShow.forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    const categoryHeader = document.getElementById('categoryHeader');
    const categoryNameSpan = document.getElementById('currentCategoryName');
    
    if (filter === 'all') {
        if (categoryHeader) categoryHeader.style.display = 'none';
    } else {
        if (categoryHeader && categoryNameSpan) {
            const categoryNames = {
                'photo': 'Photography',
                'design': 'Design',
                'digital': 'Digital Art',
                'crochet': 'Crochet'
            };
            categoryNameSpan.textContent = categoryNames[filter] || filter;
            categoryHeader.style.display = 'block';
        }
    }
}

// Filter buttons click handler
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        currentFilter = btn.dataset.filter;
        showFilteredItems(currentFilter);
    });
});

// Back to All button
const backBtn = document.getElementById('backToAllBtn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        document.querySelector('.filter-btn[data-filter="all"]').click();
    });
}

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

// Contact form (formspree hehe)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            // Send to Formspree
            const response = await fetch('https://formspree.io/f/mgonkaee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Success
                submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'var(--gradient-2)';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = 'Error! Try Again <i class="fas fa-exclamation-triangle"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'var(--gradient-2)';
                submitBtn.disabled = false;
            }, 3000);
            
            console.error('Form submission error:', error);
        }
    });
}

// GALLERY MODAL
let currentGalleryIndex = 0;
let currentCategoryItems = [];

// Open gallery modal
function openCategoryGallery(button, category) {
    if (!button) return;
    
    // Get ALL items from the clicked category (for modal navigation)
    const allWorkItems = document.querySelectorAll('.work-item');
    const categoryItems = Array.from(allWorkItems).filter(
        item => item.dataset.category === category
    );
    
    if (categoryItems.length === 0) return;
    
    // Store ALL items from this category for navigation
    currentCategoryItems = categoryItems.map(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3')?.textContent || 'Untitled';
        const category = item.dataset.category || 'Work';
        const categoryName = item.dataset.categoryName || 
                            (category === 'photo' ? 'Photography' :
                             category === 'design' ? 'Design' :
                             category === 'digital' ? 'Digital Art' : 'Crochet');
        const description = item.dataset.description || 'A beautiful piece of work.';
        const date = item.dataset.date || '2024';
        const tags = item.dataset.tags || category;
        
        return {
            image: img ? img.src : 'images/placeholder.jpg',
            title: title,
            categoryName: categoryName,
            description: description,
            date: date,
            tags: tags
        };
    });
    
    // Find which item was clicked
    const workItem = button.closest('.work-item');
    currentGalleryIndex = categoryItems.indexOf(workItem);
    
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
    if (modalCategory) modalCategory.textContent = item.categoryName;
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
    setTimeout(() => {
        showFilteredItems('all');
    }, 100);
    
    // Modal close button
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