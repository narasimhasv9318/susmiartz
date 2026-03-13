

const PRODUCT_DATA = [
    // Classic Favourites (Base Price / kg)
    { id: 'cake-classic-pineapple', name: 'Pineapple Cake', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-butterscotch', name: 'Butterscotch Cake', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-strawberry', name: 'Strawberry Cake', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-blueberry', name: 'Blueberry Cake', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-vanilla', name: 'Vanilla Cake', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-blackforest', name: 'Blackforest Cake', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-whiteforest', name: 'White Forest Cake', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },

    // Premium Indulgence (Base Price / kg)
    { id: 'cake-premium-richchocolate', name: 'Rich Chocolate Cake', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-nutella', name: 'Nutella Cake', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-biscoff', name: 'Biscoff Cake', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-almondbutterscotch', name: 'Almond Butterscotch Cake', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-ferrerorocher', name: 'Ferrero Rocher Cake', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },

    // Brownies
    { id: 'brownie-nutella', name: 'Nutella Brownie', category: 'brownies', price: 800, image: 'brownie_nutella_1773420250871.png' },
    { id: 'brownie-chocolate', name: 'Chocolate Brownie', category: 'brownies', price: 800, image: 'brownie_chocolate_1773420267557.png' },
    { id: 'brownie-triple-chocolate', name: 'Triple Chocolate Brownie', category: 'brownies', price: 800, image: 'brownie_triple_chocolate_1773420284977.png' },
    { id: 'brownie-walnut', name: 'Walnut Brownie', category: 'brownies', price: 800, image: 'brownie_walnut_1773420299735.png' },
    { id: 'brownie-slab', name: 'Brownie Slab', category: 'brownies', price: 800, image: 'assets/fudge_brownies_1772978354574.png' },
    { id: 'brownie-biscoff', name: 'Biscoff Brownie', category: 'brownies', price: 800, image: 'assets/fudge_brownies_1772978354574.png' },

    // Donuts
    { id: 'donut-nutella', name: 'Nutella Donut', category: 'donuts', price: 400, image: 'donut_nutella_1773420317329.png' },
    { id: 'donut-biscoff', name: 'Biscoff Donut', category: 'donuts', price: 400, image: 'donut_biscoff_1773420335520.png' },
    { id: 'donut-chocolate', name: 'Chocolate Donut', category: 'donuts', price: 400, image: 'donut_chocolate_1773420352423.png' },
    { id: 'donut-strawberry', name: 'Strawberry Donut', category: 'donuts', price: 400, image: 'donut_strawberry_1773420391925.png' },
    { id: 'donut-choc-chip', name: 'Chocolate Chip Donut', category: 'donuts', price: 400, image: 'donut_choc_chip_1773420408846.png' },
    { id: 'donut-mango', name: 'Mango Donut', category: 'donuts', price: 400, image: 'donut_mango_1773420426406.png' },

    // Tea Cakes
    { id: 'tea-cake-1', name: 'Vanilla Pound Tea Cake', category: 'tea-cakes', price: 600, image: 'assets/tea_time_cake_1772978388914.png' },
    { id: 'tea-cake-banana', name: 'Banana Tea Time Cake', category: 'tea-cakes', price: 600, image: 'teacake_banana_1773420443847.png' },
    { id: 'tea-cake-oats-banana', name: 'Oats Banana Cake', category: 'tea-cakes', price: 650, image: 'teacake_oats_banana_1773420460437.png' },
    { id: 'tea-cake-wheat-nuts', name: 'Wheat Nuts Cake', category: 'tea-cakes', price: 700, image: 'teacake_wheat_nuts_1773420478676.png' },
    { id: 'tea-cake-millets-almond', name: 'Millets Almond Cake', category: 'tea-cakes', price: 750, image: 'teacake_millets_almond_1773420497012.png' },
    { id: 'tea-cake-ragi-chocolate', name: 'Ragi Chocolate Cake', category: 'tea-cakes', price: 700, image: 'teacake_ragi_chocolate_1773420513727.png' }
];

// --- Recent Deliveries Data ---
const DELIVERIES_DATA = [
    {
        id: 'delivery-1',
        customerName: 'Aarushi M.',
        location: 'Banjara Hills, Hyderabad',
        items: '1x Classic Chocolate Berry, 2x Vanilla Pound Tea Cake',
        status: 'Delivered',
        date: 'Today, 2:30 PM',
        image: 'assets/bakery_delivery_box.png' // Will be updated with generated image
    },
    {
        id: 'delivery-2',
        customerName: 'Rahul K.',
        location: 'Jubilee Hills, Hyderabad',
        items: '1x Assorted Gourmet Donuts (Box of 6)',
        status: 'Delivered',
        date: 'Today, 11:15 AM',
        image: 'assets/bakery_delivery_box.png'
    },
    {
        id: 'delivery-3',
        customerName: 'Sneha P.',
        location: 'Kukatpally, Hyderabad',
        items: '2x Decadent Fudge Brownies (Box of 4)',
        status: 'Delivered',
        date: 'Yesterday, 5:45 PM',
        image: 'assets/bakery_delivery_box.png'
    },
    {
        id: 'delivery-4',
        status: 'Delivered',
        date: 'Mar 12, 2026',
        image: 'assets/WhatsApp Image 2026-03-13 at 9.45.20 PM-3.jpeg'
    },
    {
        id: 'delivery-5',
        status: 'Delivered',
        date: 'Mar 11, 2026',
        image: 'assets/WhatsApp Image 2026-03-13 at 9.45.20 PM-2.jpeg'
    },
    {
        id: 'delivery-6',
        status: 'Delivered',
        date: 'Mar 10, 2026',
        image: 'assets/WhatsApp Image 2026-03-13 at 9.45.20 PM.jpeg'
    },
    {
        id: 'delivery-7',
        status: 'Delivered',
        date: 'Mar 09, 2026',
        image: 'assets/WhatsApp Image 2026-03-13 at 9.45.19 PM.jpeg'
    }
];

// --- Customer Reviews Data ---
const REVIEWS_DATA = [
    {
        id: 'review-1',
        customerName: 'Priya S.',
        rating: 5,
        text: '"Absolutely the best chocolate cake I have ever had! The berries were so fresh and the cake was perfectly moist. Highly recommend SusmiArtz!"',
        image: 'assets/customer_review_1.png'
    },
    {
        id: 'review-2',
        customerName: 'Ananya V.',
        rating: 5,
        text: '"Ordered a box of assorted donuts for my team and they disappeared in minutes! So light, fluffy, and the glazes are divine."',
        image: 'assets/customer_review_2.png'
    }
];
