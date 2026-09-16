/** Seed catalog — prices in INR */
const PRODUCTS = [
  {
    name: "Wireless Noise-Canceling Headphones",
    price: 10999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    stock: 24,
    description:
      "Over-ear wireless headphones with deep bass, 30-hour battery life, and active noise cancellation.",
  },
  {
    name: "Minimalist Leather Backpack",
    price: 7499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    stock: 18,
    description:
      "Durable full-grain leather backpack with padded laptop sleeve and clean everyday styling.",
  },
  {
    name: "Smart Fitness Watch",
    price: 16499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    stock: 32,
    description:
      "Track workouts, heart rate, and sleep with a bright always-on display and week-long battery.",
  },
  {
    name: "Organic Cotton T-Shirt",
    price: 1299,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    stock: 60,
    description:
      "Soft, breathable organic cotton tee with a relaxed fit — perfect for everyday wear.",
  },
  {
    name: "Ceramic Pour-Over Coffee Set",
    price: 2899,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    stock: 15,
    description:
      "Handcrafted ceramic dripper and mug set for a cleaner, richer morning brew.",
  },
  {
    name: "Running Shoes Pro",
    price: 8999,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    stock: 27,
    description:
      "Lightweight performance runners with responsive cushioning and breathable mesh upper.",
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 4499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    stock: 40,
    description:
      "Compact waterproof speaker with rich 360° sound and 12 hours of playtime.",
  },
  {
    name: "Linen Throw Blanket",
    price: 3499,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    stock: 22,
    description:
      "Soft stonewashed linen throw that adds texture and warmth to any living space.",
  },
  {
    name: "Matte Black Desk Lamp",
    price: 4299,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    stock: 19,
    description:
      "Adjustable LED desk lamp with warm/cool modes and a calm, architectural silhouette.",
  },
  {
    name: "Classic Aviator Sunglasses",
    price: 2499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    stock: 35,
    description:
      "Polarized lenses in a lightweight metal frame — timeless shade for everyday wear.",
  },
  {
    name: "Mechanical Keyboard",
    price: 11999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    stock: 21,
    description:
      "Tactile switches, hot-swappable keys, and a compact layout built for long coding sessions.",
  },
  {
    name: "Merino Wool Beanie",
    price: 1599,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
    stock: 48,
    description:
      "Fine-gauge merino beanie that regulates temperature without the itch of ordinary wool.",
  },
  {
    name: "Stainless Water Bottle",
    price: 1499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    stock: 55,
    description:
      "Double-wall insulated bottle that keeps drinks cold for 24 hours or hot for 12.",
  },
  {
    name: "Canvas Low-Top Sneakers",
    price: 4999,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    stock: 30,
    description:
      "Everyday canvas sneakers with a cushioned insole and gum sole that ages beautifully.",
  },
  {
    name: "Scented Soy Candle",
    price: 999,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80",
    stock: 42,
    description:
      "Hand-poured soy wax candle with notes of cedar, bergamot, and soft amber.",
  },
  {
    name: "Wireless Charging Pad",
    price: 2199,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1586816879360-004f5b0c31e3?w=800&q=80",
    stock: 37,
    description:
      "Fast Qi charger with a non-slip base and gentle LED indicator for nightstands and desks.",
  },
  {
    name: "Tailored Chino Pants",
    price: 3299,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    stock: 26,
    description:
      "Stretch cotton chinos with a clean taper — sharp enough for the office, easy for weekends.",
  },
  {
    name: "Insulated Lunch Tote",
    price: 1899,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a674dba?w=800&q=80",
    stock: 29,
    description:
      "Leak-resistant insulated tote with room for a full meal and a slim pocket for essentials.",
  },
  {
    name: "Trail Hiking Boots",
    price: 12499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    stock: 14,
    description:
      "Waterproof hiking boots with aggressive tread and ankle support for uneven terrain.",
  },
  {
    name: "Stoneware Dinner Plate Set",
    price: 4599,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    stock: 17,
    description:
      "Set of four reactive-glaze stoneware plates — each piece slightly unique, dishwasher safe.",
  },
  {
    name: "Noise-Isolating Earbuds",
    price: 7999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    stock: 33,
    description:
      "Compact earbuds with secure fit, multipoint Bluetooth, and clear call quality on the go.",
  },
  {
    name: "Heavyweight Hoodie",
    price: 3799,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    stock: 28,
    description:
      "450gsm French terry hoodie with a double-lined hood and a broken-in hand feel from day one.",
  },
  {
    name: "Leather Card Holder",
    price: 1799,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    stock: 44,
    description:
      "Slim vegetable-tanned leather card holder that develops a rich patina over time.",
  },
  {
    name: "Studio Monitor Stand",
    price: 8999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    stock: 12,
    description:
      "Height-adjustable speaker stands with isolation pads for cleaner desktop audio.",
  },
  {
    name: "Cotton Kurta Set",
    price: 2499,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    stock: 36,
    description:
      "Breathable cotton kurta with a relaxed silhouette — easy elegance for warm days.",
  },
  {
    name: "Ceramic Plant Pot Duo",
    price: 1699,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
    stock: 31,
    description:
      "Pair of matte ceramic pots with drainage — sized for herbs and small indoor plants.",
  },
  {
    name: "Travel Duffle Bag",
    price: 5499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    stock: 20,
    description:
      "Weekender duffle with shoe compartment and padded handles for short trips.",
  },
  {
    name: "4K Action Camera",
    price: 18999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    stock: 11,
    description:
      "Rugged 4K action cam with image stabilization and waterproof housing included.",
  },
  {
    name: "Yoga Mat Pro",
    price: 2199,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
    stock: 39,
    description:
      "Non-slip dual-texture yoga mat with alignment markers and easy-carry strap.",
  },
  {
    name: "Linen Shirt",
    price: 2799,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    stock: 34,
    description:
      "Airy linen shirt with mother-of-pearl buttons — sharp enough for dinners, soft enough for travel.",
  },
  {
    name: "Espresso Cup Set",
    price: 1899,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    stock: 25,
    description:
      "Set of four porcelain espresso cups with saucers — thick walls hold heat longer.",
  },
  {
    name: "Wireless Mouse",
    price: 2499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    stock: 50,
    description:
      "Ergonomic silent-click wireless mouse with multi-device pairing and USB-C charging.",
  },
];

module.exports = PRODUCTS;
