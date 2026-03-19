/* ------------------------------------------------------------------ */
/*  Food reality data for eight HP towns                               */
/* ------------------------------------------------------------------ */

export type MarketNode = {
  town: string;
  markets: string;
  influence: string;
  pricing: string;
};

export type SeasonImpact = {
  season: string;
  months: string;
  priceVector: "spike" | "surge" | "equilibrium";
  qualityVector: string;
  detail: string;
};

export type WaterZone = {
  town: string;
  safety: "excellent" | "caution" | "ro-essential";
  detail: string;
};

export type DairyCategory = {
  category: string;
  providers: string;
  towns: string;
  detail: string;
};

export type DeliveryTown = {
  town: string;
  available: boolean;
  detail: string;
  caveat?: string;
};

export type FoodHighlight = {
  icon: string;
  label: string;
  detail: string;
};

/* ---------- Key facts ---------- */

export const foodFacts: FoodHighlight[] = [
  { icon: "🥬", label: "Dual supply chain", detail: "Local farming output + inter-state imports from Punjab & Haryana via lower-altitude transit hubs" },
  { icon: "📱", label: "Swiggy & Zomato", detail: "Operational across all major towns, but delivery times 35–75+ min due to mountain terrain" },
  { icon: "💧", label: "Water verdict", detail: "RO/UV purification recommended for all migrants — even in towns with 'excellent' source water" },
  { icon: "🧀", label: "Artisanal cheese", detail: "European-style feta, herbal cheese, and aged cheddar — handcrafted in Naggar, Palampur, Dharamshala" },
  { icon: "🌡️", label: "Seasonal swings", detail: "Daily meal budget can 2–3× during peak winter or monsoon (₹350 off-season → ₹700+ peak)" },
];

/* ---------- Market nodes ---------- */

export const marketNodes: MarketNode[] = [
  { town: "Solan", markets: "AMC Market, Anand Vihar Market", influence: "Transit hub adjacent to the plains — lowest wholesale baseline", pricing: "Tomatoes ₹1,700–1,900/qtl · Onion ₹1,200/qtl · Mushrooms up to ₹18,000/qtl" },
  { town: "Palampur", markets: "Old Vegetable Market, Lama Market", influence: "Agrarian centre — early-morning bulk trading feeds entire Kangra Valley", pricing: "Bulk sacks at wholesale rates · Lama Market 9:30 AM–8:30 PM" },
  { town: "Shimla", markets: "Lower Bazar, Sunday Market", influence: "High-altitude dense urban — steep transport markup", pricing: "Leafy veg ₹2,200–3,200/qtl · Capsicum ₹3,500–4,500/qtl · Garlic ₹5–9k/qtl" },
  { town: "Dharamshala / McLeodganj", markets: "Khanyara Road Market (daily 9 AM–10:30 PM)", influence: "Tibetan & expat community — wellness-oriented retail", pricing: "High-margin retail · Organic Thali Cafe, Alpine Cafe, Pacha Mamma cluster" },
  { town: "Bir", markets: "Lower Bir Bazaar, Tibetan Colony", influence: "Altitude-stratified: dry goods lower, fresh produce in Tibetan Colony", pricing: "Specialty Asian greens (baby bok choy) · Broader variety at Baijnath market (11 km)" },
  { town: "Manali / Naggar", markets: "Manali Bazaar, Manu Market (8 AM–10 PM)", influence: "High-volume tourism — contract farming for steady supply", pricing: "Premium on perishables during peak season · Naggar depends on Manali supply" },
];

/* ---------- Organic & farm-to-table ---------- */

export const organicSpots = [
  { name: "GlampEco Glass Cafe", town: "Manali (Sethan Valley)", detail: "Zero food miles — in-house curd, homemade cheese, foraged herbs, Himalayan pulses" },
  { name: "Fat Plate Café", town: "Naggar Road", detail: "Family-owned farm-to-table — artisanal jams, organic produce, garden setting" },
  { name: "Woodys Health Food", town: "Naggar", detail: "Fresh herbal cheese, feta, rye/buckwheat/6-grain sourdough — weekly bakes" },
  { name: "Amiksa", town: "Palampur / Dharamshala", detail: "100% natural handcrafted artisanal cheese — French/European-inspired, Himalayan milk" },
  { name: "Friend's Shop", town: "Bir (Tibetan Colony)", detail: "Organic & natural dry goods, specialty items" },
  { name: "Organic Thali, Alpine, Pacha Mamma", town: "McLeodganj / Dharamshala", detail: "Diet-specific, nutrient-dense menus for wellness-tourism demographic" },
];

/* ---------- Animal protein ---------- */

export const proteinRealities = [
  { type: "Mutton", icon: "🐑", detail: "Premium, culturally significant protein. Preparations: Mutton Krida, Chaa Meat, Mutton Rahra. Source daily from local butchers — cold chain often inadequate for storage.", towns: "All towns · Palampur has competitive meat market (Guddu Mutton Shop, Sikander Meat)" },
  { type: "Trout", icon: "🐟", detail: "Rainbow trout farmed in Beas/Tirthan rivers. ₹500–1,000/kg depending on size and season. Minimal marination to showcase natural river flavours.", towns: "Manali & Naggar (Himalayan Trout Farm, Manalsu) · Dharamshala (Jaswal Trout, Joginder Nagar)" },
  { type: "Chicken", icon: "🍗", detail: "Most affordable and ubiquitous. Quality drops in monsoon (humidity, contamination risk). Supply disrupted by landslides — price volatility Jul–Sep.", towns: "All towns · Republic of Chicken (Palampur) + local retailers everywhere" },
];

/* ---------- Drinking water ---------- */

export const waterZones: WaterZone[] = [
  { town: "Palampur", safety: "excellent", detail: "Academic 6-month study: all parameters within BIS limits. WQI 7–17 (excellent). IPH supply generally safe, though boiling is common practice." },
  { town: "Dharamshala / McLeodganj", safety: "caution", detail: "Piped from glacial streams (Gallu), bypassing settlements. However, aging pipes + monsoon soil intrusion compromise purity seasonally." },
  { town: "Shimla", safety: "caution", detail: "Source water is excellent (HP hosts India's most breweries for water quality), but municipal distribution network aging causes contamination." },
  { town: "Manali", safety: "caution", detail: "Recent civic unrest over contaminated, turbid water in Aleo village. Jal Shakti infrastructure failures are common." },
  { town: "Solan & BBN belt", safety: "ro-essential", detail: "Groundwater severely compromised by pharmaceutical & manufacturing expansion. Heavy metal contamination confirmed. RO is mandatory." },
  { town: "Bir / Naggar", safety: "caution", detail: "Higher altitude = better source water, but infrastructure varies. Portable TDS meter + boiling recommended for all newcomers." },
];

export const waterVerdict = "While native populations have natural gastrointestinal immunity, migrants, digital nomads, and tourists face high illness risk from direct tap consumption. RO/UV purification, boiling, and a portable TDS meter (under $2) are strongly recommended across ALL towns.";

/* ---------- Dairy & cheese ---------- */

export const dairyCategories: DairyCategory[] = [
  { category: "Standard milk", providers: "Nand Gouri, Gill Dairy, Everest Doodh, Royal Dairy, Aanchal App", towns: "Shimla, Solan, Dharamshala", detail: "Local cooperatives dominate — national apps don't work in mountains due to last-mile cold-chain costs" },
  { category: "Organic / A2 milk", providers: "Direct farm subscriptions, Bino Bot (WhatsApp)", towns: "Shimla, Bir", detail: "Premium ₹60–100/liter · Health-conscious demographic" },
  { category: "Commercial cheese", providers: "Amul, Britannia — general stores everywhere", towns: "All 8 towns", detail: "Paneer and processed cubes ubiquitous" },
  { category: "Artisanal cheese", providers: "Woodys Health Food, Amiksa", towns: "Naggar, Palampur, Dharamshala", detail: "Feta, herbal cheese, European styles · Mozzarella, aged cheddar, gorgonzola available at specialty retailers" },
];

/* ---------- Bakeries & sourdough ---------- */

export const bakeryHighlights = [
  { name: "Woodys Health Food", town: "Naggar", detail: "Rye, buckwheat, 6-grain sourdough — weekly pre-orders for Manali/Kullu" },
  { name: "Jars N More / Artisanal Baking Co.", town: "Manali", detail: "Sourdough and artisanal breads for the café demographic" },
  { name: "Wool Cafe", town: "Naggar", detail: "English bakery — fluffy cheesecakes, rum balls, plum cakes" },
  { name: "Woeser Bakery", town: "McLeodganj", detail: "Heritage Tibetan bakery — pastries and desserts" },
  { name: "Nick's Italian Kitchen", town: "McLeodganj", detail: "Artisanal desserts, Italian-style pastries" },
  { name: "Adarsh Bakery / The Cake Wala", town: "Palampur", detail: "Traditional Indian bakery meets modern design" },
];

/* ---------- Food delivery ---------- */

export const deliveryReality: DeliveryTown[] = [
  { town: "Dharamshala / McLeodganj", available: true, detail: "Swiggy & Zomato — Pizza Hut, KFC, Sher-E-Punjab, Chawlas 2 + local restaurants", caveat: "35–75 min delivery; extended-radius orders can exceed 400 min" },
  { town: "Manali", available: true, detail: "Swiggy covers Purani Manali, Vashisht, Central Kullu, Prini — full spectrum", caveat: "Winter surge pricing common" },
  { town: "Palampur", available: true, detail: "Swiggy — fast food and local curries", caveat: "Limited selection compared to Dharamshala" },
  { town: "Solan", available: true, detail: "Swiggy — Chinese and Indian cuisines", caveat: "Moderate selection" },
  { town: "Shimla", available: true, detail: "Both platforms active — broadest restaurant selection", caveat: "Steep gradients extend delivery time" },
  { town: "Bir", available: false, detail: "POS/delivery infrastructure very limited — rely on walking to cafés and ordering by phone", caveat: "WhatsApp ordering from some venues" },
  { town: "Naggar", available: false, detail: "No aggregator coverage — home delivery from select local restaurants via Justdial", caveat: "Call-and-order model" },
];

export const groceryDelivery = {
  headline: "Quick-commerce grocery delivery (Blinkit, Zepto, Instamart) does NOT work in the hills.",
  detail: "10-minute delivery model is unfeasible on mountain roads. BigBasket is expanding into tier-2/3 towns but coverage is spotty. For groceries, use local mandis, general stores, and the Aanchal/Bino apps for dairy.",
};

/* ---------- Seasonal impact ---------- */

export const seasonalImpact: SeasonImpact[] = [
  { season: "Monsoon", months: "Jul–Sep", priceVector: "spike", qualityVector: "Decline — high moisture, rot, fungal growth", detail: "Landslides sever NH-5 (Shimla) and NH-3 (Manali). Tomatoes and onions spike. Fresh fish scarce — rivers turbid. Water contamination peaks. Poultry supply disrupted." },
  { season: "Winter", months: "Dec–Feb", priceVector: "surge", qualityVector: "Stable — cold chain naturally maintained", detail: "Lean agricultural season — fresh local produce absent. Tourist inflation: ₹350 daily budget → ₹700+. Heating costs passed to restaurant menus. Snow disrupts supply routes." },
  { season: "Spring / Autumn", months: "Mar–Apr, Oct–Nov", priceVector: "equilibrium", qualityVector: "Peak — fresh local harvests available", detail: "Optimal conditions. Apple harvest in autumn. Moderate tourism normalizes prices. Best produce quality at most equitable prices." },
];

/* ---------- Imported groceries ---------- */

export const importedGroceryStores = [
  { name: "Leeladhar Stores", town: "Shimla", detail: "Imported olive oils, gourmet cookies, specialty mixers" },
  { name: "Planet JR / Jagat Singh & Sons", town: "Shimla", detail: "Imported and organic products hub" },
  { name: "Modern General Store / Daily Needs", town: "Manali (Mall Road)", detail: "International condiments, global staples for tourists and expats" },
  { name: "Sansar Chand & Sons", town: "Dharamshala (Kotwali Bazaar)", detail: "Continuous imported ingredient supply for cafés and expats" },
];

/* ---------- Sources ---------- */

export const foodSources = [
  { label: "Solan Wholesale Mandi", url: "https://www.napanta.com/market-price/himachal-pradesh/solan/solan", description: "Live wholesale market prices" },
  { label: "Palampur Water Quality Study", url: "https://journalajee.com/index.php/AJEE/article/view/725", description: "Academic WQI assessment of Palampur municipal water" },
  { label: "BBN Groundwater Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12835059/", description: "Heavy metal contamination analysis, Solan district" },
  { label: "Amiksa Artisanal Cheese", url: "https://amiksa.in/", description: "Handcrafted European-style cheese from Palampur" },
  { label: "Woodys Health Food", url: "https://www.woodyshealthfood.com/services", description: "Naggar sourdough, cheese, and health food" },
  { label: "Swiggy Dharamshala", url: "https://www.swiggy.com/city/dharamshala/order-online", description: "Live delivery coverage and timelines" },
];
