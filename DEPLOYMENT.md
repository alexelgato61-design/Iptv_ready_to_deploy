# Deployment Guide

This guide provides detailed instructions for deploying the IPTV Player application in various environments.

## Prerequisites

- Docker and Docker Compose (for containerized deployment)
- Web server (Nginx, Apache, etc.) for manual deployment
- Valid HLS stream URLs

## Production Deployment

### Option 1: Docker Compose (Recommended)

This is the simplest and most reliable deployment method.

1. **Prepare the environment:**
   ```bash
   git clone https://github.com/alexelgato61-design/Iptv_ready_to_deploy.git
   cd Iptv_ready_to_deploy
   ```

2. **Start the application:**
   ```bash
   docker-compose up -d
   ```

3. **Verify the deployment:**
   ```bash
   docker-compose ps
   docker-compose logs
   ```

4. **Access the application:**
   Navigate to `http://your-server-ip:8080`

5. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Option 2: Standalone Docker

1. **Build the Docker image:**
   ```bash
   docker build -t iptv-player:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name iptv-player \
     -p 8080:80 \
     --restart unless-stopped \
     iptv-player:latest
   ```

3. **Manage the container:**
   ```bash
   # View logs
   docker logs iptv-player
   
   # Stop container
   docker stop iptv-player
   
   # Start container
   docker start iptv-player
   
   # Remove container
   docker rm -f iptv-player
   ```

### Option 3: Traditional Server Deployment

#### Nginx on Ubuntu/Debian

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

2. **Copy application files:**
   ```bash
   sudo mkdir -p /var/www/iptv
   sudo cp index.html styles.css app.js /var/www/iptv/
   sudo chown -R www-data:www-data /var/www/iptv
   ```

3. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/iptv
   ```
   
   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       root /var/www/iptv;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/javascript;
   }
   ```

4. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/iptv /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

#### Apache on Ubuntu/Debian

1. **Install Apache:**
   ```bash
   sudo apt update
   sudo apt install apache2 -y
   ```

2. **Copy files:**
   ```bash
   sudo mkdir -p /var/www/html/iptv
   sudo cp index.html styles.css app.js /var/www/html/iptv/
   sudo chown -R www-data:www-data /var/www/html/iptv
   ```

3. **Configure Apache:**
   Create `/etc/apache2/sites-available/iptv.conf`:
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       DocumentRoot /var/www/html/iptv
       
       <Directory /var/www/html/iptv>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

4. **Enable the site:**
   ```bash
   sudo a2ensite iptv
   sudo systemctl reload apache2
   ```

## Cloud Platform Deployment

### AWS EC2

1. **Launch an EC2 instance** (Ubuntu 20.04 or later)

2. **Connect to your instance:**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker ubuntu
   ```

4. **Deploy the application:**
   ```bash
   git clone https://github.com/alexelgato61-design/Iptv_ready_to_deploy.git
   cd Iptv_ready_to_deploy
   docker-compose up -d
   ```

5. **Configure security group** to allow inbound traffic on port 8080

### AWS S3 + CloudFront

1. **Create an S3 bucket** with static website hosting enabled

2. **Upload files:**
   ```bash
   aws s3 sync . s3://your-bucket-name/ --exclude ".git/*" --exclude "*.md"
   ```

3. **Create CloudFront distribution** pointing to your S3 bucket

4. **Update DNS** to point to CloudFront distribution

### DigitalOcean Droplet

1. **Create a Droplet** (Ubuntu 20.04)

2. **SSH into your droplet:**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

4. **Deploy:**
   ```bash
   git clone https://github.com/alexelgato61-design/Iptv_ready_to_deploy.git
   cd Iptv_ready_to_deploy
   docker-compose up -d
   ```

### Heroku

Create a `Procfile`:
```
web: python3 -m http.server $PORT
```

Deploy:
```bash
heroku create your-app-name
git push heroku main
```

### Netlify

1. **Connect your repository** to Netlify

2. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `.`

3. **Deploy!**

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## SSL/HTTPS Configuration

### Using Let's Encrypt with Nginx

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal is configured automatically**

### Using Cloudflare

1. Point your domain to Cloudflare nameservers
2. Enable SSL/TLS in Cloudflare dashboard
3. Set SSL mode to "Full" or "Full (strict)"

## Monitoring and Maintenance

### Docker Logs

```bash
# View logs
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100
```

### Health Checks

Add to `docker-compose.yml`:
```yaml
healthcheck:
  test: ["CMD", "wget", "-q", "--spider", "http://localhost"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Backup

```bash
# Backup application files
tar -czf iptv-backup-$(date +%Y%m%d).tar.gz index.html styles.css app.js

# Backup configuration
docker-compose config > docker-compose-backup.yml
```

## Scaling

### Load Balancing with Nginx

```nginx
upstream iptv_backend {
    server iptv-instance1:80;
    server iptv-instance2:80;
    server iptv-instance3:80;
}

server {
    listen 80;
    location / {
        proxy_pass http://iptv_backend;
    }
}
```

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml iptv-stack

# Scale service
docker service scale iptv-stack_iptv-player=3
```

## Troubleshooting

### Container won't start
```bash
docker-compose logs
docker inspect iptv-player
```

### Port already in use
```bash
# Change port in docker-compose.yml
ports:
  - "8081:80"  # Use different port
```

### Permission issues
```bash
sudo chown -R $(whoami):$(whoami) .
```

## Security Best Practices

1. **Use HTTPS** in production
2. **Update regularly** - Keep Docker images and dependencies updated
3. **Firewall configuration** - Only expose necessary ports
4. **Use environment variables** for sensitive configuration
5. **Regular backups** - Automate backup procedures
6. **Monitor logs** - Set up log aggregation and monitoring

## Performance Optimization

1. **Enable Gzip compression** (already configured in nginx.conf)
2. **Use CDN** for static assets
3. **Cache headers** (configured in nginx.conf)
4. **Optimize images** if you add custom logos
5. **Minify CSS/JS** for production

## Support

For deployment issues, please:
1. Check logs first
2. Verify all prerequisites are met
3. Review troubleshooting section
4. Open an issue on GitHub with detailed information
