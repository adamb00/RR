import mongoose from 'mongoose';
import env from './utils/validateEnv';
import app from './app';
// import { Server, Socket } from 'socket.io';

const DB = env.MONGO_DB.replace('<PASSWORD>', env.MONGO_PWD);
const port = env.PORT || 3000;

const server = app.listen(port, () => {
   console.log(`App running on port ${port}...`);
});

process.on('uncaughtException', err => {
   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
   console.log(err.name, err.message);
   process.exit(1);
});

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

process.on('unhandledRejection', (err: Error) => {
   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
   console.log(err.name, err.message);
   server.close(() => {
      process.exit(1);
   });
});

process.on('SIGTERM', () => {
   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
   server.close(() => {
      console.log('💥 Process terminated!');
   });
});

// const io = new Server(server, {
//    cors: { origin: env.NODE_ENV === 'prod' ? ['https://admin.r2byou.com', 'https://r2byou.com'] : '*' },
// });

// io.on('connection', (socket: Socket) => {
//    socket.on('notification', data => {
//       socket.broadcast.emit('notification_created', data);
//    });
//    socket.on('disconnect', () => {
//       console.log(`Socket disconnected: ${socket.id}`);
//    });

//    socket.on('error', (err: Error) => {
//       console.error(`Socket error: ${err.message}`);
//    });
// });

// location ~* \.io {
//    proxy_set_header X-Real-IP $remote_addr;
//    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//    proxy_set_header Host $http_host;
//    proxy_set_header X-NginX-Proxy false;

//    proxy_pass http://localhost:8000;
//    proxy_redirect off;

//    proxy_http_version 1.1;
//    proxy_set_header Upgrade $http_upgrade;
//    proxy_set_header Connection "upgrade";
//  }

// server {
//    listen 80;
//    listen [::]:80;
//    server_name r2byou.com www.r2byou.com;

//    location / {
//        root /var/www/r2byou.com/html;
//        try_files $uri $uri/ /index.html;
//        index index.html index.htm index.nginx-debian.html;
//    }

//    # Redirect HTTP to HTTPS
//    return 301 https://$host$request_uri;
// }

// server {
//    listen 443 ssl;
//    listen [::]:443 ssl;
//    server_name r2byou.com www.r2byou.com;

//    ssl_certificate /etc/letsencrypt/live/r2byou.com/fullchain.pem; # Your SSL certificate
//    ssl_certificate_key /etc/letsencrypt/live/r2byou.com/privkey.pem; # Your SSL certificate key
//    include /etc/letsencrypt/options-ssl-nginx.conf; # SSL configurations
//    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # DH parameters

//    location / {
//        root /var/www/r2byou.com/html;
//        try_files $uri $uri/ /index.html;
//        index index.html index.htm index.nginx-debian.html;
//    }

//    location /api {
//       proxy_pass http://localhost:8000;
//        proxy_http_version 1.1;
//        proxy_set_header X-Forwarded-Proto $scheme;
//        proxy_set_header Upgrade $http_upgrade;
// #        proxy_set_header Connection 'upgrade';
//        proxy_set_header Connection "";
//        proxy_set_header X-Real-IP $remote_addr;
//        proxy_set_header Host $host;
//        proxy_cache_bypass $http_upgrade;
//    }

//    error_page 404 /index.html;
// }

// server {
//    listen 80;
//    listen [::]:80;
//    server_name admin.r2byou.com www.admin.r2byou.com;

//    location / {
//        root /var/www/admin.r2byou.com/html;
//           try_files $uri $uri/ /index.html;
//        index index.html index.htm index.nginx-debian.html;
//    }

//    # Redirect HTTP to HTTPS
//    return 301 https://$host$request_uri;
// }

// server {
//    listen 443 ssl;
//    listen [::]:443 ssl;
//    server_name admin.r2byou.com www.admin.r2byou.com;

//    ssl_certificate /etc/letsencrypt/live/admin.r2byou.com/fullchain.pem;
//    ssl_certificate_key /etc/letsencrypt/live/admin.r2byou.com/privkey.pem;

//    # Other SSL configurations...

//    location / {
//        root /var/www/admin.r2byou.com/html;
//        try_files $uri $uri/ /index.html;
//        index index.html index.htm index.nginx-debian.html;
//    }
// }
