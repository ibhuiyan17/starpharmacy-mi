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
