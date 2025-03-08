FROM nginx:1.23-alpine

# تثبيت الأدوات الأساسية
RUN apk add --no-cache curl

# نسخ تكوين Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/proxy.conf /etc/nginx/proxy.conf
COPY nginx/mime.types /etc/nginx/mime.types

# فتح المنافذ
EXPOSE 80 443

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]
