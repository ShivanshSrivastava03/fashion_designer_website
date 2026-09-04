# Vrinda Sethi — demo storefront

A complete, working luxury-fashion e-commerce front end for a fictional Indian
designer house, built to the design system reverse-engineered from
`thecollective.in` (screen recording + its compiled CSS).

Static HTML/CSS/JS. No build step, no dependencies, no network calls at runtime —
every image, video and font is local.

## Run it

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Then open <http://localhost:8080/>. (Use `-Port 8081` if 8080 is taken.)

A server is needed rather than opening `index.html` directly, because the bag
uses `localStorage`, which browsers scope per-origin and restrict on `file://`.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home — video hero carousel, product rails, category tiles, designer + craft bands |
| `women.html` | Women listing — chips, facets, sort, grid density, progressive load |
| `men.html` | Men listing — same engine, `data-cat="men"` |
| `product.html?id=…` | Product detail — gallery, size select, buy panel, pincode, accordions |
| `bag.html` | Checkout — bag → address → payment on one stepper (`?step=2\|3` deep-links a stage) |
| `order.html` | Order confirmation + tracking |
| `atelier.html` | The designer's story, crafts, made-to-measure, press, ateliers |

`_selftest.html` runs 34 assertions over the catalogue, cart maths and render
helpers, and seeds a bag + order so the checkout screens can be reviewed without
shopping first. `_debug.html` audits every page for horizontal overflow at six
widths. Both are dev tools — delete them for a real deployment.

## Structure

```
assets/
  css/main.css     design tokens + every component
  js/data.js       taxonomy + 29-product catalogue
  js/app.js        header, footer, cart, wishlist, toasts, card renderer
  js/plp.js        listing-page engine (shared by women/men)
  img/products/    product photography (3:4)
  img/editorial/   editorial + video posters
  video/           hero and atelier clips
  fonts/           Lato 300/400/600/700 + Cormorant Garamond
```

## State

Everything lives in `localStorage` under `vs_*` keys — bag, wishlist, address,
last order. Nothing is sent anywhere. Clear site data to reset.

## Notes

* Products, prices, stock, the designer and the house are all fictional.
* Photography and footage are from Pexels under the Pexels licence.
* Checkout takes no payment and places no real order.
