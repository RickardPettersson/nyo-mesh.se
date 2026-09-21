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
Dockerfile      nginx-image med sidans filer (se Docker nedan)
nginx/          Serverkonfig: cache, gzip, säkerhetsheaders, /healthz
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


## Docker

Sidan byggs också som en nginx-image. Lokalt:

```bash
docker build -t nyo-mesh .
docker run --rm -p 8080:80 nyo-mesh
```

Sidan ligger då på <http://localhost:8080>, och `/healthz` svarar `ok` för
probes. Serverkonfigurationen — cache, gzip, säkerhetsheaders och 404 — ligger i
`nginx/default.conf`.

> **CSP:** `nginx/default.conf` sätter en Content-Security-Policy som listar exakt
> de externa källor sidan använder i dag (jsdelivr för Bootstrap, Google Fonts).
> Lägger du till en ny CDN, ett analysskript eller en inline-`<script>` måste den
> uppdateras — annars blockerar webbläsaren resursen utan att något syns i
> serverloggen.

### Automatiskt bygge

`.github/workflows/docker-image.yml` bygger imagen vid push till `main`, vid
taggar `v*` och vid pull requests. Varje bygge startar imagen och kontrollerar
att startsidan, css, js och `/healthz` svarar innan något publiceras — en image
som byggs men serverar 404 ska inte nå registret.

Publicering sker till GitHub Container Registry med det inbyggda
`GITHUB_TOKEN`; inga hemligheter behöver läggas upp. Pull requests byggs och
testas men publiceras inte.

```bash
docker pull ghcr.io/rickardpettersson/nyo-mesh.se:latest
```

Taggar: `latest` och `main-<sha>` från `main`, samt `1.2.3` och `1.2` för en
tagg `v1.2.3`. Images byggs för `linux/amd64` och `linux/arm64` (Raspberry Pi).

> Första publiceringen skapar paketet som **privat**. Ska imagen vara publik:
> repots sida → Packages → `nyo-mesh.se` → Package settings → Change visibility.

## Att göra

- Egen nätverkskarta – just nu pekar länkarna på `https://map.meshcore.dev/`.
- Kontaktväg utöver Discord (mejl eller formulär).
- Bilder på noder/antenner; sidan har medvetet inga bilder ännu.
