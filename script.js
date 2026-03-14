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
        const isBrownie = product.category === 'brownies';

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
        } else if (isBrownie) {
            // Brownies: 500g to 2 kg in 500g steps (price in data.js is per 500g)
            const brownieWeights = [0.5, 1, 1.5, 2];
            let optionsHtml = '';
            brownieWeights.forEach(w => {
                const label = w < 1 ? `${Math.round(w * 1000)}g` : `${w} Kg`;
                const selected = w === 0.5 ? 'selected' : '';
                optionsHtml += `<option value="${w}" ${selected}>${label}</option>`;
            });
            extraHtml = `<select class="weight-select" id="weight-${product.id}">${optionsHtml}</select>`;
        }

        const isWeightedCat = isCake || isTeaCake || isBrownie;
        const priceLabel = isCake ? ' / kg' : (isDonut ? ' each' : (isBrownie ? ' / 500g' : ''));
        const hasEggOption = isCake || isTeaCake || product.category === 'brownies';
        let eggHtml = '';
        if (hasEggOption) {
            eggHtml = `<select class="weight-select" id="egg-${product.id}" style="margin-top: 0.5rem;" onchange="updatePriceDisplay('${product.id}')">
                <option value="With Egg">With Egg</option>
                <option value="Eggless">Eggless (+₹100/kg)</option>
            </select>`;
        }

        // Add onchange to weight select as well for dynamic price tracking
        if (extraHtml.includes('class="weight-select"')) {
            extraHtml = extraHtml.replace('class="weight-select"', `class="weight-select" onchange="updatePriceDisplay('${product.id}')"`);
        }

        card.innerHTML = `
            <div class="product-image-wrap" ${colorStyle}>
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy"
                    onerror="this.onerror=null; this.src='assets/gourmet_cake_1772978336876.png';">
                ${product.color ? `<div class="product-color-badge" style="background:${product.color}"></div>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category.replace('-', ' ')}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description" style="font-size: 0.85rem; color: var(--text-muted); margin: 0.25rem 0 0.75rem; line-height: 1.4; flex-grow: 1;">${product.description || ''}</p>
                <div class="product-price">₹<span id="price-display-${product.id}">${product.price.toFixed(2)}</span>${priceLabel}</div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${extraHtml}
                    ${eggHtml}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Add to Order</button>
            </div>
        `;
        productGrid.appendChild(card);
        // Initialize dynamic price
        if (isWeightedCat || isBrownie || hasEggOption) {
            updatePriceDisplay(product.id, false);
        }
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

            const rating = review.rating || 5;
            const starsHtml = '★'.repeat(rating) + '☆'.repeat(5 - rating);

            card.innerHTML = `
                <div class="review-stars">${starsHtml}</div>
                <p class="review-text">${review.text}</p>
                <div class="review-author">— ${review.customerName}</div>
            `;
            reviewsGrid.appendChild(card);
        });
    } else {
        reviewsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--text-muted);">No reviews yet. Be the first to leave one!</p>';
    }
}

// --- Dynamic Price Display ---
window.updatePriceDisplay = function (productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const isCake = product.category === 'cakes';
    const isTeaCake = product.category === 'tea-cakes';
    const isBrownie = product.category === 'brownies';

    let basePrice = product.price; // for brownies this is per 500g

    const eggSelect = document.getElementById(`egg-${productId}`);
    const isEggless = eggSelect && eggSelect.value === 'Eggless';

    if (isEggless) {
        // Add ₹100 per kg to the base rate
        // For tea cakes / brownies (base is per 500g), so add 50 per 500g
        if (isTeaCake || isBrownie) {
            basePrice += 50;
        } else {
            basePrice += 100;
        }
    }

    // For brownies, show the price scaled to the selected weight
    if (isBrownie) {
        const weightSelect = document.getElementById(`weight-${productId}`);
        const selectedWeight = weightSelect ? parseFloat(weightSelect.value) : 0.5;
        const multiplier = selectedWeight / 0.5; // price is per 500g
        const priceDisplay = document.getElementById(`price-display-${productId}`);
        if (priceDisplay) {
            priceDisplay.textContent = (basePrice * multiplier).toFixed(2);
        }
        return;
    }

    const priceDisplay = document.getElementById(`price-display-${productId}`);
    if (priceDisplay) {
        priceDisplay.textContent = basePrice.toFixed(2);
    }
};

// --- Cart Logic ---
window.addToCart = function (productId) {
    const product = products.find(p => p.id === productId);
    const isCake = product.category === 'cakes';
    const isTeaCake = product.category === 'tea-cakes';
    const isDonut = product.category === 'donuts';
    const isBrownie = product.category === 'brownies';
    const isWeightedCat = isCake || isTeaCake || isBrownie;

    let selectedWeight = isTeaCake || isBrownie ? 0.5 : 1;
    let selectedQty = 1;

    const hasEggOption = isCake || isTeaCake || isBrownie;
    let selectedEgg = null;

    if (isWeightedCat) {
        const weightSelect = document.getElementById(`weight-${productId}`);
        if (weightSelect) selectedWeight = parseFloat(weightSelect.value);
    }
    if (isDonut) {
        const qtySelect = document.getElementById(`qty-${productId}`);
        if (qtySelect) selectedQty = parseInt(qtySelect.value);
    }
    if (hasEggOption) {
        const eggSelect = document.getElementById(`egg-${productId}`);
        if (eggSelect) selectedEgg = eggSelect.value;
    }

    let cartItemId = productId;
    if (isWeightedCat) cartItemId += `-${selectedWeight}`;
    if (hasEggOption) cartItemId += `-${selectedEgg}`;

    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity += isDonut ? selectedQty : 1;
    } else {
        let basePrice = product.price; // for brownies this is per 500g
        if (selectedEgg === 'Eggless') {
            if (isTeaCake || isBrownie) {
                basePrice += 50; // base price is per 500g, so +50 per 500g
            } else {
                basePrice += 100; // base price is per 1kg, so +100
            }
        }

        // Tea cakes & brownies: listed price is per 500g, scale proportionally
        let itemPrice;
        if (isTeaCake || isBrownie) {
            itemPrice = basePrice * (selectedWeight / 0.5);
        } else if (isCake) {
            itemPrice = basePrice * selectedWeight;
        } else {
            itemPrice = basePrice;
        }
        cart.push({
            ...product,
            cartItemId,
            selectedWeight: isWeightedCat ? selectedWeight : null,
            selectedEgg: selectedEgg,
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
        const isWeightedCat = item.category === 'cakes' || item.category === 'tea-cakes' || item.category === 'brownies';
        let weightLabel = '';
        if (isWeightedCat && item.selectedWeight) {
            const w = item.selectedWeight;
            const wStr = ((item.category === 'tea-cakes' || item.category === 'brownies') && w < 1)
                ? `${Math.round(w * 1000)}g`
                : `${w} Kg`;
            weightLabel = ` <span style="font-size: 0.8rem; color: var(--text-muted);">(${wStr})</span>`;
        }
        if (item.selectedEgg) {
            weightLabel += ` <span style="font-size: 0.8rem; color: var(--text-main);">[${item.selectedEgg}]</span>`;
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
    document.body.classList.add('cart-open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('cart-open');
}

// --- WhatsApp Checkout Logic ---
function processCheckout() {
    if (cart.length === 0) return;

    const dateInput = document.getElementById('deliveryDate');
    if (!dateInput.value) {
        alert("Please select a Delivery Date before ordering. Note: We require 1 day prior notice.");
        dateInput.focus();
        return;
    }

    const deliveryDateStr = new Date(dateInput.value).toLocaleDateString('en-IN', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    const phoneNumber = '+919700879944';

    let message = `Hello SusmiArtz! 🎂 I would like to place an order for delivery on *${deliveryDateStr}*:\n\n`;

    cart.forEach(item => {
        const isTeaCake = item.category === 'tea-cakes';
        const isBrownie = item.category === 'brownies';
        let weightText = '';
        if (item.selectedWeight) {
            const w = item.selectedWeight;
            const wStr = ((isTeaCake || isBrownie) && w < 1) ? `${Math.round(w * 1000)}g` : `${w} Kg`;
            weightText = ` (${wStr})`;
        }
        const eggText = item.selectedEgg ? ` [${item.selectedEgg}]` : '';
        message += `• ${item.quantity}x ${item.name}${weightText}${eggText} — ₹${(item.cartPrice * item.quantity).toFixed(2)}\n`;
    });

    const totalCost = cart.reduce((sum, item) => sum + (item.cartPrice * item.quantity), 0);
    message += `\n*Total: ₹${totalCost.toFixed(2)}*\n\n`;

    // Pickup location
    message += `📍 *Collection Point (Self-Pickup):*\nhttps://share.google/tC4LkPK85T9SBgXlo\n\n`;

    // Customization note
    message += `⚠️ *Customization Notice:* Customizations will be charged extra. Customizations can be a specific design which involves fondant work, images, or any specific decoration items for cakes. Please mention your requirements when ordering to confirm the additional cost.\n\n`;

    message += `Please confirm my order and let me know when it will be ready for collection. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// --- Custom Cake Order Logic ---
window.handleCustomOrder = function (event) {
    event.preventDefault(); // Prevent traditional form submission

    const flavor = document.getElementById('customFlavor').value;
    const weight = document.getElementById('customWeight').value;
    const egg = document.getElementById('customEgg').value;
    const notes = document.getElementById('customNotes').value.trim();

    // Delivery Date
    const dateInput = document.getElementById('customDeliveryDate');
    if (!dateInput || !dateInput.value) {
        alert("Please select a Delivery Date. We require 1 day prior notice.");
        if (dateInput) dateInput.focus();
        return;
    }
    const deliveryDateStr = new Date(dateInput.value).toLocaleDateString('en-IN', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    const phoneNumber = '+919700879944';

    let message = `Hello SusmiArtz! 🎂 I would like to request a quotation for a *Custom Cake Design* needed on *${deliveryDateStr}*:\n\n`;
    message += `*Base Flavor:* ${flavor}\n`;
    message += `*Weight:* ${weight} Kg\n`;
    message += `*Type:* ${egg}\n`;

    if (notes) {
        message += `\n*Customization Details:*\n${notes}\n`;
    }

    // Pickup location
    message += `\n📍 *Will Collect From (Self-Pickup):*\nhttps://share.google/tC4LkPK85T9SBgXlo\n`;

    message += `\n⚠️ I understand that the final price will be determined based on the design complexity, fondant work, and specific decorations required.\n\n`;
    message += `Please review my request and let me know the estimated cost. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
};

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

    // Set minimum delivery date to tomorrow for both date inputs
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;

    const dateInput = document.getElementById('deliveryDate');
    if (dateInput) {
        dateInput.min = minDate;
    }

    const customDateInput = document.getElementById('customDeliveryDate');
    if (customDateInput) {
        customDateInput.min = minDate;
    }
}

// Boot up
init();
