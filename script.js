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
        card.style.animationDelay = `${index * 0.1}s`;

        // Apply a subtle color tint overlay for cake variety if color is set
        const colorStyle = product.color
            ? `style="--card-accent: ${product.color};"`
            : '';

        let extraHtml = '';
        const isCake = product.category === 'cakes';
        const isTeaCake = product.category === 'tea-cakes';
        const isDonut = product.category === 'donuts';

        if (isCake) {
            // Cakes: 0.5 kg to 10 kg in 0.5 kg steps
            let optionsHtml = '';
            for (let i = 0.5; i <= 10; i = Math.round((i + 0.5) * 10) / 10) {
                const selected = i === 1 ? 'selected' : '';
                optionsHtml += `<option value="${i}" ${selected}>${i} Kg</option>`;
            }
            extraHtml = `<select class="weight-select" id="weight-${product.id}">${optionsHtml}</select>`;
        } else if (isTeaCake) {
            // Tea Cakes: 250g to 5 kg in 250g steps
            let optionsHtml = '';
            for (let i = 0.25; i <= 5.001; i = Math.round((i + 0.25) * 100) / 100) {
                const selected = i === 0.5 ? 'selected' : '';
                const label = i < 1 ? `${Math.round(i * 1000)}g` : `${i} Kg`;
                optionsHtml += `<option value="${i}" ${selected}>${label}</option>`;
            }
            extraHtml = `<select class="weight-select" id="weight-${product.id}">${optionsHtml}</select>`;
        } else if (isDonut) {
            // Donuts: 1 to 10 pieces
            let optionsHtml = '';
            for (let i = 1; i <= 10; i++) {
                optionsHtml += `<option value="${i}">${i} Donut${i > 1 ? 's' : ''}</option>`;
            }
            extraHtml = `<select class="weight-select" id="qty-${product.id}">${optionsHtml}</select>`;
        }

        const isWeightedCat = isCake || isTeaCake;
        // Tea cakes: price is per 500g, so multiply by (weight/0.5)
        // Regular cakes: price is per kg
        const priceLabel = isCake ? ' / kg' : (isTeaCake ? ' / 500g' : (isDonut ? ' each' : ''));

        card.innerHTML = `
            <div class="product-image-wrap" ${colorStyle}>
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy"
                    onerror="this.onerror=null; this.src='assets/gourmet_cake_1772978336876.png';">
                ${product.color ? `<div class="product-color-badge" style="background:${product.color}"></div>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category.replace('-', ' ')}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price.toFixed(2)}${priceLabel}</div>
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
    const isCake = product.category === 'cakes';
    const isTeaCake = product.category === 'tea-cakes';
    const isDonut = product.category === 'donuts';
    const isWeightedCat = isCake || isTeaCake;

    let selectedWeight = isTeaCake ? 0.5 : 1;
    let selectedQty = 1;

    if (isWeightedCat) {
        const weightSelect = document.getElementById(`weight-${productId}`);
        if (weightSelect) selectedWeight = parseFloat(weightSelect.value);
    }
    if (isDonut) {
        const qtySelect = document.getElementById(`qty-${productId}`);
        if (qtySelect) selectedQty = parseInt(qtySelect.value);
    }

    const cartItemId = isWeightedCat ? `${productId}-${selectedWeight}` : productId;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity += isDonut ? selectedQty : 1;
    } else {
        // Tea cakes: listed price is per 500g, so calculate proportionally
        let itemPrice;
        if (isTeaCake) {
            itemPrice = product.price * (selectedWeight / 0.5);
        } else if (isCake) {
            itemPrice = product.price * selectedWeight;
        } else {
            itemPrice = product.price;
        }
        cart.push({
            ...product,
            cartItemId,
            selectedWeight: isWeightedCat ? selectedWeight : null,
            cartPrice: itemPrice,
            quantity: isDonut ? selectedQty : 1
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
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    const totalCost = cart.reduce((sum, item) => sum + (item.cartPrice * item.quantity), 0);
    cartTotalCostElement.textContent = `₹${totalCost.toFixed(2)}`;

    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart-msg">Your cart is empty. Let's add some treats!</div>`;
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const isWeightedCat = item.category === 'cakes' || item.category === 'tea-cakes';
        let weightLabel = '';
        if (isWeightedCat && item.selectedWeight) {
            const w = item.selectedWeight;
            const wStr = (item.category === 'tea-cakes' && w < 1)
                ? `${Math.round(w * 1000)}g`
                : `${w} Kg`;
            weightLabel = ` <span style="font-size: 0.8rem; color: var(--text-muted);">(${wStr})</span>`;
        }
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}"
                onerror="this.onerror=null; this.src='assets/gourmet_cake_1772978336876.png';">
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
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// --- WhatsApp Checkout Logic ---
function processCheckout() {
    if (cart.length === 0) return;

    const phoneNumber = '+919700879944';

    let message = `Hello SusmiArtz! 🎂 I would like to place an order:\n\n`;

    cart.forEach(item => {
        const isTeaCake = item.category === 'tea-cakes';
        const isCake = item.category === 'cakes';
        let weightText = '';
        if (item.selectedWeight) {
            const w = item.selectedWeight;
            const wStr = (isTeaCake && w < 1) ? `${Math.round(w * 1000)}g` : `${w} Kg`;
            weightText = ` (${wStr})`;
        }
        message += `• ${item.quantity}x ${item.name}${weightText} — ₹${(item.cartPrice * item.quantity).toFixed(2)}\n`;
    });

    const totalCost = cart.reduce((sum, item) => sum + (item.cartPrice * item.quantity), 0);
    message += `\n*Total: ₹${totalCost.toFixed(2)}*\n\n`;

    // Pickup location
    message += `📍 *Collection Point (Self-Pickup):*\nhttps://share.google/tC4LkPK85T9SBgXlo\n\n`;

    // Customization note
    message += `⚠️ *Please Note:* Customizations such as fondant work, photo cakes, special toppers, or designer decorations are available but will attract *additional charges*. Kindly discuss customization requirements before confirming the order.\n\n`;

    message += `Please confirm my order and let me know when it will be ready for collection. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// --- Event Listeners ---
function setupEventListeners() {
    cartToggle.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', processCheckout);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            renderProducts(filter);
        });
    });
}

// Boot up
init();
