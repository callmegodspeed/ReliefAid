// Initialize Map
function initializeMap() {
    const map = L.map('map').setView([12.0, 8.0], 6); // Centered on the region

    // Add OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Define colors for each layer
    const layerColors = {
        flood: '#3498db', // Blue for flood
        bushfires: '#e74c3c', // Red for bushfires
        aiFloodDetection: '#2ecc71', // Green for AI flood detection
        temperature: '#f1c40f', // Yellow for temperature
        wind: '#9b59b6', // Purple for wind
    };

    // Function to generate random GeoJSON data for a layer
    function generateRandomGeoJSON(numFeatures, bounds) {
        const features = [];
        for (let i = 0; i < numFeatures; i++) {
            const lat = bounds.south + Math.random() * (bounds.north - bounds.south);
            const lng = bounds.west + Math.random() * (bounds.east - bounds.west);
            features.push({
                type: 'Feature',
                properties: { name: `Random Location ${i + 1}` },
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat],
                },
            });
        }
        return {
            type: 'FeatureCollection',
            features,
        };
    }

    // Define bounds for random locations (adjust as needed)
    const bounds = {
        north: 14.0,
        south: 10.0,
        east: 10.0,
        west: 6.0,
    };

    // Generate unique GeoJSON data for each layer
    const floodData = generateRandomGeoJSON(5, bounds); // 5 random flood locations
    const bushfireData = generateRandomGeoJSON(5, bounds); // 5 random bushfire locations
    const aiFloodData = generateRandomGeoJSON(5, bounds); // 5 random AI flood detection locations
    const temperatureData = generateRandomGeoJSON(5, bounds); // 5 random temperature locations
    const windData = generateRandomGeoJSON(5, bounds); // 5 random wind locations

    // Add layers to the map
    const floodLayer = L.geoJSON(floodData, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: layerColors.flood,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
            });
        },
    }).addTo(map);

    const bushfireLayer = L.geoJSON(bushfireData, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: layerColors.bushfires,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
            });
        },
    }).addTo(map);

    const aiFloodLayer = L.geoJSON(aiFloodData, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: layerColors.aiFloodDetection,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
            });
        },
    });

    const temperatureLayer = L.geoJSON(temperatureData, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: layerColors.temperature,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
            });
        },
    });

    const windLayer = L.geoJSON(windData, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: layerColors.wind,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
            });
        },
    });

    // Add layer control to toggle layers
    const baseLayers = {
        'Flood': floodLayer,
        'Bushfires': bushfireLayer,
    };

    const overlayLayers = {
        'AI Flood Detection': aiFloodLayer,
        'Temperature': temperatureLayer,
        'Wind': windLayer,
    };

    L.control.layers(baseLayers, overlayLayers).addTo(map);
}

// Hero Image Slider
function initializeHeroSlider() {
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    function showNextImage() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }

    setInterval(showNextImage, 5000);
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    let index = 0;

    // Create dots dynamically
    if (dotsContainer) {
        testimonials.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                index = i;
                updateSlider();
                updateDots();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateSlider() {
        const offset = -index * 100;
        testimonialContainer.style.transform = `translateX(${offset}%)`;
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    setInterval(() => {
        index = (index + 1) % testimonials.length;
        updateSlider();
        updateDots();
    }, 5000);
}

// Update Time and Disaster Cards
function updateTime() {
    const updateTimes = document.querySelectorAll('.update-time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    updateTimes.forEach(updateTime => {
        updateTime.textContent = `Last updated: ${formattedTime}`;
    });
}

function updateDisasterCards() {
    const disasterCards = document.querySelectorAll('.disaster-card');

    disasterCards.forEach(card => {
        const disasterType = card.classList[1];
        const content = card.querySelector('.disaster-content ul');
        const newData = getSimulatedData(disasterType);

        content.innerHTML = '';
        newData.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.location}</strong> - Severity: ${item.severity}`;
            content.appendChild(li);
        });
    });
}

function getSimulatedData(disasterType) {
    const data = {
        flood: [
            { location: 'Accra, Ghana', severity: 'High' },
            { location: 'Kumasi, Ghana', severity: 'Medium' },
        ],
        fire: [
            { location: 'Tamale, Ghana', severity: 'High' },
            { location: 'Cape Coast, Ghana', severity: 'Medium' },
        ],
        earthquake: [
            { location: 'Takoradi, Ghana', severity: 'Low' },
            { location: 'Ho, Ghana', severity: 'Medium' },
        ],
    };

    return data[disasterType] || [];
}

// Chat Functionality
function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.classList.toggle('active');
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatInput.value.trim() !== '') {
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.innerHTML = `
            <div class="profile-icon"></div>
            <div class="message-text">${chatInput.value}</div>
        `;
        chatMessages.appendChild(userMessage);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot');
            botMessage.innerHTML = `
                <div class="profile-icon"></div>
                <div class="message-text">Please wait a moment while we connect you with a representative...</div>
            `;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Donation Form
function handleDonationForm() {
    const cashDonation = document.getElementById('cash');
    const kindDonation = document.getElementById('kind');
    const paymentSection = document.getElementById('payment-section');

    cashDonation.addEventListener('change', () => {
        if (cashDonation.checked) paymentSection.style.display = 'block';
    });

    kindDonation.addEventListener('change', () => {
        if (kindDonation.checked) paymentSection.style.display = 'none';
    });

    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thank you for your donation!');
            donationForm.reset();
        });
    }
}

// Back to Top Button
function handleBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize All Functions
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('map')) initializeMap();
    if (document.querySelector('.hero-image')) initializeHeroSlider();
    if (document.querySelector('.testimonial-container')) initializeTestimonialSlider();
    if (document.querySelector('.disaster-card')) {
        setInterval(() => {
            updateTime();
            updateDisasterCards();
        }, 300000);
        updateTime();
        updateDisasterCards();
    }
    if (document.getElementById('chat-box')) {
        document.getElementById('chat-toggle').addEventListener('click', toggleChat);
        document.getElementById('send-message').addEventListener('click', sendMessage);
    }
    if (document.getElementById('cash')) handleDonationForm();
    if (document.getElementById('backToTop')) handleBackToTop();
});

// Initialize the mini-map
const miniMap = L.map('mini-map').setView([12.0, 8.0], 6); // Centered on a default location

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(miniMap);

// Add a marker (optional)
L.marker([12.0, 8.0]).addTo(miniMap)
    .bindPopup('Example Location')
    .openPopup();

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Highlight the active tab when a section is scrolled to
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.inventory-container > div');
    const tabs = document.querySelectorAll('.inventory-tabs button');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) { // Adjust the offset as needed
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[index].classList.add('active');
        }
    });
});

function openNewsModal(newsId) {
    const modal = document.getElementById('news-modal');
    const modalContent = document.getElementById('modal-content');

    // Clear previous content
    modalContent.innerHTML = '';

    // Add content based on the newsId
    switch (newsId) {
        case 'flood-relief-accra':
            modalContent.innerHTML = `
                <img src="/public/images/flood-relief.jpg" alt="Flood Relief Efforts" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px;">
                <h2>Flood Relief Efforts in Accra</h2>
                <p>The recent floods in Accra have left many communities devastated. Our team has been working tirelessly to provide relief to those affected. We have distributed food, water, and medical supplies to over 1,000 families.</p>
                <p>In addition to material aid, we have also set up temporary shelters for those who have lost their homes. Our volunteers are on the ground, offering emotional support and counseling to help people cope with the trauma.</p>
                <p>We are also collaborating with local authorities to improve drainage systems and prevent future flooding. Your support can make a difference. Please consider donating to our flood relief fund.</p>
            `;
            break;

        case 'new-shelter-kumasi':
            modalContent.innerHTML = `
                <img src="/public/images/new-shelter.jpg" alt="New Shelter Opens" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px;">
                <h2>New Shelter Opens in Kumasi</h2>
                <p>A new shelter has been established in Kumasi to provide temporary housing for families displaced by the floods. The shelter can accommodate up to 200 people and is equipped with basic amenities such as beds, clean water, and sanitation facilities.</p>
                <p>Our team is also providing educational activities for children and vocational training for adults to help them rebuild their lives. We are grateful to our partners and donors for making this possible.</p>
                <p>If you would like to contribute to our efforts, please visit our donation page. Every little bit helps in making a difference in the lives of those affected.</p>
            `;
            break;

        case 'medical-aid-flood':
            modalContent.innerHTML = `
                <img src="/public/images/medical-aid.jpg" alt="Medical Aid" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px;">
                <h2>Medical Aid for Flood Victims</h2>
                <p>Medical teams have been deployed to flood-affected areas to provide urgent medical care. Many people have suffered injuries and illnesses due to the floods, and our teams are working around the clock to provide treatment.</p>
                <p>We are also distributing essential medicines and vaccines to prevent the outbreak of waterborne diseases. Our mobile clinics are reaching remote areas where access to healthcare is limited.</p>
                <p>Your support is crucial in helping us continue our medical aid efforts. Please consider making a donation to support our work.</p>
            `;
            break;

        case 'food-distribution-tamale':
            modalContent.innerHTML = `
                <img src="/public/images/food-distribution.jpg" alt="Food Distribution" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px;">
                <h2>Food Distribution in Tamale</h2>
                <p>Food banks in Tamale have been working tirelessly to distribute food supplies to communities affected by the floods. We have provided over 5,000 meals to families in need.</p>
                <p>In addition to food, we are also distributing clean drinking water and hygiene kits to prevent the spread of diseases. Our volunteers are working closely with local leaders to ensure that aid reaches those who need it most.</p>
                <p>We are grateful for the support of our donors and partners. If you would like to contribute, please visit our donation page.</p>
            `;
            break;

        case 'power-restoration-tema':
            modalContent.innerHTML = `
                <img src="/public/images/power-restoration.jpg" alt="Power Restoration" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px;">
                <h2>Power Restoration in Tema</h2>
                <p>Efforts are underway to restore electricity in flood-hit areas of Tema. Many homes and businesses have been without power for days, and our teams are working closely with the local power company to expedite the restoration process.</p>
                <p>We are also providing generators to critical facilities such as hospitals and schools to ensure that essential services can continue. Our goal is to restore power to all affected areas as quickly as possible.</p>
                <p>Your support can help us in our efforts to restore normalcy to these communities. Please consider making a donation to support our work.</p>
            `;
            break;

        case 'emotional-support-survivors':
            modalContent.innerHTML = `
                <img src="/public/images/emotional-support.jpg" alt="Emotional Support" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px;">
                <h2>Emotional Support for Survivors</h2>
                <p>The floods have left many people traumatized and in need of emotional support. Our team of counselors and psychologists is providing free counseling services to help survivors cope with the emotional impact of the disaster.</p>
                <p>We are also organizing support groups where people can share their experiences and find comfort in knowing that they are not alone. Our goal is to help people rebuild their lives and find hope for the future.</p>
                <p>If you or someone you know is in need of emotional support, please reach out to us. We are here to help.</p>
            `;
            break;

        default:
            modalContent.innerHTML = `<p>No content available for this news item.</p>`;
    }

    // Display the modal
    modal.style.display = 'block';
}

function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('news-modal');
    if (event.target === modal) {
        closeNewsModal();
    }
});

