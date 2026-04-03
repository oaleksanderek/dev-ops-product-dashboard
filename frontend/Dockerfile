FROM alpine:3.20 AS build
WORKDIR /app
COPY . .

FROM nginx:stable-alpine
RUN mkdir -p /var/cache/nginx/stats_cache
COPY --from=build /app/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/products.html /usr/share/nginx/html/products.html
COPY --from=build /app/stats.html /usr/share/nginx/html/stats.html
COPY --from=build /app/css /usr/share/nginx/html/css
COPY --from=build /app/js /usr/share/nginx/html/js
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80