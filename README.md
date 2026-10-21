# Mexiloyd Hotels — React

React 19, React Router and Vite with six routes. The design, all 20 supplied photos, room carousels, gallery filters/lightbox, booking forms and WhatsApp links are preserved.

Run `npm ci`, then `npm run dev`. Use `npm test` for interaction and validation tests, `npm run build` for production, and `npm run preview` to preview the output. On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

The build emits hashed, minified assets and a lazy-loaded bundle for each page. Build-time React rendering pre-renders every route to real HTML; React hydrates it in the browser. Page content and metadata arrive before JavaScript. Gallery photos are lazy-loaded and fixed photo boxes reserve their space. Original WebP files are retained.

Deploy `dist/` to a static host supporting directory index pages. Each route has its own HTML file for direct visits. React Router handles internal navigation without full page reloads. No production Node server is needed. `.openai/hosting.json` retains the existing Sites identity.

Edit pages in `src/pages/`, shared controls in `src/components/`, and room/photo data in `src/data.js`. Photos live in `public/assets/images/` and are copied to `/assets/images/` on build. `src/config.js` contains contact and map settings; `scripts/page-shells.mjs` generates metadata. Update both domain settings when moving hosts. Run `node scripts/verify-build.mjs` after building to validate generated assets and pages.

## Hotel confirmation required

Rates in brackets, room category/photo assignments, bathroom pairing, amenities, breakfast eligibility and hours, conference capacity/equipment, contact details, payment policies and cancellation terms need hotel confirmation. No reviews or bank details were invented. Rating and review count come from the supplied screenshots and may change.

Only one bathroom photo was supplied and no room pairing was identified; it is in the gallery pending confirmation. Bedroom assignments are provisional. Alternate matching bedroom views use dot carousels. All 20 photos appear under All; kitchen, laundry and lobby details are also under All because the requested chips do not include those categories.

Set `VITE_FORM_ENDPOINT` in `.env.local` or your build environment when the hotel supplies a real endpoint. It receives JSON and must support CORS if hosted elsewhere. Without an endpoint, forms validate and prepare WhatsApp messages, and clearly require the visitor to send the message. They do not claim a booking is confirmed. Bank details belong only on Contact.

Automated tests cover dates and required fields, WhatsApp handoff, room carousels, gallery filtering and lightbox navigation, mobile menu focus/scroll cleanup, and hydration against production output when a build exists.
