// Edit this file to add, remove, or change products, prices, and images.
// 
// category options: 'cakes', 'brownies', 'donuts', 'tea-cakes'
// price is in Indian Rupees (₹)

const PRODUCT_DATA = [
    {
        id: 'cake-1',
        name: 'Classic Chocolate Berry',
        category: 'cakes',
        price: 3500, // ₹3500
        image: 'assets/gourmet_cake_1772978336876.png'
    },
    {
        id: 'brownie-1',
        name: 'Decadent Fudge Brownies (Box of 4)',
        category: 'brownies',
        price: 800, // ₹800
        image: 'assets/fudge_brownies_1772978354574.png'
    },
    {
        id: 'donut-1',
        name: 'Assorted Gourmet Donuts (Box of 6)',
        category: 'donuts',
        price: 1200, // ₹1200
        image: 'assets/assorted_donuts_1772978371743.png'
    },
    {
        id: 'tea-cake-1',
        name: 'Vanilla Pound Tea Cake',
        category: 'tea-cakes',
        price: 600, // ₹600
        image: 'assets/tea_time_cake_1772978388914.png'
    }
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
