# IPTV Player - Ready to Deploy

A modern, web-based IPTV player application ready for deployment. Stream HLS content with an intuitive interface.

## Features

- 🎬 HLS video streaming support
- 📺 Channel list management
- 🎨 Modern, responsive UI
- 🐳 Docker ready for easy deployment
- ⚡ Fast and lightweight
- 📱 Mobile-friendly design

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alexelgato61-design/Iptv_ready_to_deploy.git
   cd Iptv_ready_to_deploy
   ```

2. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:8080`

### Manual Deployment

If you prefer to run without Docker:

1. **Serve the files using any web server:**
   
   Using Python:
   ```bash
   python3 -m http.server 8080
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server -p 8080
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8080
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:8080`

## Configuration

### Adding Custom Channels

To add your own channels, edit the `channels` array in `app.js`:

```javascript
const channels = [
    {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        url: "https://your-stream-url.m3u8"
    },
    // Add more channels...
];
```

### Supported Stream Formats

- HLS (HTTP Live Streaming) - `.m3u8`
- MPEG-DASH (with modifications)

## Deployment Options

### 1. Docker Deployment (Production)

```bash
# Build the image
docker build -t iptv-player .

# Run the container
docker run -d -p 8080:80 --name iptv-player iptv-player
```

### 2. Nginx Deployment

1. Copy files to nginx web root:
   ```bash
   sudo cp -r * /var/www/html/iptv/
   ```

2. Configure nginx:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/iptv
   sudo ln -s /etc/nginx/sites-available/iptv /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### 3. Cloud Deployment

#### AWS S3 + CloudFront
- Upload files to S3 bucket
- Enable static website hosting
- Configure CloudFront distribution

#### Netlify
```bash
# Deploy to Netlify
netlify deploy --prod
```

#### Vercel
```bash
# Deploy to Vercel
vercel --prod
```

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Video Player:** Video.js 8.10.0
- **Server:** Nginx (in Docker)
- **Containerization:** Docker & Docker Compose

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Features

- X-Frame-Options header
- X-Content-Type-Options header
- XSS Protection
- HTTPS ready (configure reverse proxy)

## Development

### Local Development

Simply open `index.html` in a modern web browser, or use a local web server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx http-server -p 8080
```

### Customization

1. **Styling:** Edit `styles.css` to customize the appearance
2. **Channels:** Edit `app.js` to modify the channel list
3. **Player Settings:** Modify Video.js configuration in `app.js`

## Troubleshooting

### Stream won't play
- Ensure the stream URL is accessible
- Check browser console for errors
- Verify CORS headers on the stream source
- Try a different channel

### CORS Issues
If you encounter CORS errors, you may need to:
- Configure your stream server to allow CORS
- Use a reverse proxy
- Host streams on the same domain

## License

This project is open source and available for use and modification.

## Support

For issues and feature requests, please open an issue on GitHub.

## Credits

Built with:
- [Video.js](https://videojs.com/) - HTML5 video player
- [Nginx](https://nginx.org/) - Web server
- Sample streams from various open-source projects