const weddingData = {
    "welcome": {
      "pre_text": "Join us for our destination wedding",
      "names_html": "Lukas <span class=\"amp\">&</span> Lena",
      "date_range": "7th - 10th January 2027",
      "button_text": "Enter Invitation"
    },
    "live_updates": "🌟 LIVE UPDATE: Welcome drinks will be served at the pool side starting at 4 PM on Jan 7! 🌟 Weather in Dehradun is a pleasant 22°C. 🌟 Can't wait to see you all! 🌟",
    "hero": {
      "overline": "We're getting married!",
      "quote": "\"Two souls with but a single thought, two hearts that beat as one.\""
    },
    "story": "It started with a chance encounter at a coffee shop in 2022. Fast forward through countless adventures, deep conversations, and endless laughter, we realized we couldn't imagine life without each other. On a magical evening in the mountains, Lukas popped the question, and Lena said yes! Now, we are so excited to write the next chapter of our lives surrounded by the people we love the most.",
    "family": {
      "bride": {
        "parents": "Mr. Rajesh & Mrs. Sunita Sharma",
        "siblings": "Rohan Sharma",
        "grandparents": "Late Shri Om Prakash Sharma"
      },
      "groom": {
        "parents": "Mr. Klaus & Mrs. Maria Brandt",
        "siblings": "Felix Brandt, Anna Brandt",
        "grandparents": "Mr. Hans & Mrs. Greta Brandt"
      }
    },
    "events": [
      { "name": "Engagement", "meta": "🗓️ Thursday, Jan 7 | 🕑 1:00 PM", "dress_code": "👗 Dress Code: Smart Casual", "desc": "The formal ring ceremony to begin our beautiful journey together." },
      { "name": "Haldi", "meta": "🗓️ Friday, Jan 8 | 🕑 10:00 AM", "dress_code": "👗 Dress Code: Yellow", "desc": "A playful and auspicious turmeric ceremony. Prepare to get messy!" },
      { "name": "Mehendi", "meta": "🗓️ Friday, Jan 8 | 🕑 4:00 PM", "dress_code": "👗 Dress Code: Vibrant Greens", "desc": "An evening of henna, music, and dance." },
      { "name": "Sangeet", "meta": "🗓️ Saturday, Jan 9 | 🕑 7:00 PM", "dress_code": "👗 Dress Code: Indo-Western", "desc": "A glamorous night of choreographed dances and musical performances." },
      { "name": "The Wedding", "meta": "🗓️ Sunday, Jan 10 | 🕑 5:00 PM", "dress_code": "👗 Dress Code: Traditional Indian", "desc": "The sacred vows and pheras.", "is_main": true },
      { "name": "Reception", "meta": "🗓️ Sunday, Jan 10 | 🕑 9:30 PM", "dress_code": "👗 Dress Code: Formal / Evening Wear", "desc": "A grand feast to celebrate the newlyweds." }
    ],
    "timeline": [
      { "time": "16:00", "title": "Baraat Arrival", "desc": "Dancing our way to the venue!" },
      { "time": "17:30", "title": "Varmala", "desc": "Garland exchange at sunset." },
      { "time": "19:00", "title": "Pheras", "desc": "Sacred rounds around the holy fire." },
      { "time": "21:30", "title": "Grand Dinner", "desc": "A royal feast for all our guests." },
      { "time": "01:00", "title": "Bidhayi", "desc": "A tearful farewell." }
    ],
    "venue": {
      "name": "Nature Valley Homestay",
      "address": "Haridwar Rd, near airport, Bhania Wala<br>Dehradun, Uttarakhand 248140",
      "parking": "🚗 <strong>Parking:</strong> Valet parking is available at the main entrance. Shuttle services from partner hotels will be provided."
    },
    "footer": {
      "names": "L & L",
      "coordinator": "<strong>Wedding Coordinator:</strong> Priya Sharma (+91 98765 43210)<br>For any travel or accommodation queries, please contact our coordinator."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const volIcon = document.getElementById('vol-icon');
    const errorMsg = document.getElementById('error-msg');

    let scrollInterval;
    let isPlaying = false;
    
    // Automatically populate data
    try {
        populateData(weddingData);
    } catch(e) {
        console.error("Failed to populate data:", e);
        if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = "Script error: " + e.message;
        }
    }

    function populateData(data) {
        document.getElementById('welcome-pre').textContent = data.welcome.pre_text;
        document.getElementById('welcome-title').innerHTML = data.welcome.names_html;
        document.getElementById('welcome-date').textContent = data.welcome.date_range;
        document.getElementById('open-btn').textContent = data.welcome.button_text;

        document.getElementById('marquee-text').textContent = data.live_updates;

        document.getElementById('hero-overline').textContent = data.hero.overline;
        document.getElementById('hero-names').innerHTML = data.welcome.names_html;
        document.getElementById('hero-quote').textContent = data.hero.quote;

        document.getElementById('story-text').textContent = data.story;

        const populateFamily = (id, familyData) => {
            const list = document.getElementById(id);
            if(list) {
                list.innerHTML = `
                    <li><strong>Parents:</strong> ${familyData.parents}</li>
                    <li><strong>Siblings:</strong> ${familyData.siblings}</li>
                    <li><strong>Grandparents:</strong> ${familyData.grandparents}</li>
                `;
            }
        };
        populateFamily('bride-family-list', data.family.bride);
        populateFamily('groom-family-list', data.family.groom);

        const eventsGrid = document.getElementById('events-grid');
        if (eventsGrid) {
            eventsGrid.innerHTML = '';
            data.events.forEach(ev => {
                const el = document.createElement('div');
                el.className = `event-card ${ev.is_main ? 'main-event' : ''}`;
                el.innerHTML = `
                    <h4 class="event-name">${ev.name}</h4>
                    <p class="event-meta">${ev.meta}</p>
                    <p class="event-meta">${ev.dress_code}</p>
                    <p class="event-desc">${ev.desc}</p>
                `;
                eventsGrid.appendChild(el);
            });
        }

        const tlContainer = document.getElementById('timeline-container');
        if (tlContainer) {
            tlContainer.innerHTML = '';
            data.timeline.forEach(tl => {
                const el = document.createElement('div');
                el.className = 'tl-item';
                el.innerHTML = `
                    <div class="tl-time">${tl.time}</div>
                    <div class="tl-content"><span class="tl-title">${tl.title}</span><small>${tl.desc}</small></div>
                `;
                tlContainer.appendChild(el);
            });
        }

        document.getElementById('venue-name').textContent = data.venue.name;
        document.getElementById('venue-address').innerHTML = data.venue.address;
        document.getElementById('venue-parking').innerHTML = data.venue.parking;

        document.getElementById('footer-names').textContent = data.footer.names;
        document.getElementById('footer-coordinator').innerHTML = data.footer.coordinator;
    }

    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Open Invitation
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('hidden');
            mainContent.classList.add('visible');
            
            // Show mute button immediately after clicking
            if (musicToggle) {
                musicToggle.style.display = 'flex';
            }
            
            // Play Music
            if (!isPlaying && bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if(volIcon) {
                        volIcon.setAttribute('d', "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z");
                    }
                }).catch(err => {
                    console.log("Autoplay prevented", err);
                });
            }

            // Trigger immediate reveal for elements already in view
            setTimeout(() => {
                document.querySelectorAll('.scroll-reveal').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if(rect.top < window.innerHeight) {
                        el.classList.add('active');
                    }
                });
            }, 600);

            // Start Auto-scroll slowly after a slight delay
            setTimeout(() => {
                startAutoScroll();
            }, 2000);
        });
    }

    let resumeTimeout;
    function startAutoScroll() {
        if (scrollInterval) clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2) {
                clearInterval(scrollInterval);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                    startAutoScroll();
                }, 1500);
            } else {
                window.scrollBy(0, 1);
            }
        }, 40);
    }

    function stopAutoScroll() {
        if (scrollInterval) clearInterval(scrollInterval);
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            startAutoScroll();
        }, 3000);
    }

    ['wheel', 'touchmove', 'mousedown', 'keydown'].forEach(evt => {
        window.addEventListener(evt, stopAutoScroll, {passive: true});
    });

    // Music Toggle
    if (musicToggle && bgMusic && volIcon) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                isPlaying = false;
                volIcon.setAttribute('d', "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z");
            } else {
                bgMusic.play();
                isPlaying = true;
                volIcon.setAttribute('d', "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z");
            }
        });
    }

    // Countdown Timer
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const targetDate = new Date('January 10, 2027 17:00:00').getTime();
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance < 0) {
                countdownEl.innerHTML = "<h3 style='font-family: var(--font-heading); font-size: 2rem; color: var(--accent);'>Today is the day!</h3>";
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownEl.innerHTML = `
                <div class="cd-box"><span class="cd-num">${days}</span><span class="cd-label">Days</span></div>
                <div class="cd-box"><span class="cd-num">${hours}</span><span class="cd-label">Hours</span></div>
                <div class="cd-box"><span class="cd-num">${minutes}</span><span class="cd-label">Mins</span></div>
                <div class="cd-box"><span class="cd-num">${seconds}</span><span class="cd-label">Secs</span></div>
            `;
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // Guestbook & Wishes (wrapped in try/catch to prevent local file crash)
    try {
        const wishesForm = document.getElementById('wishes-form');
        const wishesListContainer = document.getElementById('wishes-list-container');

        let savedWishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
        
        function renderWishes() {
            if (!wishesListContainer) return;
            wishesListContainer.innerHTML = '';
            savedWishes.slice().reverse().forEach(wish => {
                const wishEl = document.createElement('div');
                wishEl.className = 'wish-message';
                wishEl.innerHTML = `
                    <p class="w-text">"${wish.message}"</p>
                    <p class="w-author">- ${wish.name} (${wish.guests} Guests)</p>
                `;
                wishesListContainer.appendChild(wishEl);
            });
        }
        
        renderWishes();

        if(wishesForm) {
            wishesForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('guest-name').value;
                const count = document.getElementById('guest-count').value;
                const msg = document.getElementById('guest-msg').value;

                const newWish = { name, guests: count, message: msg, date: new Date().toISOString() };
                savedWishes.push(newWish);
                localStorage.setItem('wedding_wishes', JSON.stringify(savedWishes));

                renderWishes();
                document.getElementById('form-success').style.display = 'block';
                wishesForm.reset();
                setTimeout(() => {
                    document.getElementById('form-success').style.display = 'none';
                }, 4000);
            });
        }
    } catch(e) {
        console.log("LocalStorage might be disabled due to local file restrictions:", e);
    }
});
