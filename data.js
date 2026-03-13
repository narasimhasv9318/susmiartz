

const PRODUCT_DATA = [
    // Classic Favourites - 1kg
    { id: 'cake-classic-pineapple-1kg', name: 'Pineapple Cake (1kg)', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-butterscotch-1kg', name: 'Butterscotch Cake (1kg)', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-strawberry-1kg', name: 'Strawberry Cake (1kg)', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-blueberry-1kg', name: 'Blueberry Cake (1kg)', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-vanilla-1kg', name: 'Vanilla Cake (1kg)', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-blackforest-1kg', name: 'Blackforest Cake (1kg)', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-whiteforest-1kg', name: 'White Forest Cake (1kg)', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png' },

    // Classic Favourites - 0.5kg
    { id: 'cake-classic-pineapple-half', name: 'Pineapple Cake (0.5kg)', category: 'cakes', price: 450, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-butterscotch-half', name: 'Butterscotch Cake (0.5kg)', category: 'cakes', price: 450, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-strawberry-half', name: 'Strawberry Cake (0.5kg)', category: 'cakes', price: 450, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-blueberry-half', name: 'Blueberry Cake (0.5kg)', category: 'cakes', price: 450, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-vanilla-half', name: 'Vanilla Cake (0.5kg)', category: 'cakes', price: 450, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-blackforest-half', name: 'Blackforest Cake (0.5kg)', category: 'cakes', price: 450, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-classic-whiteforest-half', name: 'White Forest Cake (0.5kg)', category: 'cakes', price: 450, image: 'assets/gourmet_cake_1772978336876.png' },

    // Premium Indulgence - 1kg
    { id: 'cake-premium-richchocolate-1kg', name: 'Rich Chocolate Cake (1kg)', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-nutella-1kg', name: 'Nutella Cake (1kg)', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-biscoff-1kg', name: 'Biscoff Cake (1kg)', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-almondbutterscotch-1kg', name: 'Almond Butterscotch Cake (1kg)', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-ferrerorocher-1kg', name: 'Ferrero Rocher Cake (1kg)', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png' },

    // Premium Indulgence - 0.5kg
    { id: 'cake-premium-richchocolate-half', name: 'Rich Chocolate Cake (0.5kg)', category: 'cakes', price: 600, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-nutella-half', name: 'Nutella Cake (0.5kg)', category: 'cakes', price: 600, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-biscoff-half', name: 'Biscoff Cake (0.5kg)', category: 'cakes', price: 600, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-almondbutterscotch-half', name: 'Almond Butterscotch Cake (0.5kg)', category: 'cakes', price: 600, image: 'assets/gourmet_cake_1772978336876.png' },
    { id: 'cake-premium-ferrerorocher-half', name: 'Ferrero Rocher Cake (0.5kg)', category: 'cakes', price: 600, image: 'assets/gourmet_cake_1772978336876.png' },

    // Other Items
    { id: 'brownie-1', name: 'Decadent Fudge Brownies (0.5kg)', category: 'brownies', price: 800, image: 'assets/fudge_brownies_1772978354574.png' },
    { id: 'donut-1', name: 'Assorted Gourmet Donuts (Box of 6)', category: 'donuts', price: 400, image: 'assets/assorted_donuts_1772978371743.png' },
    { id: 'tea-cake-1', name: 'Vanilla Pound Tea Cake', category: 'tea-cakes', price: 600, image: 'assets/tea_time_cake_1772978388914.png' }
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
