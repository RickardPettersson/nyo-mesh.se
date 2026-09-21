# Statisk sida bakom nginx. Ingen byggkedja — sidan är redan färdig HTML/CSS/JS,
# så imagen kopierar in filerna som de ligger i repot.
FROM nginx:1.27-alpine

# Egen serverkonfig i stället för nginx standardfil: cache-regler,
# säkerhetsheaders och /healthz. Se nginx/default.conf.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY css/ /usr/share/nginx/html/css/
COPY js/  /usr/share/nginx/html/js/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
