# MemoryHub Backend - Coolify Deployment Guide

This guide will help you deploy the MemoryHub backend to your VPS using Coolify.

## Prerequisites

- Coolify installed and running on your VPS
- Domain name pointing to your VPS (e.g., `api.memoryhub.com`)
- All environment variables from `.env.production.example`

---

## Step 1: Prepare Your Repository

Coolify can deploy directly from Git. Ensure your repository is accessible:

### Option A: GitHub/GitLab (Recommended)
1. Push your backend code to a Git repository
2. Coolify will pull from the repository automatically

### Option B: Local Git Repository
1. Coolify can also connect to a local git repository on your VPS

---

## Step 2: Create a New Application in Coolify

1. **Log in to Coolify Dashboard**
   - Navigate to your Coolify instance (e.g., `https://coolify.yourdomain.com`)

2. **Create New Application**
   - Click "New Resource" → "Application"
   - Choose your Git source (GitHub, GitLab, or local)

3. **Configure Git Repository**
   - **Repository URL**: Your git repository URL
   - **Branch**: `main` or `master`
   - **Base Directory**: `/backend` (since backend is in a subdirectory)
   - **Build Pack**: Select "Dockerfile" (Coolify will detect your Dockerfile)

**IMPORTANT:** Make sure to configure Container Labels **without leading spaces**. Labels should look like:
```
traefik.enable=true
```
NOT:
```
  traefik.enable=true
```
Leading spaces will cause Traefik to ignore the labels!

---

## Step 3: Configure Build Settings

### Dockerfile Configuration

Coolify will automatically detect your `Dockerfile` in the backend directory.

**Verify these settings:**
- **Dockerfile Location**: `./Dockerfile` (relative to `/backend`)
- **Build Context**: `.` (current directory)
- **Port**: `3000` (Coolify will expose this)

---

## Step 4: Configure Environment Variables

In Coolify's Environment Variables section, add all required variables from `.env.production.example`:

### Required Variables

```bash
# Database
MEMORYHUB_DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require

# Authentication (Clerk)
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Cron Job Security
CRON_SECRET=your-super-secret-cron-token

# Billing (Dodo Payments)
BILLING_PROVIDER=dodo
DODO_API_KEY=your-dodo-api-key
DODO_WEBHOOK_SECRET=your-dodo-webhook-secret
DODO_MODE=live
NEXT_PUBLIC_APP_URL=https://api.memoryhub.com

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Error Tracking
SENTRY_DSN=your-sentry-dsn
HIGHLIGHT_PROJECT_ID=your-highlight-project-id

# System
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### Optional Variables
```bash
# CORS (if needed)
ALLOWED_ORIGINS=https://app.memoryhub.com,https://www.memoryhub.com
```

**Important Notes:**
- Coolify securely stores environment variables
- Variables are injected at runtime
- You can edit them anytime without rebuilding

---

## Step 5: Configure Domain & SSL

### Domain Setup

1. **Navigate to Domains section** in your application
2. **Add your domain**: `api.memoryhub.com`
3. **Enable SSL**: Coolify automatically provisions SSL certificates via Let's Encrypt
4. **Force HTTPS**: Enable redirect from HTTP to HTTPS

### DNS Configuration

Ensure your DNS is pointing to your VPS:

```dns
A     api.memoryhub.com     →  YOUR_VPS_IP
```

**SSL Certificate Auto-Renewal:**
Coolify handles SSL certificate renewal automatically.

---

## Step 6: Configure Health Check

Coolify can monitor your application health:

1. **Navigate to Health Check settings**
2. **Enable Health Check**
3. **Configure:**
   - **Health Check URL**: `/api/status` (or `/` for basic check)
   - **Health Check Port**: `3000`
   - **Interval**: `30s`
   - **Timeout**: `10s`
   - **Retries**: `5`
   - **Start Period**: `60s`

This ensures Coolify restarts your app if it becomes unhealthy.

---

## Step 7: Configure Resource Limits (Optional)

For budget VPS, you can set resource limits:

1. **Navigate to Resources section**
2. **Set limits:**
   - **Memory Limit**: `1024MB` (1GB)
   - **Memory Reservation**: `512MB`
   - **CPU Limit**: `1.5` cores
   - **CPU Reservation**: `0.5` cores

These match your previous docker-compose.yml settings.

---

## Step 8: Configure Persistent Storage (Optional)

If you want to persist ML model cache:

1. **Navigate to Volumes section**
2. **Add Volume:**
   - **Host Path**: `/var/coolify/volumes/memoryhub-backend-cache`
   - **Container Path**: `/app/.cache`
   - **Description**: ML model cache

This prevents re-downloading models on every deployment.

---

## Step 9: Deploy

1. **Click "Deploy" button**
2. **Monitor build logs** in real-time
3. **Wait for deployment** (usually 2-5 minutes for first deployment)

### Build Process:
1. Coolify pulls code from Git
2. Builds Docker image using your Dockerfile
3. Runs `npm ci` and `prisma generate`
4. Builds Next.js app
5. Starts container
6. Waits for health check
7. Routes traffic to new container
8. SSL certificate is provisioned (if first deployment)

---

## Step 10: Verify Deployment

### Test Your API

```bash
# Health check
curl https://api.memoryhub.com/api/status

# Should return health status
```

### Check Logs

In Coolify dashboard:
1. Navigate to your application
2. Click "Logs" tab
3. View real-time logs

### Test Endpoints

```bash
# Test with your API key
curl -X POST https://api.memoryhub.com/api/memories \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test memory"}'
```

---

## Coolify Features You Get

### Automatic Benefits

✅ **Zero-downtime deployments**: Coolify handles rolling updates
✅ **SSL certificates**: Auto-provisioned and auto-renewed
✅ **Git-based deployments**: Push to Git → Auto-deploy (optional)
✅ **Health monitoring**: Auto-restart on failure
✅ **Log management**: Centralized logs with rotation
✅ **Rollback support**: One-click rollback to previous versions
✅ **Secrets management**: Encrypted environment variables
✅ **Resource monitoring**: CPU, memory, and network graphs

---

## Migration from Old Deployment

### What Changes?

| Old Setup | Coolify |
|-----------|---------|
| Manual `deploy.sh` script | Coolify UI or Git push |
| Docker Compose | Coolify manages containers |
| Caddy reverse proxy | Coolify's built-in proxy |
| Manual SSL with Caddy | Automatic SSL |
| Health check in compose | Health check in Coolify |
| Manual rollback | One-click rollback |

### What Stays the Same?

✅ Your Dockerfile (no changes needed)
✅ Environment variables (same names and values)
✅ Database connection (NeonDB)
✅ External services (Clerk, Dodo, Upstash, Sentry)

---

## Ongoing Operations

### Deploy Updates

#### Option 1: Manual Deploy (Coolify UI)
1. Push code to Git
2. Open Coolify dashboard
3. Click "Deploy" button
4. Monitor deployment logs

#### Option 2: Auto-Deploy on Git Push
1. Enable "Auto Deploy" in Coolify
2. Push to your Git branch
3. Coolify automatically deploys

### View Logs

```bash
# In Coolify UI:
Dashboard → Your App → Logs → Real-time logs
```

### Rollback

```bash
# In Coolify UI:
Dashboard → Your App → Deployments → Select previous version → Rollback
```

### Update Environment Variables

```bash
# In Coolify UI:
Dashboard → Your App → Environment → Edit variables → Save → Restart
```

### Restart Application

```bash
# In Coolify UI:
Dashboard → Your App → Actions → Restart
```

---

## Troubleshooting

### Build Fails

**Check build logs:**
1. Open Coolify dashboard
2. Navigate to your application
3. Click "Logs" → "Build Logs"
4. Look for errors

**Common issues:**
- Missing environment variables
- Dockerfile errors
- Out of memory during build
- Prisma generation fails

**Solutions:**
- Verify all environment variables are set
- Check Dockerfile is valid
- Increase build resources in Coolify settings
- Ensure `MEMORYHUB_DATABASE_URL` is correct

### Health Check Fails

**Check application logs:**
```bash
Dashboard → Your App → Logs → Runtime Logs
```

**Common issues:**
- Database connection failure
- Port mismatch (ensure PORT=3000)
- Application crashes on startup
- Missing environment variables

**Solutions:**
- Test database connection manually
- Verify `MEMORYHUB_DATABASE_URL` is correct
- Check for errors in runtime logs
- Ensure all required env vars are set

### SSL Certificate Not Issuing

**Check domain configuration:**
1. Verify DNS is pointing to your VPS
2. Ensure ports 80 and 443 are open
3. Check Coolify proxy logs

**Solutions:**
```bash
# Verify DNS
nslookup api.memoryhub.com

# Check if ports are open
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# In Coolify: Regenerate SSL certificate
Dashboard → Your App → Domain → Force SSL Regeneration
```

### High Memory Usage

**Check resource usage:**
```bash
Dashboard → Your App → Resources → Monitor
```

**Solutions:**
- Increase memory limits
- Optimize application (reduce model size)
- Upgrade VPS plan

### Application Crashes

**Check logs for errors:**
```bash
Dashboard → Your App → Logs
```

**Solutions:**
- Review error logs
- Check Sentry for application errors
- Verify database connection
- Ensure environment variables are correct
- Restart application

---

## Monitoring & Observability

### Built-in Monitoring

Coolify provides:
- **Resource usage graphs** (CPU, memory, network)
- **Log aggregation** (real-time and historical)
- **Health check monitoring**
- **Deployment history**

### External Monitoring

Your existing monitoring tools still work:
- **Sentry**: Application errors
- **Highlight.io**: APM and traces
- **UptimeRobot**: Uptime monitoring
- **cron-job.org**: Cron job monitoring

---

## Cron Jobs

### Option 1: External Cron Service (Recommended)

Use **cron-job.org** or **EasyCron**:

```bash
# Configure HTTP request
URL: https://api.memoryhub.com/api/cron/cleanup
Method: POST
Headers:
  x-cron-secret: YOUR_CRON_SECRET
Schedule: Daily at 2:00 AM UTC
```

### Option 2: Coolify Scheduled Tasks

Coolify doesn't natively support cron jobs in the application. Continue using external cron services.

---

## Security Considerations

### Firewall

Coolify manages the proxy, but ensure your firewall is configured:

```bash
# Allow Coolify's ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH

# Coolify handles internal networking
# No need to expose port 3000 directly
```

### Secrets Management

Coolify encrypts environment variables at rest. Best practices:
- Use strong, unique values for `CRON_SECRET`
- Rotate API keys regularly
- Never commit secrets to Git
- Use Coolify's built-in secrets management

### SSH Hardening

Your existing SSH hardening still applies:
- Keep fail2ban running
- Use SSH keys (no password authentication)
- Keep system updated

---

## Backup Strategy

### Database Backups

NeonDB handles automatic backups. For additional safety:

```bash
# Manual backup (run from VPS or local)
pg_dump "$MEMORYHUB_DATABASE_URL" > backup_$(date +%Y%m%d).sql
```

### Configuration Backups

Coolify stores configuration in its database. Recommended:
- Export environment variables periodically
- Keep a copy of your Dockerfile in Git
- Document your Coolify settings

### Disaster Recovery

1. **Reinstall Coolify** on new VPS
2. **Create new application** in Coolify
3. **Configure from documentation** (this guide)
4. **Restore environment variables**
5. **Deploy from Git**

---

## Performance Tips

### Build Performance

- **Enable build cache**: Coolify caches Docker layers
- **Use `.dockerignore`**: Your existing file is good
- **Optimize Dockerfile**: Multi-stage builds (already done)

### Runtime Performance

- **Set resource limits**: Prevent one app from using all resources
- **Use persistent volumes**: Cache ML models
- **Enable compression**: Coolify's proxy handles this

---

## Cost Comparison

### Old Setup (Manual)
- ✅ Free (self-hosted)
- ❌ Manual deployment
- ❌ No built-in monitoring
- ❌ Manual SSL management

### Coolify Setup
- ✅ Free (self-hosted)
- ✅ One-click deployment
- ✅ Built-in monitoring
- ✅ Automatic SSL
- ✅ Easy rollback
- ✅ Better UX

**Winner: Coolify** (Same cost, better features)

---

## Advanced Configuration

### Custom Dockerfile

Your current Dockerfile works perfectly with Coolify. No changes needed.

### Build Arguments

If you need build-time variables:

```bash
# In Coolify UI:
Dashboard → Your App → Build → Build Arguments
ARG_NAME=value
```

### Multiple Environments

You can create separate Coolify applications for:
- **Production**: `api.memoryhub.com`
- **Staging**: `api-staging.memoryhub.com`
- **Development**: `api-dev.memoryhub.com`

Each with their own environment variables and domains.

---

## Migration Checklist

- [ ] Install Coolify on your VPS
- [ ] Create new application in Coolify
- [ ] Configure Git repository
- [ ] Add all environment variables
- [ ] Configure domain (`api.memoryhub.com`)
- [ ] Enable SSL
- [ ] Configure health checks
- [ ] Set resource limits
- [ ] Deploy and test
- [ ] Update DNS if needed
- [ ] Test all API endpoints
- [ ] Update cron job URLs (if changed)
- [ ] Update monitoring (Sentry, UptimeRobot)
- [ ] Remove old Docker Compose setup (optional)
- [ ] Archive old deployment scripts

---

## Useful Commands

### Check Coolify Status

```bash
# SSH into your VPS
ssh user@your-vps

# Check Coolify containers
docker ps | grep coolify

# Check Coolify logs
docker logs coolify-proxy
```

### Application Management

All management is done through Coolify UI:
- **Deploy**: Click "Deploy"
- **Restart**: Click "Restart"
- **Rollback**: Select previous deployment → "Rollback"
- **Logs**: Click "Logs"
- **Environment**: Click "Environment"

---

## Getting Help

### Coolify Resources

- **Docs**: https://coolify.io/docs
- **Discord**: https://coolify.io/discord
- **GitHub**: https://github.com/coollabsio/coolify

### MemoryHub Issues

- Check application logs in Coolify
- Review Sentry errors
- Test database connection
- Verify environment variables

---

## Summary

**What you're getting with Coolify:**

1. ✅ **Easier deployments** - No more manual scripts
2. ✅ **Better monitoring** - Built-in dashboards
3. ✅ **Automatic SSL** - Let's Encrypt integration
4. ✅ **Zero-downtime deployments** - Rolling updates
5. ✅ **One-click rollbacks** - Safe deployments
6. ✅ **Git integration** - Auto-deploy on push
7. ✅ **Resource monitoring** - CPU, memory, network
8. ✅ **Log management** - Centralized logs

**What stays the same:**

- Your Dockerfile
- Your environment variables
- Your database (NeonDB)
- Your external services
- Your VPS

**Next steps:**

1. Follow this guide to set up Coolify
2. Deploy your backend
3. Test thoroughly
4. Archive your old deployment scripts
5. Enjoy simpler deployments! 🚀
