// --- Product Data ---
// The products array is now loaded from data.js (PRODUCT_DATA)
const products = typeof PRODUCT_DATA !== 'undefined' ? PRODUCT_DATA : [];

// --- Application State ---
let cart = [];

// --- DOM Elements ---
const productGrid = document.getElementById('productGrid');
const reviewsGrid = document.getElementById('reviewsGrid');
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const cartTotalCostElement = document.getElementById('cartTotalCost');
const checkoutBtn = document.getElementById('checkoutBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// --- Initialization ---
function init() {
    renderProducts('all');
    if (reviewsGrid) renderReviews();
    setupEventListeners();
    updateCartUI();
}

// --- Render Products ---
function renderProducts(filter) {
    productGrid.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`; // Staggered animation

        let extraHtml = '';
        if (product.category === 'cakes' || product.category === 'tea-cakes') {
            let optionsHtml = '';
            const maxWeight = product.category === 'cakes' ? 10 : 5;
            for (let i = 0.5; i <= maxWeight; i += 0.5) {
                const selected = i === 1 ? 'selected' : '';
                optionsHtml += `<option value="${i}" ${selected}>${i} Kg</option>`;
            }
            extraHtml = `
                <select class="weight-select" id="weight-${product.id}">
                    ${optionsHtml}
                </select>
            `;
        }

        const isWeightedCat = product.category === 'cakes' || product.category === 'tea-cakes';

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <span class="product-category">${product.category.replace('-', ' ')}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price.toFixed(2)}${isWeightedCat ? ' / kg' : ''}</div>
                ${extraHtml}
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Add to Order</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// --- Render Reviews ---
function renderReviews() {
    reviewsGrid.innerHTML = '';

    if (typeof REVIEWS_DATA !== 'undefined' && REVIEWS_DATA.length > 0) {
        REVIEWS_DATA.forEach((review, index) => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <img src="${review.image}" alt="Review by ${review.customerName}" class="review-image" loading="lazy">
                <div class="review-stars">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-author">- ${review.customerName}</div>
            `;
            reviewsGrid.appendChild(card);
        });
    } else {
        reviewsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--text-muted);">No reviews yet. Be the first to leave one!</p>';
    }
}

// --- Cart Logic ---
window.addToCart = function (productId) {
    const product = products.find(p => p.id === productId);
    let selectedWeight = 1;
    const isWeightedCat = product.category === 'cakes' || product.category === 'tea-cakes';

    if (isWeightedCat) {
        const weightSelect = document.getElementById(`weight-${productId}`);
        if (weightSelect) {
            selectedWeight = parseFloat(weightSelect.value);
        }
    }

    // Create a unique cart item ID based on the weight so they don't merge if they have different weights
    const cartItemId = isWeightedCat ? `${productId}-${selectedWeight}` : productId;

    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const itemPrice = isWeightedCat ? product.price * selectedWeight : product.price;
        cart.push({
            ...product,
            cartItemId: cartItemId,
            selectedWeight: selectedWeight,
            cartPrice: itemPrice,
            quantity: 1
        });
    }

    openCart();
    updateCartUI();
};

window.updateQuantity = function (cartItemId, delta) {
    const item = cart.find(item => item.cartItemId === cartItemId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(cartItemId);
        } else {
            updateCartUI();
        }
    }
};

window.removeFromCart = function (cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    updateCartUI();
};

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update total cost
    const totalCost = cart.reduce((sum, item) => sum + (item.cartPrice * item.quantity), 0);
    cartTotalCostElement.textContent = `₹${totalCost.toFixed(2)}`;

    // Enable/Disable checkout
    checkoutBtn.disabled = cart.length === 0;

    // Render items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart-msg">Your cart is empty. Let's add some treats!</div>`;
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const isWeightedCat = item.category === 'cakes' || item.category === 'tea-cakes';
        const weightLabel = isWeightedCat ? ` <span style="font-size: 0.8rem; color: var(--text-muted);">(${item.selectedWeight} Kg)</span>` : '';
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}${weightLabel}</div>
                <div class="cart-item-price">₹${item.cartPrice.toFixed(2)}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity('${item.cartItemId}', -1)">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.cartItemId}', 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.cartItemId}')">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
}

// --- Cart UI Toggles ---
function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// --- WhatsApp Checkout Logic ---
function processCheckout() {
    if (cart.length === 0) return;

    // Replace with ACTUAL phone number including country code, e.g., '1234567890'
    // I am using a placeholder for now as requested.
    const phoneNumber = '+919700879944';

    let message = `Hello SusmiArtz! I would like to place an order:\n\n`;

    cart.forEach(item => {
        const isWeightedCat = item.category === 'cakes' || item.category === 'tea-cakes';
        const weightText = isWeightedCat ? ` (${item.selectedWeight} Kg)` : '';
        message += `* ${item.quantity}x ${item.name}${weightText} (₹${(item.cartPrice * item.quantity).toFixed(2)})\n`;
    });

    const totalCost = cart.reduce((sum, item) => sum + (item.cartPrice * item.quantity), 0);
    message += `\n*Total Bill: ₹${totalCost.toFixed(2)}*\n\n`;
    message += `Please confirm my order and share payment details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappUrl, '_blank');
}

// --- Event Listeners ---
function setupEventListeners() {
    cartToggle.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', processCheckout);

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            // Re-render
            const filter = e.target.getAttribute('data-filter');
            renderProducts(filter);
        });
    });
}

// Boot up
init();
