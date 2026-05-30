// Central place for all Star Pharmacy info.
// Edit phone numbers, hours, address, etc. here — every section reads from this.

// ---- Service area (Warren + every surrounding city/ZIP) ----
// Drives the delivery-zone checker, the "Areas We Serve" section, local-SEO
// metadata, the sitemap, and the Pharmacy structured data. Add or remove
// cities/ZIPs here and the whole site updates.
export const serviceAreas = [
  { city: "Warren", county: "Macomb", zips: ["48088", "48089", "48091", "48092", "48093"] },
  { city: "Center Line", county: "Macomb", zips: ["48015"] },
  { city: "Sterling Heights", county: "Macomb", zips: ["48310", "48311", "48312", "48313", "48314"] },
  { city: "Roseville", county: "Macomb", zips: ["48066"] },
  { city: "Eastpointe", county: "Macomb", zips: ["48021"] },
  { city: "Fraser", county: "Macomb", zips: ["48026"] },
  { city: "Clinton Township", county: "Macomb", zips: ["48035", "48036", "48038"] },
  { city: "St. Clair Shores", county: "Macomb", zips: ["48080", "48081", "48082"] },
  { city: "Utica", county: "Macomb", zips: ["48315", "48316", "48317"] },
  { city: "Mount Clemens", county: "Macomb", zips: ["48043"] },
  { city: "Madison Heights", county: "Oakland", zips: ["48071"] },
  { city: "Hazel Park", county: "Oakland", zips: ["48030"] },
  { city: "Royal Oak", county: "Oakland", zips: ["48067", "48073"] },
  { city: "Ferndale", county: "Oakland", zips: ["48220"] },
  { city: "Clawson", county: "Oakland", zips: ["48017"] },
  { city: "Berkley", county: "Oakland", zips: ["48072"] },
  { city: "Oak Park", county: "Oakland", zips: ["48237"] },
  { city: "Troy", county: "Oakland", zips: ["48083", "48084", "48085", "48098"] },
  { city: "Hamtramck", county: "Wayne", zips: ["48212"] },
  { city: "Highland Park", county: "Wayne", zips: ["48203"] },
  { city: "Harper Woods", county: "Wayne", zips: ["48225"] },
  { city: "Detroit (Northeast)", county: "Wayne", zips: ["48205", "48224", "48234", "48213", "48211"] },
] as const;

// Flat list of every served ZIP (used by the delivery-zone checker).
export const deliveryZips: string[] = serviceAreas.flatMap((a) => [...a.zips]);

export const site = {
  name: "Star Pharmacy",
  tagline: "Your Convenient Neighborhood Pharmacy",
  description:
    "Star Pharmacy in Warren, Michigan — we transfer your prescriptions, call your old pharmacy, set up automatic refills, and deliver free to your door (or walk in and pick up). Medication therapy management and most insurance accepted.",
  url: "https://www.starpharmacy-mi.com",

  phone: "586-486-5037",
  fax: "586-806-6958",
  email: "starpharmacymi@gmail.com",

  address: {
    line1: "24831 Ryan Rd",
    line2: "Warren, MI 48091",
    mapsUrl: "https://goo.gl/maps/v6p6NXfjSdb4bcpFA",
    // Keyless embed (no Google API key / billing required)
    embedUrl:
      "https://www.google.com/maps?q=24831+Ryan+Rd,+Warren,+MI+48091&output=embed",
    lat: 42.47546,
    lng: -83.0658112,
  },

  facebook: "https://www.facebook.com/starpharmacymi",

  // ---- Online portal (Rx365 by Liberty Software) ----
  // TODO: replace this placeholder with the real portal link from the
  // pharmacy's Liberty Software / Rx365 operator. One-line change.
  rx365PortalUrl: "https://starpharmacy.rx365.com", // PLACEHOLDER — confirm before launch
  rx365PortalConfigured: false, // flip to true once the URL above is verified

  // ---- Explainer video (60-second video from the plan) ----
  // Drop in a YouTube or Vimeo ID when the video is ready and it appears
  // automatically. Leave both blank to show a polished "coming soon" slot.
  explainerVideo: {
    youtubeId: "", // e.g. "dQw4w9WgXcQ"
    vimeoId: "", // e.g. "76979871"
    title: "See how Star Pharmacy works",
    poster: "/images/IMG_1522.jpg", // shown before the video loads (fast page)
  },

  // ---- Delivery / service area ---- (defined in serviceAreas above)
  serviceAreas,
  deliveryZips,

  // ---- FAQ ----
  faqs: [
    {
      q: "How much does delivery cost?",
      a: "Nothing. Free same-day home delivery is handled by our own trusted local drivers — no fees, no mail-order delays.",
    },
    {
      q: "How do I switch from CVS or Walgreens?",
      a: "Click “Switch to Us” and fill out a 60-second form with your name, phone, and which pharmacy you're leaving. We call your old store, pull your prescriptions over, and text you when everything's ready. You never wait on hold.",
    },
    {
      q: "What are automatic monthly refills?",
      a: "Using Med-Sync, we align all of your monthly medications so they refill on the same day each month. You think about it once — we handle the rest and deliver them together.",
    },
    {
      q: "Can I manage my family's prescriptions?",
      a: "Yes. You can manage refills and deliveries for parents, children, or other family members from one place — by phone or through the online portal.",
    },
    {
      q: "Do you accept my insurance?",
      a: "We accept most insurance plans and will match or beat competitor prices. Call us at 586-486-5037 and we'll confirm your coverage in minutes.",
    },
    {
      q: "Do I have to use delivery?",
      a: "Not at all. Delivery is free if you want it, but you're always welcome to walk in and pick up your prescriptions at the counter — whatever's most convenient for you.",
    },
    {
      q: "What exactly do you handle when I switch?",
      a: "Everything. We transfer all your prescriptions, call your old pharmacy to pull your records, set up automatic monthly refills (Med-Sync), and deliver to your door for free — or have them ready for pickup. You just tell us your name and current pharmacy.",
    },
    {
      q: "I'm not tech-savvy. Can I still use you?",
      a: "Absolutely. You can do everything the old-fashioned way — just call or walk in. Our staff handles refills and keeps your info securely on file. No app required.",
    },
  ],

  // ---- Reviews / testimonials ----
  // ⚠️ REPLACE the examples below with REAL reviews before launch, and set
  // `rating.count` to your true total review count. The star-rating snippet
  // in search results only appears once count > 0 — never publish an invented
  // rating/count (it violates Google's guidelines and risks a penalty).
  reviewsUrl: "https://www.google.com/maps?q=24831+Ryan+Rd,+Warren,+MI+48091", // TODO: link to the real Google reviews page
  rating: { value: 5.0, count: 0, source: "Google" }, // count: 0 → no schema yet
  reviews: [
    {
      name: "Example Review — replace me",
      location: "Warren, MI",
      rating: 5,
      text: "They transferred everything from my old pharmacy and now my meds show up at my door every month. I haven't waited in a line since.",
    },
    {
      name: "Example Review — replace me",
      location: "Sterling Heights, MI",
      rating: 5,
      text: "The team called my old pharmacy, set up my refills, and delivered the same day. Friendly, fast, and free — couldn't ask for more.",
    },
    {
      name: "Example Review — replace me",
      location: "Roseville, MI",
      rating: 5,
      text: "I'm not into apps, so I just call or stop in. They always have my prescriptions ready and remember me by name.",
    },
  ],

  // Hours in 24h. open/close are local hours; null = closed all day.
  hours: [
    { day: "Sunday", open: null, close: null, label: "Closed" },
    { day: "Monday", open: 9, close: 19, label: "9am – 7pm" },
    { day: "Tuesday", open: 9, close: 19, label: "9am – 7pm" },
    { day: "Wednesday", open: 9, close: 19, label: "9am – 7pm" },
    { day: "Thursday", open: 9, close: 19, label: "9am – 7pm" },
    { day: "Friday", open: 9, close: 19, label: "9am – 7pm" },
    { day: "Saturday", open: 10, close: 15, label: "10am – 3pm" },
  ] as const,
};

export type Hours = (typeof site.hours)[number];

// Plain list of served city names (for SEO copy, keywords, structured data).
export const serviceCities = serviceAreas.map((a) =>
  a.city.replace(/\s*\(.*\)$/, "")
);

// URL-safe slug for a city ("Sterling Heights" -> "sterling-heights",
// "Detroit (Northeast)" -> "detroit").
export function cityToSlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Service areas with a clean display name + slug, for the per-city landing
// pages and internal links.
export const serviceAreaPages = serviceAreas.map((a) => ({
  city: a.city.replace(/\s*\(.*\)$/, ""),
  rawCity: a.city,
  county: a.county,
  zips: [...a.zips],
  slug: cityToSlug(a.city),
}));

export type ServiceAreaPage = (typeof serviceAreaPages)[number];
