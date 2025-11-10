# Quick Start Guide

Get the IPTV Player up and running in under 5 minutes!

## Prerequisites

- Docker and Docker Compose installed on your system
- OR any web server (Python, Node.js, PHP, etc.)

## Option 1: Docker (Recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/alexelgato61-design/Iptv_ready_to_deploy.git
cd Iptv_ready_to_deploy
```

### 2. Start the Application
```bash
docker compose up -d
```

### 3. Access the Application
Open your browser and navigate to: **http://localhost:8080**

### 4. Stop the Application
```bash
docker compose down
```

## Option 2: Without Docker

### Using Python (Easiest)
```bash
cd Iptv_ready_to_deploy
python3 -m http.server 8080
```

### Using Node.js
```bash
cd Iptv_ready_to_deploy
npx http-server -p 8080
```

### Using PHP
```bash
cd Iptv_ready_to_deploy
php -S localhost:8080
```

Then open: **http://localhost:8080**

## Using the Application

1. The application loads with a list of sample channels on the right sidebar
2. Click on any channel to start streaming
3. Use the video controls to play/pause, adjust volume, or go fullscreen
4. The channels use open-source HLS test streams

## Customizing Channels

Edit `app.js` and modify the `channels` array:

```javascript
const channels = [
    {
        id: 1,
        name: "Your Channel Name",
        description: "Channel description",
        url: "https://your-stream-url.m3u8"
    }
];
```

## Troubleshooting

### Stream won't play?
- Check browser console for errors (F12)
- Ensure the stream URL is accessible
- Try a different channel

### Port 8080 already in use?
- Change the port in `docker-compose.yml`:
  ```yaml
  ports:
    - "8081:80"  # Use port 8081 instead
  ```

## Need More Help?

- See [README.md](README.md) for full documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check the [LICENSE](LICENSE) file for usage terms

## What's Included

- ✅ HTML5 video player with HLS support
- ✅ Responsive web interface
- ✅ Sample streaming channels
- ✅ Docker containerization
- ✅ Production-ready nginx configuration
- ✅ Comprehensive documentation

Enjoy streaming! 🎬
