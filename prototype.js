// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content areas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Language selector functionality
document.getElementById('languageSelect').addEventListener('change', function() {
    const selectedLanguage = this.value;
    
    // Simple language change simulation
    if (selectedLanguage === 'te') {
        // Telugu translations (basic example)
        document.querySelector('.logo h1').textContent = 'కిసాన్ AI';
        document.querySelector('.logo p').textContent = 'స్మార్ట్ వ్యవసాయం';
    } else if (selectedLanguage === 'hi') {
        // Hindi translations (basic example)
        document.querySelector('.logo h1').textContent = 'किसान AI';
        document.querySelector('.logo p').textContent = 'स्मार्ट कृषि';
    } else {
        // English (default)
        document.querySelector('.logo h1').textContent = 'KisanAI';
        document.querySelector('.logo p').textContent = 'Smart Agriculture';
    }
});

// Crop health image upload functionality
const uploadArea = document.getElementById('uploadArea');
const cropImageInput = document.getElementById('cropImage');
const analysisResult = document.getElementById('analysisResult');

uploadArea.addEventListener('click', function() {
    cropImageInput.click();
});

uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = '#4a7c59';
    this.style.backgroundColor = 'rgba(74, 124, 89, 0.1)';
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.style.borderColor = '#ddd';
    this.style.backgroundColor = '';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = '#ddd';
    this.style.backgroundColor = '';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

cropImageInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        handleImageUpload(this.files[0]);
    }
});

function handleImageUpload(file) {
    // Simulate image analysis
    uploadArea.innerHTML = `
        <div class="upload-content">
            <span class="upload-icon">⏳</span>
            <p>Analyzing your crop image...</p>
        </div>
    `;
    
    // Simulate processing time
    setTimeout(function() {
        uploadArea.innerHTML = `
            <div class="upload-content">
                <span class="upload-icon">✅</span>
                <p>Analysis complete! (${file.name})</p>
            </div>
        `;
        
        // Show analysis result
        analysisResult.classList.remove('hidden');
        
        // Simulate different results randomly
        const results = [
            {
                status: 'healthy',
                icon: '✅',
                text: 'Crop appears healthy',
                recommendations: [
                    'Continue current watering schedule',
                    'Apply organic fertilizer in 2 weeks',
                    'Monitor for pest activity'
                ]
            },
            {
                status: 'warning',
                icon: '⚠️',
                text: 'Early disease symptoms detected',
                recommendations: [
                    'Apply organic fungicide immediately',
                    'Increase ventilation around plants',
                    'Remove affected leaves'
                ]
            },
            {
                status: 'pest',
                icon: '🐛',
                text: 'Pest activity detected',
                recommendations: [
                    'Apply neem oil spray',
                    'Check neighboring plants',
                    'Consider beneficial insects'
                ]
            }
        ];
        
        const randomResult = results[Math.floor(Math.random() * results.length)];
        
        const resultCard = document.querySelector('.result-card');
        resultCard.innerHTML = `
            <div class="status ${randomResult.status}">
                <span class="status-icon">${randomResult.icon}</span>
                <span>${randomResult.text}</span>
            </div>
            <div class="recommendations">
                <h4>Recommendations:</h4>
                <ul>
                    ${randomResult.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }, 2000);
}

// Equipment sharing functionality
function addEquipment() {
    document.getElementById('equipmentModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('equipmentModal').classList.add('hidden');
}

// Close modal when clicking outside
document.getElementById('equipmentModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Equipment form submission
document.getElementById('equipmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const equipmentName = this.children[0].value;
    const equipmentType = this.children[1].value;
    const ownerName = this.children[2].value;
    const location = this.children[3].value;
    const rate = this.children[4].value;
    const availability = this.children[5].value;
    
    // Create new equipment card
    const equipmentGrid = document.querySelector('.equipment-grid');
    const newCard = document.createElement('div');
    newCard.className = 'equipment-card';
    
    // Equipment type emoji mapping
    const typeEmojis = {
        'tractor': '🚜',
        'harvester': '🌾',
        'plough': '⚡',
        'sprayer': '💧'
    };
    
    newCard.innerHTML = `
        <div class="equipment-image">${typeEmojis[equipmentType] || '🔧'}</div>
        <div class="equipment-info">
            <h3>${equipmentName}</h3>
            <p><strong>Owner:</strong> ${ownerName}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Rate:</strong> ₹${rate}/day</p>
            <p><strong>Available:</strong> ${availability}</p>
            <button class="btn-secondary">Contact Owner</button>
        </div>
    `;
    
    equipmentGrid.appendChild(newCard);
    
    // Reset form and close modal
    this.reset();
    closeModal();
    
    // Show success message
    alert('Equipment added successfully!');
});

// Equipment filter functionality
document.getElementById('equipmentType').addEventListener('change', function() {
    const selectedType = this.value.toLowerCase();
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    equipmentCards.forEach(card => {
        const equipmentName = card.querySelector('h3').textContent.toLowerCase();
        
        if (selectedType === '' || equipmentName.includes(selectedType)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Contact owner functionality (simulation)
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Contact Owner') {
        const ownerName = e.target.closest('.equipment-info').querySelector('p').textContent.split(': ')[1];
        alert(`Contacting ${ownerName}...\n\nIn a real app, this would:\n- Send a message to the owner\n- Show contact details\n- Connect via WhatsApp/phone`);
    }
});

// Market price update simulation
function updatePrices() {
    const priceCards = document.querySelectorAll('.price-card');
    
    priceCards.forEach(card => {
        const changeElement = card.querySelector('.change');
        const currentChange = parseInt(changeElement.textContent.replace(/[^\d-]/g, ''));
        
        // Simulate price fluctuation
        const newChange = Math.floor(Math.random() * 400) - 200; // Random between -200 and +200
        
        changeElement.textContent = newChange >= 0 ? `+₹${newChange}` : `₹${newChange}`;
        changeElement.className = newChange >= 0 ? 'change positive' : 'change negative';
    });
}

// Update prices every 30 seconds (simulation)
setInterval(updatePrices, 30000);

// Add some interactive feedback
document.addEventListener('click', function(e) {
    // Add click animation to buttons
    if (e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-secondary')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});

// Simple notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        border-radius: 5px;
        z-index: 1001;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show welcome message
setTimeout(() => {
    showNotification('Welcome to KisanAI! Start by uploading a crop image.');
}, 1000);