// Elements
const strainInput = document.getElementById('strainName');
const brandInput = document.getElementById('brandName');
const typeInput = document.getElementById('type');
const effectInput = document.getElementById('effect');
const ratingInput = document.getElementById('rating');
const notesInput = document.getElementById('notes');
const submitBtn = document.getElementById('submitBtn');
const entryForm = document.getElementById('entryForm');
const historyList = document.getElementById('historyList');
// Initialization
document.addEventListener('DOMContentLoaded', () => {
    displayItems();
    validateForm(); // Initial check to ensure button is disabled
});

// Listen for any input in the form to trigger validation logic
entryForm.addEventListener('input', validateForm);

/**
  Checks if required fields are filled to enable/disable the submit button
 /
function validateForm() {
    const isNameValid = strainInput.value.trim().length > 0;
    const isRatingValid = ratingInput.value !== "" && ratingInput.value >= 1 && ratingInput.value <= 5;

    if (isNameValid && isRatingValid) {
        submitBtn.classList.add('ready');
    } else {
        submitBtn.classList.remove('ready');
    }
}

/**
  Saves a new experience to localStorage
 /
function saveItem() {
    // Security check: prevent saving if button isn't in 'ready' state
    if (!submitBtn.classList.contains('ready')) return;

    const newItem = {
        id: Date.now(),
        name: strainInput.value,
        brand: brandInput.value,
        type: typeInput.value,
        effect: effectInput.value,
        rating: parseInt(ratingInput.value),
        notes: notesInput.value
    };

    const items = JSON.parse(localStorage.getItem('stashTrackData') || '[]');
    items.push(newItem);
    localStorage.setItem('stashTrackData', JSON.stringify(items));

    // Reset fields after successful save
    resetForm();
    displayItems();
}

/**
  Clears all input fields and resets button state
 /
function resetForm() {
    strainInput.value = '';
    brandInput.value = '';
    ratingInput.value = '';
    notesInput.value = '';
    validateForm();
}

/**
  Deletes an item from localStorage by ID
 /
function deleteItem(id) {
    if(!confirm("Delete this entry?")) return;

    let items = JSON.parse(localStorage.getItem('stashTrackData') || '[]');
    items = items.filter(item => item.id !== id);
    localStorage.setItem('stashTrackData', JSON.stringify(items));
    displayItems();
}

/**
  Renders the list of logs to the DOM
 /
function displayItems() {
    const items = JSON.parse(localStorage.getItem('stashTrackData') || '[]');
    historyList.innerHTML = '';

    if (items.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No logs yet. Start your journey above.</p>';
        return;
    }

    const header = document.createElement('div');
    header.className = 'history-header';
    header.innerText = 'Recent Logs';
    historyList.appendChild(header);

    // Reverse to show newest first
    [...items].reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
            <div class="item-main">
                <div class="item-info">
                    <b>${item.name}</b>
                    <span>${item.brand || 'Unknown Brand'}</span>
                </div>
                <div style="display: flex; align-items: center;">
                    <div class="rating">${'⭐'.repeat(item.rating)}</div>
                    <button class="delete-btn" onclick="deleteItem(${item.id})">×</button>
                </div>
            </div>
            <div class="item-meta">
                <span class="tag tag-type">${item.type}</span>
                <span class="tag tag-effect">${item.effect}</span>
            </div>
            ${item.notes ? `<div class="notes-text">${item.notes}</div>` : ''}
        `;
        historyList.appendChild(div);
    });
}

// Attach the click event to the button since we removed 'onclick' from HTML
submitBtn.addEventListener('click', saveItem);
