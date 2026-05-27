document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth <= 768;

    // 1. Initial Load Typography Animations
    const animatedElements = document.querySelectorAll('.animate-up');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200 + 300);
    });

    // 2. Subtle Mouse Parallax Effect (Desktop Only to reduce GPU load and prevent lag on mobile)
    if (!isMobile) {
        document.addEventListener("mousemove", (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 150;
            const y = (window.innerHeight - e.pageY * 2) / 150;
            
            document.querySelectorAll('.parallax').forEach(layer => {
                const speed = layer.getAttribute('data-speed') || 1;
                layer.style.setProperty('--mouse-x', `${x * speed}px`);
                layer.style.setProperty('--mouse-y', `${y * speed}px`);
            });
        });
    }

    // 3. Floating Particles Effect (Reduced count on mobile)
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        const particlesArray = [];
        // Lower density on mobile to reduce GPU load
        const density = isMobile ? 40000 : 20000;
        const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / density);
        
        let simSwirl = 0; // Tracks Section 3 gravitational swirl active factor (0 to 1)

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                // Slower base movement for premium cinematic drift
                const speedMultiplier = isMobile ? 0.12 : 0.22;
                this.speedX = Math.random() * speedMultiplier - (speedMultiplier / 2);
                this.speedY = Math.random() * speedMultiplier - (speedMultiplier / 2);
                this.opacity = Math.random() * 0.45 + 0.1;
            }
            update() {
                // If Section 3 (Simulation) is active, apply accretion disk orbital pull
                if (simSwirl > 0.05 && !isMobile) {
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const dx = centerX - this.x;
                    const dy = centerY - this.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if (dist > 30) {
                        // Soft gravitational pull towards singularity
                        const pullForce = 0.022 * simSwirl;
                        this.speedX += (dx / dist) * pullForce;
                        this.speedY += (dy / dist) * pullForce;
                        
                        // Perpendicular orbit velocity (accretion disc swirl)
                        const orbitForce = 0.08 * simSwirl;
                        this.speedX += (-dy / dist) * orbitForce;
                        this.speedY += (dx / dist) * orbitForce;
                    }
                }
                
                // Speed clamping to prevent runaway acceleration from gravity
                const maxSpeed = isMobile ? 0.6 : 1.2;
                const currentSpeed = Math.sqrt(this.speedX*this.speedX + this.speedY*this.speedY);
                if (currentSpeed > maxSpeed) {
                    this.speedX = (this.speedX / currentSpeed) * maxSpeed;
                    this.speedY = (this.speedY / currentSpeed) * maxSpeed;
                }
                
                // Apply physics movement
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Base slow drift recovery (acts as friction when exiting simulation)
                this.speedX *= 0.985;
                this.speedY *= 0.985;
                
                // Add micro-noise fluctuations for organic, fluid-like movement
                this.speedX += (Math.random() * 0.015 - 0.0075);
                this.speedY += (Math.random() * 0.015 - 0.0075);
                
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
        });
    }

    // 4. Video Optimization & Calmer Feel
    const video = document.querySelector('.hero-video');
    if (video) {
        // Lower motion globally to preserve cinematic feel, slower on mobile
        video.playbackRate = isMobile ? 0.5 : 0.8;
        
        // Explicitly trigger play to bypass strict browser autoplay restrictions
        video.play().catch(err => {
            console.warn("Autoplay was prevented by browser policies. Waiting for user interaction...", err);
            // Fallback: Play on first user interaction
            const playVideo = () => {
                video.play().then(() => {
                    document.removeEventListener('click', playVideo);
                    document.removeEventListener('keydown', playVideo);
                });
            };
            document.addEventListener('click', playVideo);
            document.addEventListener('keydown', playVideo);
        });
    }

    // 5. Cinematic Navbar & Background Scroll Transitions
    const header = document.querySelector('.header');
    const heroVideo = document.querySelector('.hero-video');
    const dimOverlay = document.querySelector('.scroll-dim-overlay');
    const fogWarm = document.querySelector('.atmospheric-fog-warm');
    const fogCool = document.querySelector('.atmospheric-fog-cool');
    const spaceDust = document.querySelectorAll('.space-dust');
    const particlesCanvas = document.getElementById('particles-canvas');
    const panel1 = document.querySelector('.eh-panel-1-pos');
    const panel2 = document.querySelector('.eh-panel-2-pos');
    const panel3 = document.querySelector('.eh-panel-3-pos');
    const heroContent = document.querySelector('.hero-content');
    const heroPagination = document.querySelector('.pagination');
    const heroFooter = document.querySelector('.footer');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const ehSidebar = document.querySelector('.eh-sidebar');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight || 800;

        // Calculate Section 3 active swirl progress
        const simStart = viewportHeight * 1.2;
        const simEnd = viewportHeight * 2.5;
        if (scrollY >= simStart && scrollY <= simEnd) {
            const peak = viewportHeight * 1.9;
            if (scrollY < peak) {
                simSwirl = (scrollY - simStart) / (peak - simStart);
            } else {
                simSwirl = 1.0 - ((scrollY - peak) / (simEnd - peak));
            }
        } else {
            simSwirl = 0;
        }

        // Navbar scrolled state transition
        if (header) {
            if (scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Dim overlay: slowly and gradually darkens to 0.95 opacity (feeling of descending into deep space)
        if (dimOverlay) {
            const rawProgress = Math.min(scrollY / (viewportHeight * 1.1), 1.0);
            const easedProgress = rawProgress * rawProgress; // Non-linear slow start
            dimOverlay.style.opacity = easedProgress * 0.95;
        }

        // Layered Atmospheric fog: slowly reveals warm and cool fog in space
        const fogProgress = Math.min(scrollY / (viewportHeight * 1.1), 1.0);
        if (fogWarm) {
            const easedProgressWarm = Math.sin((fogProgress * Math.PI) / 2); // Sine easing
            fogWarm.style.opacity = easedProgressWarm * 0.8;
        }
        if (fogCool) {
            const easedProgressCool = Math.sin((fogProgress * Math.PI) / 2.5); // Slightly slower blue fog
            fogCool.style.opacity = easedProgressCool * 0.65;
        }

        // Foreground space dust particles fade in as we descend
        if (spaceDust.length > 0) {
            const dustProgress = Math.min(scrollY / (viewportHeight * 0.9), 1.0);
            spaceDust.forEach(dust => {
                dust.style.opacity = dustProgress;
            });
        }

        // Parallax descent on the fixed background black hole video
        if (heroVideo && !isMobile) {
            const videoY = -scrollY * 0.22; // Passes slowly upwards
            const videoScale = 1.0 + (scrollY * 0.00012); // Zooms slightly to imply movement past it
            heroVideo.style.transform = `translate3d(0, ${videoY}px, 0) scale(${videoScale})`;
        }

        // Parallax descent on the star field (canvas)
        if (particlesCanvas && !isMobile) {
            const canvasY = -scrollY * 0.08; // Distant background stars
            particlesCanvas.style.transform = `translate3d(0, ${canvasY}px, 0)`;
        }

        // Parallax descent on the foreground atmosphere layers
        if (!isMobile) {
            const layers = document.querySelectorAll('.atmosphere-layer-wrapper');
            layers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 3;
                const scrollTranslateY = -scrollY * (speed * 0.12);
                layer.style.setProperty('--scroll-y-trans', `${scrollTranslateY}px`);
            });
        }

        // Parallax drift on Section 2 card wrappers (desktop only)
        if (!isMobile) {
            if (panel1) panel1.style.setProperty('--scroll-offset', `${-scrollY * 0.06}px`);
            if (panel2) panel2.style.setProperty('--scroll-offset', `${-scrollY * 0.14}px`);
            if (panel3) panel3.style.setProperty('--scroll-offset', `${-scrollY * 0.09}px`);
        }

        // Fade out hero content gradually (completely gone by 75% of viewport scroll)
        const heroFadeProgress = Math.max(1 - (scrollY / (viewportHeight * 0.75)), 0);
        
        if (heroContent) {
            heroContent.style.opacity = heroFadeProgress;
            heroContent.style.pointerEvents = heroFadeProgress === 0 ? 'none' : 'auto';
        }
        if (heroPagination) {
            heroPagination.style.opacity = heroFadeProgress;
            heroPagination.style.pointerEvents = heroFadeProgress === 0 ? 'none' : 'auto';
        }
        if (heroFooter) {
            heroFooter.style.opacity = heroFadeProgress;
            heroFooter.style.pointerEvents = heroFadeProgress === 0 ? 'none' : 'auto';
        }
        if (scrollIndicator) {
            scrollIndicator.style.opacity = heroFadeProgress;
            scrollIndicator.style.pointerEvents = heroFadeProgress === 0 ? 'none' : 'auto';
        }

        // Section 2 Sidebar intersection show/hide logic
        const discoverSection = document.getElementById('discover');
        if (discoverSection && ehSidebar) {
            const rect = discoverSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3) {
                ehSidebar.style.opacity = '1';
                ehSidebar.style.pointerEvents = 'auto';
            } else {
                ehSidebar.style.opacity = '0';
                ehSidebar.style.pointerEvents = 'none';
            }
        }

        // Section 3 Sidebar intersection show/hide logic
        const simulationsSection = document.getElementById('simulations');
        const simSidebar = document.querySelector('.sim-sidebar');
        if (simulationsSection && simSidebar) {
            const rect = simulationsSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3) {
                simSidebar.classList.add('visible');
            } else {
                simSidebar.classList.remove('visible');
            }
        }

        // Sidebar active item scroll tracking (ScrollSpy)
        if (ehSidebar && scrollY > viewportHeight * 0.5) {
            const sections = ['singularity', 'dilation', 'lensing', 'discover'];
            let currentActive = 'singularity';

            // Find which panel or section is closest to the trigger point
            const triggerOffset = window.innerHeight * 0.45;
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= triggerOffset) {
                        currentActive = sectionId;
                    }
                }
            }

            // Update active states
            const sidebarItems = document.querySelectorAll('.eh-sidebar-item');
            sidebarItems.forEach(item => {
                const href = item.getAttribute('href');
                const icon = item.querySelector('.eh-sidebar-icon');
                if (href === `#${currentActive}`) {
                    item.classList.add('active');
                    if (icon) icon.textContent = 'radio_button_checked';
                } else {
                    item.classList.remove('active');
                    if (icon) icon.textContent = 'radio_button_unchecked';
                }
            });
        }

        // Update pagination dots active states
        const paginationDots = document.querySelectorAll('.pagination .dot');
        if (paginationDots.length > 0) {
            let activeDotTarget = 'hero';
            if (scrollY > viewportHeight * 2.3) {
                activeDotTarget = 'about';
            } else if (scrollY > viewportHeight * 1.3) {
                activeDotTarget = 'simulations';
            } else if (scrollY > viewportHeight * 0.4) {
                activeDotTarget = 'discover';
            }

            paginationDots.forEach(dot => {
                const target = dot.getAttribute('data-target');
                if (target === activeDotTarget) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 6. Section 2 IntersectionObserver for Staggered Reveals
    const revealOptions = {
        root: null,
        rootMargin: '0px -10% -15% 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-item').forEach(el => {
        revealObserver.observe(el);
    });

    // 7. Mouse movement parallax for Section 2 cards (using CSS variables to avoid conflicts)
    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            const panels = document.querySelectorAll('.eh-panel');
            const x = (e.clientX - window.innerWidth / 2) / 120;
            const y = (e.clientY - window.innerHeight / 2) / 120;

            panels.forEach((panel, i) => {
                const depth = (i + 1) * 1.5;
                panel.style.setProperty('--mouse-x', `${x * depth}px`);
                panel.style.setProperty('--mouse-y', `${y * depth}px`);
            });
        });
    }

    // 8. smooth scroll for nav links and sidebar items
    const scrollLinks = document.querySelectorAll('.main-nav a, .eh-sidebar-item, .pagination .dot');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || `#${link.getAttribute('data-target')}`;
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    if (!isMobile && window.smoothScrollTo) {
                        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY;
                        window.smoothScrollTo(targetTop);
                    } else {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    // 9. Gravity Simulation Dashboard Log Simulator
    const logFeed = document.getElementById('log-feed');
    if (logFeed) {
        const phrases = [
            "Gravitational wave detected in sub-sector 4...",
            "Adjusting magnetic confinement grid...",
            "Time dilation skew detected: 0.001ms drift...",
            "Thermal radiation levels peaking...",
            "Recalibrating orbital trajectory path...",
            "Encrypted uplink secured with EH-Mainframe...",
            "Updating singularity density matrix..."
        ];

        function addLogLine() {
            const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
            const phrase = phrases[Math.floor(Math.random() * phrases.length)];
            const div = document.createElement('div');
            div.className = "log-line opacity-40 transition-opacity duration-1000";
            div.innerHTML = `<span class="text-primary/40">[${time}]</span> ${phrase}`;
            logFeed.appendChild(div);
            logFeed.scrollTop = logFeed.scrollHeight;
            if (logFeed.children.length > 15) logFeed.removeChild(logFeed.firstChild);
        }

        setInterval(addLogLine, 4000);
    }

    // 10. Dynamic Value Simulation for Gravity Metrics
    const timeDilationVal = document.getElementById('time-dilation-val');
    if (timeDilationVal) {
        setInterval(() => {
            const newVal = (1.4 + Math.random() * 0.05).toFixed(2);
            timeDilationVal.innerText = `${newVal}x`;
        }, 2500);
    }

    // 11. Sim sidebar toggle items active class
    const simSidebarItems = document.querySelectorAll('.sim-sidebar-item');
    simSidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            simSidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 12. Cinematic Inertial Smooth Scroll (Desktop Only)
    if (!isMobile) {
        // Disable browser-native scroll smoothing to prevent double-interpolation
        document.documentElement.classList.add('custom-scroll');

        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;
        let isAnimating = false;

        // Custom parameters to make scrolling feel slower, heavier, and cinematic
        const scrollSpeedMultiplier = 0.65; // Slower, heavier distance response per tick
        const scrollEase = 0.035; // Cinematic drift deceleration factor

        const updateScroll = () => {
            if (isMobile) {
                isAnimating = false;
                return;
            }

            const diff = targetScroll - currentScroll;

            // Stop condition when position is extremely close
            if (Math.abs(diff) < 0.05) {
                currentScroll = targetScroll;
                window.scrollTo(0, currentScroll);
                isAnimating = false;
                return;
            }

            currentScroll += diff * scrollEase;
            window.scrollTo(0, currentScroll);

            if (isAnimating) {
                requestAnimationFrame(updateScroll);
            }
        };

        // Intercept Mouse Wheel Scrolling
        window.addEventListener('wheel', (e) => {
            e.preventDefault();

            let delta = e.deltaY;
            if (e.deltaMode === 1) { // Line scrolling
                delta *= 40;
            } else if (e.deltaMode === 2) { // Page scrolling
                delta *= window.innerHeight;
            }

            targetScroll += delta * scrollSpeedMultiplier;

            // Clamp scroll limits
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(updateScroll);
            }
        }, { passive: false });

        // Intercept Keyboard Navigation for Cinematic Easing
        window.addEventListener('keydown', (e) => {
            let delta = 0;
            const arrowScrollSpeed = 80;
            const pageScrollSpeed = window.innerHeight * 0.75;

            switch (e.key) {
                case 'ArrowDown':
                    delta = arrowScrollSpeed;
                    break;
                case 'ArrowUp':
                    delta = -arrowScrollSpeed;
                    break;
                case 'PageDown':
                    delta = pageScrollSpeed;
                    break;
                case 'PageUp':
                    delta = -pageScrollSpeed;
                    break;
                case 'Space':
                    delta = pageScrollSpeed * (e.shiftKey ? -1 : 1);
                    break;
                case 'Home':
                    targetScroll = 0;
                    break;
                case 'End':
                    targetScroll = document.documentElement.scrollHeight - window.innerHeight;
                    break;
                default:
                    return; // Let other keys through
            }

            e.preventDefault();

            if (e.key !== 'Home' && e.key !== 'End') {
                targetScroll += delta;
            }

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(updateScroll);
            }
        });

        // Sync target scroll position if scrolled by external mechanisms (scrollbar drag or browser auto-anchor)
        window.addEventListener('scroll', () => {
            const actualScroll = window.scrollY;
            if (Math.abs(actualScroll - currentScroll) > 2) {
                currentScroll = actualScroll;
                targetScroll = actualScroll;
            }
        });

        // Expose helper globally so other components can trigger the custom easing scroll
        window.smoothScrollTo = (targetY) => {
            targetScroll = targetY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(updateScroll);
            }
        };
    }
});
