export const photos = [
  {
    "file": "exterior-front",
    "category": "Exterior",
    "alt": "Mexiloyd Hotels exterior with ornate pillars and a tiled courtyard",
    "src": "/assets/images/exterior-front.webp"
  },
  {
    "file": "room-kings-royal-detail",
    "category": "Rooms",
    "alt": "King bed under a blue-lit ceiling with an inset view of the dressing area",
    "src": "/assets/images/room-kings-royal-detail.webp"
  },
  {
    "file": "lounge-overhead-detail",
    "category": "Bar & Lounge",
    "alt": "Ornate lounge seating viewed from above with a blue ceiling detail",
    "src": "/assets/images/lounge-overhead-detail.webp"
  },
  {
    "file": "lounge-television",
    "category": "Bar & Lounge",
    "alt": "Lounge television wall and carved armchair beside a drinks table",
    "src": "/assets/images/lounge-television.webp"
  },
  {
    "file": "room-deluxe-studio-bed-close",
    "category": "Rooms",
    "alt": "Double bed with white linens and patterned curtains, viewed from the foot",
    "src": "/assets/images/room-deluxe-studio-bed-close.webp"
  },
  {
    "file": "room-royal-studio-bed",
    "category": "Rooms",
    "alt": "Double bed with white linens, dark curtains and wall-mounted air conditioning",
    "src": "/assets/images/room-royal-studio-bed.webp"
  },
  {
    "file": "room-kings-royal-bed",
    "category": "Rooms",
    "alt": "Spacious bedroom with a king bed, red curtains and blue ceiling lighting",
    "src": "/assets/images/room-kings-royal-bed.webp"
  },
  {
    "file": "room-deluxe-studio-bed",
    "category": "Rooms",
    "alt": "Double bedroom with cream curtains, an armchair and an inset bed view",
    "src": "/assets/images/room-deluxe-studio-bed.webp"
  },
  {
    "file": "lounge-ornate-seating",
    "category": "Bar & Lounge",
    "alt": "Carved wood and dark leather sofas in the hotel lounge",
    "src": "/assets/images/lounge-ornate-seating.webp"
  },
  {
    "file": "room-queens-royal-bed",
    "category": "Rooms",
    "alt": "Bedroom with a double bed, television, refrigerator and black armchair",
    "src": "/assets/images/room-queens-royal-bed.webp"
  },
  {
    "file": "lounge-dining",
    "category": "Bar & Lounge",
    "alt": "Wicker tables and chairs under circular coloured ceiling lighting",
    "src": "/assets/images/lounge-dining.webp"
  },
  {
    "file": "facilities-kitchen",
    "category": "Facilities",
    "alt": "Kitchen with bright orange cabinets and black stone countertops",
    "src": "/assets/images/facilities-kitchen.webp"
  },
  {
    "file": "exterior-courtyard",
    "category": "Exterior",
    "alt": "Hotel entrance gates and tiled courtyard framed by brick pillars",
    "src": "/assets/images/exterior-courtyard.webp"
  },
  {
    "file": "lobby-entrance",
    "category": "Facilities",
    "alt": "Hotel lobby entrance with a timber feature wall and green plants",
    "src": "/assets/images/lobby-entrance.webp"
  },
  {
    "file": "lobby-reception",
    "category": "Facilities",
    "alt": "White reception desk against a stone feature wall",
    "src": "/assets/images/lobby-reception.webp"
  },
  {
    "file": "conference-hall",
    "category": "Conference",
    "alt": "Conference hall with red chairs, classroom tables and a projector-screen inset",
    "src": "/assets/images/conference-hall.webp"
  },
  {
    "file": "facilities-laundry",
    "category": "Facilities",
    "alt": "Hotel laundry attendant pressing linens beside a washing machine",
    "src": "/assets/images/facilities-laundry.webp"
  },
  {
    "file": "facilities-bar",
    "category": "Bar & Lounge",
    "alt": "Illuminated bar shelves displaying bottles behind the counter",
    "src": "/assets/images/facilities-bar-shelves.svg"
  },
  {
    "file": "bathroom-glass-shower",
    "category": "Bathrooms",
    "alt": "En-suite bathroom with a frosted glass shower enclosure and brown marble-effect tiles",
    "src": "/assets/images/bathroom-glass-shower.webp"
  },
  {
    "file": "lobby-staircase",
    "category": "Facilities",
    "alt": "Black and white lobby staircase with ornate iron rails and a planted feature wall",
    "src": "/assets/images/lobby-staircase.webp"
  }
];
export const rooms = [
  {
    "name": "Royal Studio",
    "rate": "20,000",
    "desc": "A comfortable studio with everything you need for a short stay.",
    "images": [
      "room-royal-studio-bed"
    ]
  },
  {
    "name": "Deluxe Studio",
    "rate": "30,000",
    "desc": "More space and finish for business trips and longer stays.",
    "images": [
      "room-deluxe-studio-bed",
      "room-deluxe-studio-bed-close"
    ]
  },
  {
    "name": "Queens Royal",
    "rate": "35,000",
    "desc": "A refined room with extra room to relax.",
    "images": [
      "room-queens-royal-bed"
    ]
  },
  {
    "name": "Kings Royal",
    "rate": "40,000",
    "desc": "Our most spacious room, for guests who want the best we have.",
    "images": [
      "room-kings-royal-bed",
      "room-kings-royal-detail"
    ]
  }
];
export const photoByFile = Object.fromEntries(photos.map(photo => [photo.file, photo]));
