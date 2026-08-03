// Tailwind CDN Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                matte: '#0B0B0B',
                charcoal: '#161616',
                warmOrange: '#FF8C1A',
                burntOrange: '#D96A00',
                coffee: '#5B3A29',
                bronze: '#A97142',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'marquee': 'marquee 50s linear infinite', //my superhero animation
                'spin-slow': 'spin 15s linear infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                    '50%': { opacity: 0.6, transform: 'scale(1.05)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                }
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Spotlight Effect
    const spotlight = document.getElementById('spotlight');
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            if (spotlight) {
                spotlight.style.setProperty('--x', `${e.clientX}px`);
                spotlight.style.setProperty('--y', `${e.clientY}px`);
            }
        });
    });

    // 2. Animated Typing Effect
    const phrases = [
        "Aspiring Developer", 
        "Graphic Designer", 
        "Active Learner", 
        "Football Enthusiast", 
        "Tech Enthusiast", 
        "Aspiring Cybersecurity Specialist", 
        "Problem Solver"
    ];
    let currentPhraseIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    const typedTextSpan = document.getElementById('typed-text');
    
    function typeEffect() {
        if (!typedTextSpan) return;
        
        const currentPhrase = phrases[currentPhraseIdx];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, currentCharIdx - 1);
            currentCharIdx--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, currentCharIdx + 1);
            currentCharIdx++;
        }
        
        let typingSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIdx === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIdx === 0) {
            isDeleting = false;
            currentPhraseIdx = (currentPhraseIdx + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 1000);

    // 3. Scroll Reveal & Counter Logic
    const revealElements = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                if (entry.target.id === 'stats-container' || entry.target.contains(document.getElementById('stats-container'))) {
                    if (!hasCounted) {
                        counters.forEach(counter => {
                            const target = +counter.getAttribute('data-target');
                            const duration = 2000;
                            const increment = target / (duration / 16); 
                            
                            let current = 0;
                            const updateCounter = () => {
                                current += increment;
                                if (current < target) {
                                    counter.textContent = Math.ceil(current);
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.textContent = target;
                                }
                            };
                            updateCounter();
                        });
                        hasCounted = true;
                    }
                }
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
    

    // 4. Duplicate Marquee
    const marqueeTrack = document.querySelector('.tech-track');
    const marqueeContainer = document.getElementById('tech-marquee');
    if (marqueeTrack && marqueeContainer) {
        const clone1 = marqueeTrack.cloneNode(true);
        const clone2 = marqueeTrack.cloneNode(true);
        marqueeContainer.appendChild(clone1);
        marqueeContainer.appendChild(clone2);
    }

    // 5. Responsive Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'bg-charcoal/80', 'backdrop-blur-md');
            navbar.classList.remove('py-3');
            if (window.innerWidth > 768) navbar.style.width = '85%';
        } else {
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2', 'bg-charcoal/80', 'backdrop-blur-md');
            navbar.style.width = '90%';
        }
    });

    // 6. Particle System
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-white opacity-20 pointer-events-none';
            particle.style.willChange = 'transform, opacity';
            
            const size = Math.random() * 3 + 1; 
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const animDuration = Math.random() * 10 + 10; 
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            
            particle.animate([
                { transform: `translate(0, 0)`, opacity: Math.random() * 0.3 },
                { transform: `translate(${Math.random() * 100 - 50}px, 100vh)`, opacity: 0 }
            ], {
                duration: animDuration * 1000,
                iterations: Infinity,
                delay: Math.random() * 5000
            });
            
            particlesContainer.appendChild(particle);
        }
    }

    

    // 7. Certificate Carousel Scroll Buttons
    const certCarousel = document.getElementById('cert-carousel');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (certCarousel && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            certCarousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
        scrollRightBtn.addEventListener('click', () => {
            certCarousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
});
