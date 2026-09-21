# nyo-mesh.se

Webbplats för **Nyköping MeshCore-nätverk** – ett lokalt, ideellt mesh-nätverk över LoRa.

Statisk sida, ingen byggkedja. Öppna `index.html` i en webbläsare eller kör en enkel lokal server:

```bash
python3 -m http.server 8000
```

## Struktur

```
index.html      All text och markup, en sida med ankarsektioner
css/styles.css  Egen stil ovanpå Bootstrap 5 – alla färger/typsnitt som CSS-variabler i :root
js/site.js      Stänger mobilmenyn vid klick + markerar aktivt menyval vid scroll
```

Bootstrap 5.3.3 och Google Fonts (Space Grotesk + IBM Plex Sans) laddas från CDN.

## Sektioner

`#topp` hero med status · `#om-oss` · `#meshcore` · `#anvandning` · `#natverket` ·
`#hardvara` · `#kom-igang` · `#lankar` · `#faq`

## Vanliga ändringar

- **Färger/typografi:** variablerna i `:root` i `css/styles.css`.
- **Antal noder / status:** hero-kortet (`.status-card`) och `#natverket` i `index.html` – siffran 4 repeatrar och 3 personer står på båda ställen.
- **Nya länkar:** kopiera ett `<a class="linkcard">`-block i `#lankar`.
- **Ny FAQ-fråga:** kopiera ett `.accordion-item` och ge det ett nytt unikt `id` (`#faq8`) i både `data-bs-target` och `id`.
- **Nytt menyval:** lägg till `<li class="nav-item">` i `.site-nav-list` och en `<section id="...">`.

## Att göra

- Egen nätverkskarta – just nu pekar länkarna på `https://map.meshcore.dev/`.
- Kontaktväg utöver Discord (mejl eller formulär).
- Bilder på noder/antenner; sidan har medvetet inga bilder ännu.
