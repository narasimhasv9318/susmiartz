

const PRODUCT_DATA = [
    // Classic Favourites (Base Price / kg)
    { id: 'cake-classic-pineapple', name: 'Pineapple Cake', description: 'Fresh pineapple chunks with light vanilla sponge and whipped cream.', category: 'cakes', price: 900, image: 'assets/cake_pineapple.png', color: '#f5c842' },
    { id: 'cake-classic-butterscotch', name: 'Butterscotch Cake', description: 'Crunchy caramel praline layered with soft vanilla sponge and rich cream.', category: 'cakes', price: 900, image: 'assets/cake_butterscotch.png', color: '#e8a420' },
    { id: 'cake-classic-strawberry', name: 'Strawberry Cake', description: 'Real strawberry crush layered with vanilla sponge and pink strawberry cream.', category: 'cakes', price: 900, image: 'assets/cake_strawberry.png', color: '#e83e6c' },
    { id: 'cake-classic-blueberry', name: 'Blueberry Cake', description: 'A delightful blend of vanilla sponge and tangy blueberry compote layers.', category: 'cakes', price: 900, image: 'assets/cake_blueberry.png', color: '#6a4bdb' },
    { id: 'cake-classic-vanilla', name: 'Vanilla Cake', description: 'Classic, moist, and fluffy vanilla sponge layered with signature buttercream.', category: 'cakes', price: 900, image: 'assets/cake_vanilla.png', color: '#f7f0d4' },
    { id: 'cake-classic-blackforest', name: 'Blackforest Cake', description: 'Dark chocolate sponge, cherry filling, whipped cream, and chocolate flakes.', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png', color: '#2c1a1a' },
    { id: 'cake-classic-whiteforest', name: 'White Forest Cake', description: 'Delicate white chocolate sponge with cherry compote and white chocolate curls.', category: 'cakes', price: 900, image: 'assets/gourmet_cake_1772978336876.png', color: '#f5f5f5' },

    // Premium Indulgence (Base Price / kg)
    { id: 'cake-premium-richchocolate', name: 'Rich Chocolate Cake', description: 'Intense, dark, and decadent chocolate truffle cake for true chocolate lovers.', category: 'cakes', price: 1200, image: 'assets/gourmet_cake_1772978336876.png', color: '#3d1a00' },
    { id: 'cake-premium-nutella', name: 'Nutella Cake', description: 'Premium chocolate sponge generously layered with pure Nutella frosting.', category: 'cakes', price: 1200, image: 'assets/cake_nutella.png', color: '#7b4a1e' },
    { id: 'cake-premium-biscoff', name: 'Biscoff Cake', description: 'Spiced caramel sponge layered with original Lotus Biscoff spread and crunch.', category: 'cakes', price: 1200, image: 'assets/cake_biscoff.png', color: '#c47a2a' },
    { id: 'cake-premium-almondbutterscotch', name: 'Almond Butterscotch Cake', description: 'Roasted almonds paired with golden caramel butterscotch chunks and cream.', category: 'cakes', price: 1200, image: 'assets/cake_almond_butterscotch.png', color: '#d4a017' },
    { id: 'cake-premium-ferrerorocher', name: 'Ferrero Rocher Cake', description: 'Decadent chocolate hazelnut cake topped and filled with Ferrero Rocher crumbles.', category: 'cakes', price: 1200, image: 'assets/cake_ferrero_rocher.png', color: '#8b6914' },

    // Brownies
    { id: 'brownie-nutella', name: 'Nutella Brownie', description: 'Fudgy, gooey brownie baked with generous swirls of Nutella.', category: 'brownies', price: 800, image: 'assets/brownie_nutella_1773420250871.png' },
    { id: 'brownie-chocolate', name: 'Chocolate Brownie', description: 'Classic fudgy chocolate brownie with a perfectly crinkly top crust.', category: 'brownies', price: 800, image: 'assets/brownie_chocolate_1773420267557.png' },
    { id: 'brownie-triple-chocolate', name: 'Triple Chocolate Brownie', description: 'Loaded with dark, milk, and white chocolate chunks in every bite.', category: 'brownies', price: 800, image: 'assets/brownie_triple_chocolate_1773420284977.png' },
    { id: 'brownie-walnut', name: 'Walnut Brownie', description: 'Rich chocolate fudge brownie studded with toasted, crunchy walnuts.', category: 'brownies', price: 800, image: 'assets/brownie_walnut_1773420299735.png' },
    { id: 'brownie-slab', name: 'Brownie Slab', description: 'A massive slab of our signature dense chocolate fudge brownie cut to order.', category: 'brownies', price: 800, image: 'assets/fudge_brownies_1772978354574.png' },
    { id: 'brownie-biscoff', name: 'Biscoff Brownie', description: 'Fudgy dark chocolate brownie swirled with Lotus Biscoff spread and biscuit crumbs.', category: 'brownies', price: 800, image: 'assets/brownie_biscoff.png' },

    // Donuts
    { id: 'donut-nutella', name: 'Nutella Donut', description: 'Soft, fluffy yeast donut glazed and filled with rich Nutella.', category: 'donuts', price: 80, image: 'assets/donut_nutella_1773420317329.png' },
    { id: 'donut-biscoff', name: 'Biscoff Donut', description: 'Puffy donut coated in sweet Biscoff glaze with original cookie crumbles.', category: 'donuts', price: 80, image: 'assets/donut_biscoff_1773420335520.png' },
    { id: 'donut-chocolate', name: 'Chocolate Donut', description: 'Classic and irresistible donut dipped in dark chocolate ganache.', category: 'donuts', price: 80, image: 'assets/donut_chocolate_1773420352423.png' },
    { id: 'donut-strawberry', name: 'Strawberry Donut', description: 'Pretty pink donut with a sweet, fruity strawberry glaze and sprinkles.', category: 'donuts', price: 80, image: 'assets/donut_strawberry_1773420391925.png' },
    { id: 'donut-choc-chip', name: 'Chocolate Chip Donut', description: 'Soft vanilla dough packed with chocolate chips and chocolate drizzle.', category: 'donuts', price: 80, image: 'assets/donut_choc_chip_1773420408846.png' },
    { id: 'donut-mango', name: 'Mango Donut', description: 'Tropical, fruity delight topped with a tangy and sweet mango glaze.', category: 'donuts', price: 80, image: 'assets/donut_mango_1773420426406.png' },

    // Tea Cakes
    { id: 'tea-cake-1', name: 'Vanilla Pound Tea Cake', description: 'Buttery, rich, and dense vanilla pound cake—perfect for dipping in tea.', category: 'tea-cakes', price: 300, image: 'assets/tea_time_cake_1772978388914.png' },
    { id: 'tea-cake-banana', name: 'Banana Tea Time Cake', description: 'Moist loaf cake made with real bananas and a hint of warm cinnamon.', category: 'tea-cakes', price: 300, image: 'assets/teacake_banana_1773420443847.png' },
    { id: 'tea-cake-oats-banana', name: 'Oats Banana Cake', description: 'A healthier, wholesome banana cake baked with rolled oats and honey.', category: 'tea-cakes', price: 350, image: 'assets/teacake_oats_banana_1773420460437.png' },
    { id: 'tea-cake-wheat-nuts', name: 'Wheat Nuts Cake', description: '100% whole wheat cake loaded with premium dry fruits and nuts.', category: 'tea-cakes', price: 400, image: 'assets/teacake_wheat_nuts_1773420478676.png' },
    { id: 'tea-cake-millets-almond', name: 'Millets Almond Cake', description: 'Gluten-friendly, nutrient-rich millets cake packed with toasted almonds.', category: 'tea-cakes', price: 350, image: 'assets/teacake_millets_almond_1773420497012.png' },
    { id: 'tea-cake-ragi-chocolate', name: 'Ragi Chocolate Cake', description: 'Healthy finger millet (ragi) cake paired wonderfully with rich cocoa.', category: 'tea-cakes', price: 350, image: 'assets/teacake_ragi_chocolate_1773420513727.png' }
];

// --- Pickup / Self Collection Info ---
const PICKUP_INFO = {
    message: '🛍️ Self-Collection Only — We do not deliver. Please collect your order from our location.',
    locationUrl: 'https://share.google/tC4LkPK85T9SBgXlo',
    locationLabel: 'View Collection Point on Google Maps'
};

// --- Recent Deliveries Data ---
const DELIVERIES_DATA = [
    {
        id: 'delivery-new-1',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.07.55%20PM%20(1).jpeg'
    },
    {
        id: 'delivery-new-2',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.07.55%20PM.jpeg'
    },
    {
        id: 'delivery-new-3',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.07.54%20PM%20(1).jpeg'
    },
    {
        id: 'delivery-new-4',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.07.54%20PM.jpeg'
    },
    {
        id: 'delivery-new-5',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.05.42%20PM.jpeg'
    },
    {
        id: 'delivery-new-6',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.05.41%20PM%20(1).jpeg'
    },
    {
        id: 'delivery-new-7',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.05.41%20PM.jpeg'
    },
    {
        id: 'delivery-new-8',
        status: 'Collected',
        image: 'assets/deliveries/WhatsApp%20Image%202026-03-26%20at%209.05.40%20PM.jpeg'
    },
    {
        id: 'delivery-4',
        status: 'Collected',
        image: 'assets/delivery_assorted_treats.jpeg'
    },
    {
        id: 'delivery-5',
        status: 'Collected',
        image: 'assets/delivery_cake_slice.jpeg'
    },
    {
        id: 'delivery-6',
        status: 'Collected',
        image: 'assets/delivery_packed_box.jpeg'
    },
    {
        id: 'delivery-7',
        status: 'Collected',
        image: 'assets/delivery_fresh_bakes_1.jpeg'
    }
];

// --- Customer Reviews ---
// Reviews are now managed in reviews.js + assets/reviews/ folder.
// See reviews.js to add or edit reviews.

// --- Unavailable Dates ---
// Add dates in 'YYYY-MM-DD' format to block out specific days from being selectable for orders.
const UNAVAILABLE_DATES = [];

