// Intersection Observer for smooth scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const animatedSections = document.querySelectorAll('.section-animate');
    animatedSections.forEach(section => observer.observe(section));

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-btn');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Mobile Sticky CTA logic
    // Hide sticky CTA when approaching the final CTA section to avoid duplication
    const stickyCta = document.querySelector('.mobile-sticky-cta');
    const finalCtaSection = document.querySelector('.final-cta');

    if (stickyCta && finalCtaSection) {
        const handleScroll = () => {
            const finalCtaRect = finalCtaSection.getBoundingClientRect();
            if (finalCtaRect.top < window.innerHeight) {
                stickyCta.style.transform = 'translateY(150%)'; // Hide downwards
            } else {
                stickyCta.style.transform = 'translateY(0)'; // Show
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
    }

    // Video Controls Logic
    const video = document.getElementById('hero-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteUnmuteBtn = document.getElementById('mute-unmute-btn');

    if (video) {
        if (playPauseBtn) {
            const iconPlay = playPauseBtn.querySelector('.icon-play');
            const iconPause = playPauseBtn.querySelector('.icon-pause');

            playPauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    iconPlay.style.display = 'none';
                    iconPause.style.display = 'block';
                } else {
                    video.pause();
                    iconPlay.style.display = 'block';
                    iconPause.style.display = 'none';
                }
            });
        }

        if (muteUnmuteBtn) {
            const iconMuted = muteUnmuteBtn.querySelector('.icon-muted');
            const iconUnmuted = muteUnmuteBtn.querySelector('.icon-unmuted');

            muteUnmuteBtn.addEventListener('click', () => {
                if (video.muted) {
                    video.muted = false;
                    iconMuted.style.display = 'none';
                    iconUnmuted.style.display = 'block';
                } else {
                    video.muted = true;
                    iconMuted.style.display = 'block';
                    iconUnmuted.style.display = 'none';
                }
            });
        }
    }
});
