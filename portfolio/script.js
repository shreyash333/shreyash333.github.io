document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Use data from data.js
    try {
        // Sanitize data to prevent XSS
        const escapeData = (obj) => {
            if (typeof obj === 'string') {
                return obj.replace(/[&<>'"]/g, 
                    tag => ({
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        "'": '&#39;',
                        '"': '&quot;'
                    }[tag] || tag)
                ).replace(/&lt;strong(.*?)&gt;/g, '<strong$1>').replace(/&lt;\/strong&gt;/g, '</strong>').replace(/&lt;em&gt;/g, '<em>').replace(/&lt;\/em&gt;/g, '</em>').replace(/&lt;br&gt;/g, '<br>');
            } else if (Array.isArray(obj)) {
                return obj.map(escapeData);
            } else if (typeof obj === 'object' && obj !== null) {
                const newObj = {};
                for (const key in obj) {
                    newObj[key] = escapeData(obj[key]);
                }
                return newObj;
            }
            return obj;
        };
        populateWebsite(escapeData(portfolioData));
        // Apply animations to newly created elements
        observeElements();
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('hero-summary').textContent = "Failed to load portfolio data. Please check data.js syntax.";
    }
});

function populateWebsite(data) {
    // 0. Populate Meta & Layout elements
    const shortRole = data.personal.role.split('|')[0].trim();
    document.title = `${data.personal.name} | ${shortRole}`;
    
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc) {
        metaDesc.setAttribute('content', `Portfolio of ${data.personal.name}, a ${data.personal.role} based in ${data.personal.location}.`);
    }
    
    document.getElementById('footer-name').textContent = data.personal.name;

    // 1. Populate Hero Section
    const nameParts = data.personal.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    
    document.getElementById('hero-name').innerHTML = `${firstName} <span>${lastName}</span>`;
    document.getElementById('hero-role').textContent = data.personal.role;
    document.getElementById('hero-summary').textContent = data.personal.summary;
    document.getElementById('hero-exp-years').textContent = data.personal.yearsExperience;
    
    document.getElementById('hero-social').innerHTML = `
        ${data.personal.linkedin ? `<a href="${data.personal.linkedin}" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
        ${data.personal.github ? `<a href="${data.personal.github}" target="_blank" rel="noopener noreferrer" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
        ${data.personal.youtube ? `<a href="${data.personal.youtube}" target="_blank" rel="noopener noreferrer" title="YouTube"><i class="fab fa-youtube"></i></a>` : ''}
        ${data.personal.instagram ? `<a href="${data.personal.instagram}" target="_blank" rel="noopener noreferrer" title="Instagram"><i class="fab fa-instagram"></i></a>` : ''}
        <a href="mailto:${data.personal.email}" title="Email"><i class="fas fa-envelope"></i></a>
    `;

    // 2. Populate About Section
    const aboutContainer = document.getElementById('about-container');
    aboutContainer.innerHTML = data.about.map(paragraph => `<p>${paragraph}</p>`).join('');

    // 3. Populate Skills Section
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = data.skills.map(skillGroup => `
        <div class="skill-category glass-panel">
            <h3><i class="${skillGroup.icon}"></i> ${skillGroup.category}</h3>
            <div class="tags">
                ${skillGroup.items.map(item => `<span>${item}</span>`).join('')}
            </div>
        </div>
    `).join('');

    // 4. Populate Experience Section
    const experienceContainer = document.getElementById('experience-container');
    experienceContainer.innerHTML = data.experience.map(job => `
        <div class="timeline-item glass-panel">
            <div class="timeline-dot"></div>
            <div class="timeline-date">${job.period}</div>
            <div class="timeline-content">
                <h3>${job.role}</h3>
                <h4>${job.company}</h4>
                <ul>
                    ${job.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // 5. Populate Projects Section
    const projectsContainer = document.getElementById('projects-container');
    window.projectsLimit = 3;
    window.showingAllProjects = false;
    window.renderProjects = function() {
        const toShow = window.showingAllProjects ? data.projects : data.projects.slice(0, window.projectsLimit);
        projectsContainer.innerHTML = toShow.map(project => `
            <div class="project-card glass-panel">
                <div class="project-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div class="project-tag">${project.tag}</div>
                    ${project.videoUrl ? `<a href="${project.videoUrl}" target="_blank" rel="noopener noreferrer" class="video-btn" title="Watch Video"><i class="fab fa-youtube"></i></a>` : ''}
                </div>
                <h3>${project.title}</h3>
                <p class="tech-stack">${project.techStack}</p>
                <p>${project.description}</p>
            </div>
        `).join('');
        
        if (data.projects.length > window.projectsLimit) {
            const btnContainer = document.createElement('div');
            btnContainer.style.cssText = 'grid-column: 1 / -1; text-align: center; margin-top: 20px;';
            const btn = document.createElement('a');
            btn.href = 'javascript:void(0)';
            btn.className = 'btn-outline';
            btn.style.display = 'inline-block';
            btn.textContent = window.showingAllProjects ? 'Show Less' : 'Load More';
            btn.onclick = (e) => {
                e.preventDefault();
                window.showingAllProjects = !window.showingAllProjects;
                window.renderProjects();
                if (window.showingAllProjects) observeElements();
            };
            btnContainer.appendChild(btn);
            projectsContainer.appendChild(btnContainer);
        }
    };
    window.renderProjects();

    // 5.5 Populate Blog Section
    if(data.blogs && data.blogs.length > 0) {
        const blogContainer = document.getElementById('blog-container');
        window.blogLimit = 3;
        window.showingAllBlogs = false;
        window.renderBlogs = function() {
            const toShow = window.showingAllBlogs ? data.blogs : data.blogs.slice(0, window.blogLimit);
            blogContainer.innerHTML = toShow.map(blog => `
                <div class="blog-card glass-panel" style="justify-content: space-between;">
                    <div>
                        <div class="blog-meta" style="margin-bottom: 15px; font-size: 1.5rem; color: var(--accent-primary);">
                            ${blog.platform === 'LinkedIn' ? '<i class="fab fa-linkedin"></i>' : '<i class="fab fa-dev"></i>'}
                            <span style="font-size: 0.9rem; vertical-align: middle; margin-left: 10px; color: var(--text-secondary);">${blog.platform}</span>
                        </div>
                        <h3 style="margin-bottom: 20px;">${blog.title}</h3>
                    </div>
                    <a href="${blog.url}" target="_blank" rel="noopener noreferrer" class="read-more" style="margin-top: auto;">Read Post <i class="fas fa-arrow-right"></i></a>
                </div>
            `).join('');
            
            if (data.blogs.length > window.blogLimit) {
                const btnContainer = document.createElement('div');
                btnContainer.style.cssText = 'grid-column: 1 / -1; text-align: center; margin-top: 20px;';
                const btn = document.createElement('a');
                btn.href = 'javascript:void(0)';
                btn.className = 'btn-outline';
                btn.style.display = 'inline-block';
                btn.textContent = window.showingAllBlogs ? 'Show Less' : 'Load More';
                btn.onclick = (e) => {
                    e.preventDefault();
                    window.showingAllBlogs = !window.showingAllBlogs;
                    window.renderBlogs();
                    if (window.showingAllBlogs) observeElements();
                };
                btnContainer.appendChild(btn);
                blogContainer.appendChild(btnContainer);
            }
        };
        window.renderBlogs();
    } else {
        const blogSec = document.getElementById('blog');
        if (blogSec) blogSec.style.display = 'none';
    }

    // 6. Populate Education Section
    const educationContainer = document.getElementById('education-container');
    educationContainer.innerHTML = data.education.map(edu => `
        <div class="edu-card glass-panel">
            <i class="${edu.icon} edu-icon"></i>
            <h3>${edu.degree}</h3>
            <h4>${edu.major}</h4>
            <p class="institution">${edu.institution}</p>
            <p class="year">${edu.period}</p>
            ${edu.grade ? `<p class="grade">${edu.grade}</p>` : ''}
        </div>
    `).join('');

    // 6.5 Populate Certifications Section
    if(data.certifications && data.certifications.length > 0) {
        const certificationsContainer = document.getElementById('certifications-container');
        certificationsContainer.innerHTML = data.certifications.map(cert => `
            <div class="cert-card glass-panel">
                <i class="${cert.icon} cert-icon"></i>
                <div class="cert-info">
                    <h3>${cert.name}</h3>
                    <h4>${cert.issuer}</h4>
                    <p class="year">${cert.date}</p>
                </div>
                ${cert.url ? `<div class="pub-links" style="margin-top: 10px;"><a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="btn-outline">View Credential <i class="fas fa-external-link-alt"></i></a></div>` : ''}
            </div>
        `).join('');
    } else {
        const certsSec = document.getElementById('certifications');
        if(certsSec) certsSec.style.display = 'none';
    }

    // 6.75 Populate Publications Section
    if(data.publications && data.publications.length > 0) {
        const publicationsContainer = document.getElementById('publications-container');
        if(publicationsContainer) {
            publicationsContainer.innerHTML = data.publications.map(pub => `
                <div class="cert-card glass-panel pub-card">
                    <i class="fas fa-book-open cert-icon"></i>
                    <div class="cert-info">
                        <h3>${pub.title}</h3>
                        <h4>${pub.type} • ${pub.conference} (${pub.organizer})</h4>
                        <p class="year">${pub.date}</p>
                    </div>
                    <div class="pub-links">
                        ${pub.linkIEEE ? `<a href="${pub.linkIEEE}" target="_blank" rel="noopener noreferrer" class="btn-outline">IEEE <i class="fas fa-external-link-alt"></i></a>` : ''}
                        ${pub.linkRG ? `<a href="${pub.linkRG}" target="_blank" rel="noopener noreferrer" class="btn-outline">ResearchGate <i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                </div>
            `).join('');
        }
    } else {
        const pubSec = document.getElementById('publications');
        if(pubSec) pubSec.style.display = 'none';
    }

    // 7. Populate Contact Section
    document.getElementById('contact-list').innerHTML = `
        <li><i class="fas fa-map-marker-alt"></i> ${data.personal.location}</li>
        <li><i class="fas fa-phone-alt"></i> ${data.personal.phone}</li>
        <li><i class="fas fa-envelope"></i> ${data.personal.email}</li>
    `;
    
    document.getElementById('contact-social').innerHTML = `
        ${data.personal.linkedin ? `<a href="${data.personal.linkedin}" target="_blank" rel="noopener noreferrer" class="glass-icon"><i class="fab fa-linkedin-in"></i></a>` : ''}
        ${data.personal.github ? `<a href="${data.personal.github}" target="_blank" rel="noopener noreferrer" class="glass-icon"><i class="fab fa-github"></i></a>` : ''}
        ${data.personal.youtube ? `<a href="${data.personal.youtube}" target="_blank" rel="noopener noreferrer" class="glass-icon"><i class="fab fa-youtube"></i></a>` : ''}
        ${data.personal.instagram ? `<a href="${data.personal.instagram}" target="_blank" rel="noopener noreferrer" class="glass-icon"><i class="fab fa-instagram"></i></a>` : ''}
    `;
}

function observeElements() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation starting state and observe elements
    const animateElements = document.querySelectorAll('.glass-panel, .section-header');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Use requestAnimationFrame to ensure the styles are applied before observing
        requestAnimationFrame(() => {
            observer.observe(el);
        });
    });
}
