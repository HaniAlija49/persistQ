# MemoryHub Backend - VPS Deployment

Complete production deployment infrastructure for MemoryHub backend with Docker, Caddy reverse proxy, and automated deployments.

## 🎯 Quick Overview

This folder contains everything needed to deploy MemoryHub backend to a VPS with:
- ✅ Automatic HTTPS (Let's Encrypt via Caddy)
- ✅ Zero-downtime deployments
- ✅ Health checks and automatic rollback
- ✅ Multi-layer security (firewall, SSH hardening, rate limiting)
- ✅ Docker containerization with resource limits
- ✅ Automated setup scripts
- ✅ Complete documentation

**Cost**: **$3.50-5/month** (minimum viable) vs Render at $7+/month
**Uptime**: 24/7 guaranteed

---

## 💰 Cost-Optimized VPS Options

### Budget Option (Minimum Viable - $3.50/month)
- **Hetzner CAX11** (ARM): 2GB RAM, 2 vCPU @ **€3.29/month (~$3.50)**
- **Contabo VPS S**: 4GB RAM, 4 vCPU @ **€4.50/month (~$4.75)**

### Recommended (Best Value - $5/month)
- **Hetzner CX21** (x86): 4GB RAM, 2 vCPU @ **$5.45/month**
- **OVH VPS Starter**: 2GB RAM, 1 vCPU @ **€3.50/month (~$3.70)**

### Performance Requirements
Your backend needs:
- **RAM**: 1.5GB minimum (1GB Node.js + 500MB ML model)
- **CPU**: 2 vCPU minimum (embedding model is CPU-intensive)
- **Storage**: 15GB minimum
- **Network**: 50 Mbps+

**💡 Recommendation**: Start with **Hetzner CAX11** ($3.50/month) and upgrade only if needed.

---

## 📁 Files in This Directory

### Core Infrastructure
- **`docker-compose.yml`** - Container orchestration (backend + Caddy)
- **`Caddyfile`** - Reverse proxy with automatic HTTPS and security headers
- **`.env.production.example`** - Production environment template (copy to `.env.production`)

### Automation Scripts
- **`deploy.sh`** - Zero-downtime deployment with health checks (⭐ main deployment script)
- **`setup-vps.sh`** - One-click VPS initialization and security setup
- **`ssh-hardening.sh`** - SSH security hardening

### Documentation
- **`VPS_SETUP_GUIDE.md`** - Complete step-by-step VPS setup guide (⭐ start here)
- **`DEPLOYMENT_GUIDE.md`** - Ongoing deployment and troubleshooting
- **`cron-config.json`** - External cron service configuration reference

---

## 🚀 Quick Start (30 minutes total)

### 1. Prerequisites
- VPS with Ubuntu 22.04 LTS (2GB RAM minimum)
- Domain name pointed to VPS IP
- SSH access
- Git repository access

### 2. Setup VPS (10 minutes)
```bash
# On VPS as root
scp setup-vps.sh root@YOUR_VPS_IP:/root/
ssh root@YOUR_VPS_IP
chmod +x setup-vps.sh
sudo bash setup-vps.sh
```

### 3. Clone and Configure (5 minutes)
```bash
# SSH as memoryhub user (port 2222)
ssh -p 2222 memoryhub@YOUR_VPS_IP

# Clone repository
git clone https://github.com/YOUR_USERNAME/MemoryHub-Monorepo.git memoryhub
cd memoryhub/backend/deployment

# Configure environment
cp .env.production.example .env.production
nano .env.production  # Fill in your actual values
chmod 600 .env.production

# Update Caddyfile with your domain
nano Caddyfile  # Change api.memoryhub.com to your domain
```

### 4. Deploy (5 minutes)
```bash
chmod +x deploy.sh
./deploy.sh
```

### 5. Configure Cron Jobs (5 minutes)
- Sign up at [cron-job.org](https://cron-job.org) - **FREE**
- Create 3 jobs (see `cron-config.json`)
- Use your `CRON_SECRET` for authentication

### 6. Setup Monitoring (5 minutes)
- Add health check to [UptimeRobot](https://uptimerobot.com) - **FREE**: `https://api.yourdomain.com/api/status`

**Total Setup Time: ~30 minutes**

---

## 📖 Detailed Guides

### For First-Time Setup
👉 **Start with `VPS_SETUP_GUIDE.md`** - Complete walkthrough for VPS setup

### For Ongoing Deployments
👉 **Use `DEPLOYMENT_GUIDE.md`** - Day-to-day deployment and troubleshooting

### For Cron Configuration
👉 **Reference `cron-config.json`** - External cron service setup

---

## 🔧 Common Commands

```bash
# Deploy latest version
./deploy.sh

# View logs
./deploy.sh logs
# or
docker compose logs -f backend

# Rollback
./deploy.sh rollback

# Restart services
docker compose restart

# Check status
docker ps
curl http://localhost:3000/api/status

# Update configuration
nano .env.production
docker compose down && docker compose up -d
```

---

## 🔒 Security Features

### Multi-Layer Protection
1. **Network**: UFW firewall (ports 2222, 80, 443 only)
2. **SSH**: Key-only auth, non-standard port, fail2ban
3. **Docker**: Non-root containers, resource limits
4. **Proxy**: Caddy with security headers (HSTS, CSP, etc.)
5. **Application**: CRON_SECRET auth, Upstash rate limiting
6. **External**: Clerk authentication, input validation

### Secrets Management
- `.env.production` with 600 permissions
- Never committed to git (in `.gitignore`)
- Strong `CRON_SECRET` (generated with `openssl rand -base64 32`)
- All external services use API keys

---

## 🏗️ Architecture

```
Internet (HTTPS/443)
    ↓
Caddy Reverse Proxy (Container)
    ├─ Automatic HTTPS (Let's Encrypt)
    ├─ Security headers
    └─ Health checks
    ↓
Backend API (Container)
    ├─ Next.js 16.0.7
    ├─ Port 3000 (internal)
    ├─ ML Model (all-MiniLM-L6-v2)
    └─ Health endpoint: /api/status
    ↓
External Services (Unchanged)
    ├─ NeonDB (PostgreSQL + pgvector)
    ├─ Clerk (Authentication)
    ├─ Upstash Redis (Rate limiting)
    ├─ Dodo Payments (Billing)
    ├─ Sentry (Error tracking)
    └─ Highlight.io (APM)

Cron Jobs (External - cron-job.org - FREE)
    ├─ /api/warm (every 5 minutes)
    ├─ /api/cron/cleanup-webhooks (daily)
    └─ /api/cron/expire-subscriptions (daily)
```

---

## 💸 Total Cost Breakdown (Optimized for Budget)

### VPS Hosting
| Provider | Plan | RAM | vCPU | Storage | Cost/mo | Performance |
|----------|------|-----|------|---------|---------|-------------|
| **Hetzner CAX11** ⭐ | ARM | 2GB | 2 | 20GB | **$3.50** | Good |
| Contabo VPS S | x86 | 4GB | 4 | 200GB | **$4.75** | Better |
| Hetzner CX21 | x86 | 4GB | 2 | 40GB | **$5.45** | Best |
| OVH VPS Starter | x86 | 2GB | 1 | 20GB | **$3.70** | OK |

**💡 Recommended**: **Hetzner CAX11** @ **$3.50/month** (ARM-based, efficient for your workload)

### External Services (All FREE tiers)
| Service | Purpose | Free Tier | Cost |
|---------|---------|-----------|------|
| NeonDB | PostgreSQL + pgvector | 512MB storage, 10GB transfer | **$0** |
| Clerk | Authentication | 10,000 MAU | **$0** |
| Upstash Redis | Rate limiting | 10,000 commands/day | **$0** |
| Dodo Payments | Billing | Transaction fees only | **$0** |
| Sentry | Error tracking | 5,000 events/month | **$0** |
| Highlight.io | APM | 500 sessions/month | **$0** |
| cron-job.org | Cron jobs | 3 jobs | **$0** |
| UptimeRobot | Uptime monitoring | 50 monitors | **$0** |

### Total Monthly Cost
- **Minimum**: **$3.50/month** (Hetzner CAX11)
- **Recommended**: **$4.75/month** (Contabo VPS S - best value)
- **vs Render**: **$7+/month** (limited uptime on free tier)

**💰 Savings: ~50% vs Render while getting 24/7 uptime!**

---

## 📊 Resource Optimization for Budget VPS

### docker-compose.yml Resource Limits
The included config limits resources to fit 2GB RAM VPS:
- Backend: 1GB max, 512MB reserved
- Caddy: ~50MB
- System: ~200MB
- ML Model: ~500MB (lazy loaded)
- **Total: ~1.75GB** (fits comfortably in 2GB)

### Performance Tips for Budget VPS
1. **Swap**: Setup script creates 2GB swap for memory spikes
2. **Model Caching**: Volume mount persists ML model (no re-download)
3. **Log Rotation**: Automatic cleanup prevents disk bloat
4. **Resource Limits**: Prevents memory exhaustion

---

## 🌍 External Services (No Changes Required)

All external services remain unchanged from Render deployment:

| Service | Purpose | Cost | Status |
|---------|---------|------|--------|
| NeonDB | PostgreSQL + pgvector | Free tier | ✅ Works as-is |
| Clerk | Authentication | Free tier | ✅ Works as-is |
| Upstash Redis | Rate limiting | Free tier | ✅ Works as-is |
| Dodo Payments | Billing | Transaction fees | ⚠️ Change to `DODO_MODE=live` |
| Sentry | Error tracking | Free tier | ✅ Works as-is |
| Highlight.io | APM | Free tier | ✅ Works as-is |

**Only change needed**: Set `DODO_MODE=live` in `.env.production`

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] VPS provisioned (Ubuntu 22.04, 2GB+ RAM)
- [ ] Domain DNS configured (A record → VPS IP)
- [ ] `setup-vps.sh` run successfully
- [ ] Repository cloned to `/home/memoryhub/memoryhub`
- [ ] `.env.production` created from example
- [ ] All required environment variables filled
- [ ] `CRON_SECRET` generated (`openssl rand -base64 32`)
- [ ] `DODO_MODE` set to `live` (not `test`)
- [ ] Caddyfile updated with actual domain
- [ ] `deploy.sh` made executable
- [ ] First deployment successful (`./deploy.sh`)
- [ ] Health check passing (`curl http://localhost:3000/api/status`)
- [ ] HTTPS working (`curl https://api.yourdomain.com/api/status`)
- [ ] Cron jobs configured at cron-job.org
- [ ] All 3 cron endpoints tested manually
- [ ] UptimeRobot monitoring configured
- [ ] Frontend updated to point to new API URL

---

## 🔍 Testing Endpoints

### Health Check
```bash
curl http://localhost:3000/api/status
curl https://api.yourdomain.com/api/status
```

### Cron Endpoints (requires CRON_SECRET)
```bash
# Model warming
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://api.yourdomain.com/api/warm

# Cleanup webhooks
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://api.yourdomain.com/api/cron/cleanup-webhooks

# Expire subscriptions
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://api.yourdomain.com/api/cron/expire-subscriptions
```

Expected response: `{"status":"success",...}` or similar

---

## 🚨 Troubleshooting

### Deployment Fails
1. Check logs: `docker compose logs backend --tail=100`
2. Verify `.env.production` exists and has all variables
3. Check health: `curl http://localhost:3000/api/status`
4. See `DEPLOYMENT_GUIDE.md` for detailed troubleshooting

### SSL Certificate Not Issuing
1. Verify DNS: `nslookup api.yourdomain.com`
2. Check Caddy logs: `docker compose logs caddy`
3. Ensure ports 80/443 open: `sudo ufw status`

### Container Won't Start
1. Check Docker: `docker ps -a`
2. View logs: `docker compose logs backend`
3. Validate config: `docker compose config`

### Out of Memory (Budget VPS)
1. Check usage: `free -h`
2. Verify swap is active: `swapon --show`
3. Restart services: `docker compose restart`
4. Consider upgrading to 4GB VPS if persistent

---

## 📈 Monitoring (All FREE)

### Built-in Monitoring
- **Health endpoint**: `/api/status`
- **Docker logs**: Automatic rotation (10MB x 3 files)
- **Caddy logs**: JSON format, 30 days retention

### External Monitoring (FREE)
- **UptimeRobot**: Uptime monitoring (50 monitors free)
- **cron-job.org**: Cron execution monitoring (3 jobs free)
- **Sentry**: Application errors (5k events/mo free)
- **Highlight.io**: APM and traces (500 sessions/mo free)

**Total monitoring cost: $0/month**

---

## 🔄 Deployment Workflow

### Standard Deployment
```bash
./deploy.sh
```

What happens:
1. ✅ Validates environment variables
2. ✅ Pulls latest code from git
3. ✅ Builds new Docker image
4. ✅ Starts new container (old still running)
5. ✅ Waits for health checks (30 attempts × 2s)
6. ✅ Routes traffic to new backend
7. ✅ Cleans up old images

### Automatic Rollback
If health checks fail, deployment automatically rolls back to previous version.

### Manual Rollback
```bash
./deploy.sh rollback
```

---

## 💡 Cost-Saving Tips

### VPS Selection
- **Start small**: 2GB RAM is sufficient for most workloads
- **ARM is cheaper**: Hetzner CAX11 (ARM) @ $3.50 vs CX21 (x86) @ $5.45
- **Annual billing**: Save 10-20% with annual payment
- **Europe locations**: Often cheaper than US (Hetzner, OVH)

### External Services
- **All on free tiers**: NeonDB, Clerk, Upstash, Sentry, Highlight.io
- **No paid tools needed**: cron-job.org and UptimeRobot are free
- **Monitor limits**: Set alerts before hitting free tier limits

### Resource Optimization
- **Swap space**: 2GB swap adds virtual memory (free)
- **Log rotation**: Prevents disk usage bloat (configured)
- **Model caching**: Avoids re-downloading ML model (configured)
- **Resource limits**: Prevents runaway processes (configured)

---

## 🎉 Migration from Render

### Zero-Downtime Migration
1. Setup VPS (Render still serving traffic)
2. Deploy to VPS internally
3. Update DNS to VPS IP
4. Monitor for 48 hours
5. Keep Render as dev environment

### Cost Comparison
| Aspect | Render | VPS (Budget) | Savings |
|--------|--------|--------------|---------|
| Cost | $7+/month | $3.50/month | **50%** |
| Uptime | Auto-sleep (free) | 24/7 | - |
| Control | Limited | Full | - |
| External Services | Same | Same | - |

---

## 📝 What's New vs Render

| Aspect | Render | VPS (New) |
|--------|--------|-----------|
| Uptime | Auto-sleep on free tier | 24/7 guaranteed |
| Cost | $7+/month | **$3.50-5/month** |
| HTTPS | Automatic | Automatic (Caddy) |
| Deployments | Git push | `./deploy.sh` |
| Cron Jobs | Render Cron (paid) | External (FREE) |
| Logs | Dashboard | Docker + Sentry |
| Control | Limited | Full control |
| Scaling | Automatic | Manual/scripted |

---

## 🔮 When to Upgrade

Start with budget VPS and upgrade when:
- Memory consistently >85% (`free -h`)
- CPU consistently >80% (`htop`)
- Response times increase noticeably
- Traffic grows significantly

**Typical upgrade path**:
1. Start: Hetzner CAX11 @ $3.50/month (2GB RAM)
2. Grow: Contabo VPS S @ $4.75/month (4GB RAM)
3. Scale: Hetzner CX31 @ $10/month (8GB RAM)

---

**Ready to deploy? Start with `VPS_SETUP_GUIDE.md`!** 🚀

**Budget Recommendation**: Hetzner CAX11 @ **$3.50/month** - best price/performance ratio for this workload.