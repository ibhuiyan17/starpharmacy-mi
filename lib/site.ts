// Central place for all Star Pharmacy info.
// Edit phone numbers, hours, address, etc. here — every section reads from this.

export const site = {
  name: "Star Pharmacy",
  tagline: "Your Convenient Neighborhood Pharmacy",
  description:
    "Star Pharmacy in Warren, Michigan — free delivery, easy prescription transfers, medication therapy management, and one-on-one pharmacist consultations. Most insurance accepted.",
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

  // ---- Delivery zone (ZIP codes the pharmacy delivers to, free) ----
  // Warren, MI and surrounding communities. Edit as the radius grows.
  deliveryZips: [
    "48088", "48089", "48091", "48092", "48093", // Warren
    "48066", "48312", "48310", "48313",           // Roseville / Sterling Heights
    "48021", "48015", "48030",                    // Eastpointe / Center Line / Hazel Park
    "48071", "48205", "48021",                    // Madison Heights / Detroit edge
  ] as string[],

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
      q: "I'm not tech-savvy. Can I still use you?",
      a: "Absolutely. You can do everything the old-fashioned way — just call or walk in. Our staff handles refills and keeps your info securely on file. No app required.",
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
