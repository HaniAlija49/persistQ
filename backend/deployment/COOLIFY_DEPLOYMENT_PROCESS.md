# Coolify Deployment Process - Complete Guide

This document details the **actual deployment process** we followed to deploy the MemoryHub/PersistQ backend to Coolify on a VPS.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Creating the Application](#creating-the-application)
4. [Configuration](#configuration)
5. [Common Issues & Solutions](#common-issues--solutions)
6. [Verification](#verification)
7. [Ongoing Operations](#ongoing-operations)

---

## Prerequisites

Before starting, ensure you have:

- ✅ VPS with Docker installed (Ubuntu recommended)
- ✅ Coolify installed and running on your VPS
- ✅ Domain name pointing to your VPS IP (e.g., `api.persistq.com`)
- ✅ Git repository with your backend code
- ✅ All environment variables ready (from `.env.production.example`)

---

## Initial Setup

### 1. DNS Configuration

Point your domain to your VPS:

```dns
Type: A
Name: api
Value: YOUR_VPS_IP
TTL: 3600
```

**Verify DNS propagation:**
```bash
nslookup api.persistq.com
# Should return your VPS IP
```

### 2. Access Coolify Dashboard

Open Coolify in your browser:
```
http://YOUR_VPS_IP:8000
```

Or if you configured a domain for Coolify:
```
https://coolify.yourdomain.com
```

---

## Creating the Application

### Step 1: Create New Resource

1. Click **"New Resource"** → **"Application"**
2. Select **Git source** (GitHub, GitLab, etc.)
3. Connect your repository

### Step 2: Basic Configuration

**General Settings:**
- **Name:** `persistQ` (or your preferred name)
- **Description:** `MemoryHub Backend API` (optional)
- **Build Pack:** Select **"Dockerfile"**

### Step 3: Git Configuration

- **Repository URL:** Your Git repo URL
- **Branch:** `master` or `main`
- **Base Directory:** `/backend` (since backend is in a subdirectory)

### Step 4: Build Settings

- **Dockerfile Location:** `/Dockerfile` (relative to base directory)
- **Docker Build Stage Target:** Leave empty
- **Custom Docker Options:** Leave empty (remove any default values)
- **Use a Build Server:** Leave unchecked

### Step 5: Network Configuration

**Ports:**
- **Ports Exposes:** `3000`
- **Ports Mappings:** Leave **EMPTY** (Coolify handles this)

**Important:** Do NOT add port mappings like `3000:3000`. Coolify's Traefik proxy handles port mapping automatically.

### Step 6: Domain Configuration

**Add your domain:**
- **Domains:** `api.persistq.com`
- **Direction:** "Allow www & non-www" (or "Redirect to non-www" based on preference)

**SSL Certificate:**
- SSL is **automatic** via Let's Encrypt
- No checkbox needed - Coolify handles it

---

## Configuration

### Environment Variables

Go to **Environment Variables** tab and add all required variables:

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
NEXT_PUBLIC_APP_URL=https://api.persistq.com

# Rate Limiting (Upstash Redis) - Optional
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Error Tracking - Optional
SENTRY_DSN=your-sentry-dsn
HIGHLIGHT_PROJECT_ID=your-highlight-project-id

# System (auto-configured)
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### Container Labels (CRITICAL!)

Go to **Container Labels** section and add:

**⚠️ IMPORTANT:** Labels must have **NO LEADING SPACES**. This is critical!

**Correct format:**
```
traefik.enable=true
traefik.http.middlewares.gzip.compress=true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
traefik.http.routers.http-0-s4sswogs4scoosooo848gk4w.entryPoints=http
traefik.http.routers.http-0-s4sswogs4scoosooo848gk4w.middlewares=redirect-to-https,gzip
traefik.http.routers.http-0-s4sswogs4scoosooo848gk4w.rule=Host(`api.persistq.com`)
traefik.http.routers.http-0-s4sswogs4scoosooo848gk4w.service=http-0-s4sswogs4scoosooo848gk4w
traefik.http.routers.https-0-s4sswogs4scoosooo848gk4w.entryPoints=https
traefik.http.routers.https-0-s4sswogs4scoosooo848gk4w.middlewares=gzip
traefik.http.routers.https-0-s4sswogs4scoosooo848gk4w.rule=Host(`api.persistq.com`)
traefik.http.routers.https-0-s4sswogs4scoosooo848gk4w.service=http-0-s4sswogs4scoosooo848gk4w
traefik.http.routers.https-0-s4sswogs4scoosooo848gk4w.tls=true
traefik.http.routers.https-0-s4sswogs4scoosooo848gk4w.tls.certresolver=letsencrypt
traefik.http.services.http-0-s4sswogs4scoosooo848gk4w.loadbalancer.server.port=3000
```

**❌ WRONG format (will break SSL):**
```
  traefik.enable=true
  traefik.http.middlewares.gzip.compress=true
```

**Note:** Replace `s4sswogs4scoosooo848gk4w` with your actual application ID, and `api.persistq.com` with your domain.

### Resource Limits (Optional)

For a budget VPS, set resource limits:

- **Memory Limit:** `1024MB`
- **Memory Reservation:** `512MB`
- **CPU Limit:** `1.5`
- **CPU Reservation:** `0.5`

### Persistent Storage (Optional)

To persist ML model cache:

- **Host Path:** `/var/coolify/volumes/persistq-cache`
- **Container Path:** `/app/.cache`
- **Description:** ML model cache

---

## Common Issues & Solutions

### Issue 1: SSL Certificate Not Working

**Symptoms:**
- Browser shows "Your connection is not private"
- Error: `ERR_CERT_AUTHORITY_INVALID`

**Cause:** Leading spaces in container labels

**Solution:**
1. Go to **Container Labels**
2. Remove ALL leading spaces from labels
3. Labels should start with `traefik.`, NOT `  traefik.`
4. Save and redeploy

**Verify the fix:**
```bash
# SSH into VPS
docker inspect <container-name> | grep -i "traefik.http.routers"

# Should NOT show leading spaces in label keys
```

---

### Issue 2: 404 Not Found

**Symptoms:**
- `curl http://api.persistq.com` returns 404
- App is running but not accessible

**Causes:**
1. Leading spaces in labels (most common)
2. Wrong router rule
3. Container not on `coolify` network

**Solution:**
```bash
# Check if container is on coolify network
docker inspect <container-name> | grep -A 10 "Networks"

# Should show "coolify" network

# Check if Traefik can reach container
docker exec coolify-proxy wget -qO- "http://<container-name>:3000"

# Should return HTML
```

---

### Issue 3: Build Fails - TailwindCSS Error

**Symptoms:**
```
Error: Cannot find module '@tailwindcss/postcss'
```

**Cause:** TailwindCSS in `devDependencies` but needed at build time

**Solution:**
Move `@tailwindcss/postcss` and `tailwindcss` to `dependencies` in `package.json`

**Why:** Docker build with `NODE_ENV=production` skips `devDependencies`

---

### Issue 4: ACME Challenge Fails

**Symptoms:**
```
Cannot retrieve the ACME challenge for api.persistq.com
```

**Causes:**
1. DNS not propagated yet
2. Port 80 not accessible
3. Router labels incorrect

**Solution:**
```bash
# 1. Verify DNS
nslookup api.persistq.com

# 2. Test HTTP access
curl -I http://api.persistq.com

# Should NOT be "Connection refused"

# 3. Check Traefik logs
docker logs coolify-proxy --tail 50 | grep -i "acme\|certificate"

# 4. Wait 2-5 minutes after fixing, then check acme.json
cat /data/coolify/proxy/acme.json

# Should contain certificate data (not empty)
```

---

### Issue 5: Old Containers Causing Conflicts

**Symptoms:**
```
Router defined multiple times with different configurations
```

**Solution:**
```bash
# Remove all stopped containers
docker container prune -f

# Restart Traefik
docker restart coolify-proxy

# Redeploy application in Coolify
```

---

## Verification

### 1. Check Deployment Status

In **Coolify Dashboard:**
- Go to your application
- Check **Deployments** tab
- Latest deployment should show "Success" ✅

### 2. Verify Container is Running

```bash
# SSH into VPS
ssh root@YOUR_VPS_IP

# Check running containers
docker ps

# Should see your app container running
```

### 3. Test HTTP → HTTPS Redirect

```bash
# Should redirect to HTTPS
curl -I http://api.persistq.com

# Should show "301 Moved Permanently" or "308 Permanent Redirect"
```

### 4. Test HTTPS with Valid Certificate

```bash
# Should show valid Let's Encrypt certificate
curl -Iv https://api.persistq.com 2>&1 | grep -i "subject\|issuer"

# OR visit in browser (should show lock icon 🔒)
```

### 5. Test API Endpoints

```bash
# Test health endpoint
curl https://api.persistq.com/api/status

# Should return JSON with status: "healthy"

# Test homepage
curl https://api.persistq.com

# Should return HTML
```

### 6. Verify SSL Certificate

```bash
# Check certificate in acme.json
cat /data/coolify/proxy/acme.json | grep -i "api.persistq.com"

# Should show certificate data

# Or use openssl
openssl s_client -connect api.persistq.com:443 -servername api.persistq.com < /dev/null 2>/dev/null | grep -i "subject\|issuer"

# Should show "Let's Encrypt" as issuer
```

---

## Ongoing Operations

### Deploy Updates

**Option 1: Manual Deploy (Coolify UI)**
1. Push code to Git repository
2. Open Coolify dashboard
3. Go to your application
4. Click **"Deploy"** button
5. Monitor build logs in real-time

**Option 2: Auto-Deploy on Git Push**
1. Enable **"Auto Deploy"** in Coolify
2. Select branch (e.g., `master`)
3. Push to Git → Coolify automatically deploys

### View Logs

**Real-time logs:**
```bash
# In Coolify UI:
Dashboard → Your App → Logs → Real-time

# Or via SSH:
docker logs -f <container-name>
```

**Search logs:**
```bash
docker logs <container-name> | grep -i "error"
```

### Restart Application

**In Coolify UI:**
```
Dashboard → Your App → Actions → Restart
```

**Via SSH:**
```bash
docker restart <container-name>
```

### Rollback to Previous Version

**In Coolify UI:**
1. Go to **Deployments** tab
2. Find previous successful deployment
3. Click **"Rollback"** button
4. Confirm

**Effect:** Instantly switches to previous version (zero-downtime)

### Update Environment Variables

1. **Go to** Environment Variables tab
2. **Edit** the variable
3. **Save**
4. **Restart** the application (required for changes to take effect)

### Check Resource Usage

**In Coolify UI:**
```
Dashboard → Your App → Metrics
```

**Via SSH:**
```bash
# Check container resources
docker stats <container-name>

# Check VPS resources
htop
free -h
df -h
```

---

## Debugging Commands

### Container Inspection

```bash
# Get container name
docker ps | grep persistq

# View all container details
docker inspect <container-name>

# Check container labels
docker inspect <container-name> | grep -i traefik

# Check container network
docker inspect <container-name> | grep -A 10 "Networks"

# Check container logs (last 100 lines)
docker logs <container-name> --tail 100

# Follow logs in real-time
docker logs -f <container-name>
```

### Traefik Debugging

```bash
# Check Traefik logs
docker logs coolify-proxy --tail 100

# Check for errors
docker logs coolify-proxy | grep -i "error"

# Check for ACME/certificate issues
docker logs coolify-proxy | grep -i "acme\|certificate"

# Check SSL certificate storage
cat /data/coolify/proxy/acme.json

# Check Traefik configuration
cat /data/coolify/proxy/docker-compose.yml
```

### Network Testing

```bash
# Test from VPS to container
curl -I http://localhost:3000

# Test from Traefik to container
docker exec coolify-proxy wget -qO- "http://<container-name>:3000"

# Test from outside
curl -I http://api.persistq.com
curl -I https://api.persistq.com

# Test DNS
nslookup api.persistq.com
dig api.persistq.com
```

### Health Checks

```bash
# Check container health status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Test health endpoint
curl https://api.persistq.com/api/status

# Check if all Coolify services are healthy
docker ps | grep coolify
```

---

## Architecture Overview

### Running Containers

After deployment, you'll have these containers:

```
1. s4sswogs4scoosooo848gk4w-xxxxx    → Your PersistQ backend
2. coolify-proxy                     → Traefik reverse proxy (SSL, routing)
3. coolify                           → Coolify control panel
4. coolify-db                        → PostgreSQL (Coolify database)
5. coolify-redis                     → Redis (Coolify cache/queue)
6. coolify-sentinel                  → Container monitoring
7. coolify-realtime                  → WebSocket server (live updates)
```

### Network Flow

```
Internet
   ↓
DNS (api.persistq.com → VPS_IP)
   ↓
Port 443 (HTTPS)
   ↓
coolify-proxy (Traefik)
   ├→ SSL termination (Let's Encrypt)
   ├→ Route based on Host header
   └→ Forward to backend:3000
      ↓
Your PersistQ Backend Container
```

### Resource Usage

**Typical RAM usage on 4GB VPS:**
- Coolify infrastructure: ~500-800MB
- Your backend: ~500MB-1GB
- **Total:** ~1-1.8GB (leaves 2-3GB free)

---

## Best Practices

### 1. Always Use Git Branches

- **Production:** Deploy from `master` or `main`
- **Staging:** Use `staging` branch for testing
- **Development:** Use `dev` branch

### 2. Test Before Deploying

```bash
# Build locally first
docker build -t test-backend -f backend/Dockerfile backend/

# Test the build
docker run -p 3000:3000 --env-file backend/.env.production test-backend
```

### 3. Monitor Logs After Deployment

```bash
# Watch logs for 2 minutes after deploy
docker logs -f <container-name>

# Look for errors or warnings
```

### 4. Keep Environment Variables Secure

- ✅ Use Coolify's encrypted environment variables
- ❌ Never commit `.env.production` to Git
- ✅ Rotate secrets regularly (CRON_SECRET, API keys)

### 5. Set Up External Monitoring

- **UptimeRobot:** Monitor `https://api.persistq.com/api/status`
- **Sentry:** Application error tracking
- **Logs:** Review weekly for issues

---

## Troubleshooting Checklist

When deployment fails, check in this order:

- [ ] DNS is pointing to correct IP (`nslookup api.persistq.com`)
- [ ] Dockerfile builds successfully locally
- [ ] All environment variables are set
- [ ] Container labels have NO leading spaces
- [ ] Ports Exposes is set to `3000`, Ports Mappings is EMPTY
- [ ] Container is running (`docker ps`)
- [ ] Container is on `coolify` network
- [ ] Traefik can reach container internally
- [ ] No old stopped containers causing conflicts (`docker container prune -f`)
- [ ] Traefik logs show no errors (`docker logs coolify-proxy`)
- [ ] SSL certificate generated in acme.json

---

## Getting Help

### Check Logs First

```bash
# Application logs
docker logs <container-name> --tail 100

# Traefik logs
docker logs coolify-proxy --tail 100

# Coolify logs
docker logs coolify --tail 100
```

### Coolify Resources

- **Docs:** https://coolify.io/docs
- **Discord:** https://coolify.io/discord
- **GitHub:** https://github.com/coollabsio/coolify

### Common Error Messages

**"Cannot retrieve the ACME challenge"**
- Check DNS propagation
- Verify port 80 is accessible
- Wait 2-5 minutes and try again

**"404 Not Found"**
- Check container labels for leading spaces
- Verify router rule has correct domain

**"Connection refused"**
- Container not running or not on coolify network
- Check with `docker ps` and `docker network inspect coolify`

---

## Summary

**What We Deployed:**
- ✅ Next.js backend on Coolify
- ✅ Automatic SSL via Let's Encrypt
- ✅ Traefik reverse proxy
- ✅ Docker containerization
- ✅ Git-based deployments

**Key Lessons Learned:**
1. ⚠️ **Container labels must have NO leading spaces** (most critical!)
2. TailwindCSS must be in `dependencies` for Docker builds
3. Port mappings should be empty - Coolify handles this
4. DNS must propagate before SSL works
5. Always test Traefik → container connectivity

**Deployment Time:**
- First deployment: ~5-10 minutes (including SSL)
- Subsequent deployments: ~2-5 minutes

---

## Next Steps

After successful deployment:

1. ✅ Set up monitoring (UptimeRobot, Sentry)
2. ✅ Configure auto-deploy on Git push (optional)
3. ✅ Enable firewall (`ufw`) on VPS
4. ✅ Set up database backups (if using hosted DB)
5. ✅ Document your environment variables securely
6. ✅ Test rollback procedure
7. ✅ Set up cron jobs for cleanup tasks

---

**Deployment Status:** ✅ **SUCCESSFUL**

**Live URL:** https://api.persistq.com

**Deployed:** 2026-01-13

**Deployed By:** Claude Sonnet 4.5 + User
