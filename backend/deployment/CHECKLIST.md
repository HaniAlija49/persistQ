# VPS Deployment Checklist

Complete checklist for deploying MemoryHub backend to VPS.

## 📋 Pre-Deployment (Before touching VPS)

### Budget Planning
- [ ] Decided on VPS provider (recommended: Hetzner CAX11 @ $3.50/month)
- [ ] Understand monthly costs: $3.50 VPS + $0 external services = **$3.50 total**
- [ ] Backup plan if costs increase (upgrade path documented)

### Domain & DNS
- [ ] Domain name registered
- [ ] DNS A record created: `api.yourdomain.com` → VPS IP
- [ ] DNS A record created: `yourdomain.com` → Frontend host (if applicable)
- [ ] TTL set to 300 (5 minutes) for quick rollback if needed

### Credentials & Secrets
- [ ] CRON_SECRET generated: `openssl rand -base64 32`
- [ ] All environment variables documented:
  - [ ] MEMORYHUB_DATABASE_URL (from NeonDB)
  - [ ] CLERK_SECRET_KEY (from Clerk)
  - [ ] CLERK_WEBHOOK_SECRET (from Clerk)
  - [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from Clerk)
  - [ ] DODO_API_KEY (from Dodo Payments)
  - [ ] DODO_WEBHOOK_SECRET (from Dodo Payments)
  - [ ] UPSTASH_REDIS_REST_URL (from Upstash)
  - [ ] UPSTASH_REDIS_REST_TOKEN (from Upstash)
  - [ ] SENTRY_DSN (from Sentry - optional)
  - [ ] HIGHLIGHT_PROJECT_ID (from Highlight.io - optional)
- [ ] Secrets backed up in password manager (1Password, Bitwarden, etc.)

### VPS Account
- [ ] VPS account created (Hetzner, Contabo, OVH, etc.)
- [ ] Payment method added
- [ ] SSH key pair generated (if not already)
- [ ] Public key ready to add to VPS

---

## 🖥️ VPS Provisioning

### Create VPS Instance
- [ ] VPS created with specifications:
  - [ ] OS: Ubuntu 22.04 LTS
  - [ ] RAM: 2GB minimum (4GB recommended)
  - [ ] CPU: 2 vCPU minimum
  - [ ] Storage: 20GB minimum
  - [ ] Location: Closest to your users
- [ ] VPS IP address noted: `_________________`
- [ ] Root password or SSH key configured
- [ ] Initial SSH access verified: `ssh root@VPS_IP`

### DNS Update
- [ ] DNS A record updated with VPS IP
- [ ] DNS propagation verified: `nslookup api.yourdomain.com`
  - Should return your VPS IP
- [ ] Wait 5-10 minutes if propagation incomplete

---

## 🔧 VPS Initial Setup

### Upload Setup Script
- [ ] Script uploaded: `scp backend/deployment/setup-vps.sh root@VPS_IP:/root/`
- [ ] Script made executable: `chmod +x /root/setup-vps.sh`

### Run Setup Script
- [ ] Logged in as root: `ssh root@VPS_IP`
- [ ] Setup script run: `sudo bash /root/setup-vps.sh`
- [ ] Script completed successfully (no errors)
- [ ] Setup included:
  - [ ] Docker installed
  - [ ] Docker Compose installed
  - [ ] User `memoryhub` created
  - [ ] UFW firewall configured (ports 2222, 80, 443)
  - [ ] fail2ban installed and configured
  - [ ] 2GB swap created
  - [ ] Automatic security updates enabled

### Test New SSH Configuration
**⚠️ CRITICAL: Do NOT close root session until this works!**

- [ ] New SSH port tested from another terminal:
  ```bash
  ssh -p 2222 memoryhub@VPS_IP
  ```
- [ ] SSH connection successful
- [ ] SSH keys work (no password prompt)

### Optional: SSH Hardening
- [ ] SSH hardening script uploaded: `scp ssh-hardening.sh root@VPS_IP:/root/`
- [ ] Script run: `sudo bash /root/ssh-hardening.sh`
- [ ] New SSH configuration tested before closing session
- [ ] Root login disabled verified
- [ ] Password authentication disabled verified

---

## 📦 Application Deployment

### Clone Repository
- [ ] Logged in as memoryhub user: `ssh -p 2222 memoryhub@VPS_IP`
- [ ] Repository cloned:
  ```bash
  git clone https://github.com/YOUR_USERNAME/MemoryHub-Monorepo.git memoryhub
  ```
- [ ] Deployment directory accessed: `cd memoryhub/backend/deployment`
- [ ] All deployment files present:
  ```bash
  ls -la
  # Should show: docker-compose.yml, Caddyfile, deploy.sh, etc.
  ```

### Configure Environment
- [ ] Environment file created: `cp .env.production.example .env.production`
- [ ] All environment variables filled in `.env.production`:
  - [ ] MEMORYHUB_DATABASE_URL
  - [ ] CLERK_SECRET_KEY
  - [ ] CLERK_WEBHOOK_SECRET
  - [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  - [ ] CRON_SECRET (generated earlier)
  - [ ] DODO_API_KEY
  - [ ] DODO_WEBHOOK_SECRET
  - [ ] DODO_MODE=**live** (not "test"!)
  - [ ] NEXT_PUBLIC_APP_URL=https://api.yourdomain.com
  - [ ] UPSTASH_REDIS_REST_URL
  - [ ] UPSTASH_REDIS_REST_TOKEN
  - [ ] ALLOWED_ORIGINS (if frontend needs direct API access)
  - [ ] SENTRY_DSN (optional)
  - [ ] HIGHLIGHT_PROJECT_ID (optional)
- [ ] File permissions set: `chmod 600 .env.production`
- [ ] File ownership verified: `ls -la .env.production` (should be memoryhub:memoryhub)

### Configure Caddyfile
- [ ] Caddyfile edited: `nano Caddyfile`
- [ ] Domain updated: `api.memoryhub.com` → `api.yourdomain.com`
- [ ] Email updated for Let's Encrypt notifications
- [ ] Both HTTP and HTTPS blocks updated
- [ ] File saved

### Make Scripts Executable
- [ ] Deploy script: `chmod +x deploy.sh`
- [ ] Permissions verified: `ls -la deploy.sh` (should show `-rwxr-xr-x`)

---

## 🚀 First Deployment

### Run Deployment
- [ ] First deployment started: `./deploy.sh`
- [ ] Deployment steps observed:
  - [ ] Environment validation passed
  - [ ] Code pulled from git
  - [ ] Docker image built successfully
  - [ ] Backend container started
  - [ ] Health checks passed (may take 30-60 seconds)
  - [ ] Caddy container started
  - [ ] Deployment completed message shown

### Verify Deployment

#### Backend Health (Internal)
- [ ] Health check successful:
  ```bash
  curl http://localhost:3000/api/status
  ```
  Expected: `{"status":"healthy",...}`

#### Backend Containers
- [ ] Containers running:
  ```bash
  docker ps
  ```
  Should show: `memoryhub-backend` and `memoryhub-caddy` both "Up"

#### SSL Certificate (External)
- [ ] HTTPS working from your local machine:
  ```bash
  curl https://api.yourdomain.com/api/status
  ```
  Expected: `{"status":"healthy",...}` with no SSL errors

#### Logs Check
- [ ] No errors in backend logs:
  ```bash
  docker compose logs backend --tail=50
  ```
- [ ] No errors in Caddy logs:
  ```bash
  docker compose logs caddy --tail=50
  ```
- [ ] SSL certificate issued successfully (check Caddy logs for "certificate obtained")

---

## ⏰ Cron Jobs Setup

### cron-job.org Account
- [ ] Account created at https://cron-job.org/en/signup
- [ ] Email verified
- [ ] Logged in to dashboard

### Create Cron Jobs

#### Job 1: Model Warming (Critical)
- [ ] Job created with:
  - Title: `MemoryHub - Model Warming`
  - URL: `https://api.yourdomain.com/api/warm`
  - Schedule: `*/5 * * * *` (every 5 minutes)
  - Method: GET
  - Headers: `Authorization: Bearer YOUR_CRON_SECRET`
  - Enabled: ✅
  - Email notifications on failure: ✅

#### Job 2: Cleanup Webhooks
- [ ] Job created with:
  - Title: `MemoryHub - Cleanup Webhooks`
  - URL: `https://api.yourdomain.com/api/cron/cleanup-webhooks`
  - Schedule: `0 2 * * *` (2 AM daily)
  - Method: GET
  - Headers: `Authorization: Bearer YOUR_CRON_SECRET`
  - Enabled: ✅
  - Email notifications on failure: ✅

#### Job 3: Expire Subscriptions
- [ ] Job created with:
  - Title: `MemoryHub - Expire Subscriptions`
  - URL: `https://api.yourdomain.com/api/cron/expire-subscriptions`
  - Schedule: `0 3 * * *` (3 AM daily)
  - Method: GET
  - Headers: `Authorization: Bearer YOUR_CRON_SECRET`
  - Enabled: ✅
  - Email notifications on failure: ✅

### Test Cron Endpoints
**From your local machine:**

- [ ] Model warming tested:
  ```bash
  curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://api.yourdomain.com/api/warm
  ```
  Expected: `{"status":"warm",...}`

- [ ] Cleanup webhooks tested:
  ```bash
  curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://api.yourdomain.com/api/cron/cleanup-webhooks
  ```
  Expected: `{"success":true,...}`

- [ ] Expire subscriptions tested:
  ```bash
  curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://api.yourdomain.com/api/cron/expire-subscriptions
  ```
  Expected: `{"status":"success",...}`

### Verify Cron Execution
- [ ] Wait 5 minutes for first model warming execution
- [ ] Check execution history in cron-job.org dashboard
- [ ] Verify all jobs show "Success" status
- [ ] Check backend logs for cron execution:
  ```bash
  docker compose logs backend | grep -i cron
  ```

---

## 📊 Monitoring Setup

### UptimeRobot (Free)
- [ ] Account created at https://uptimerobot.com
- [ ] Monitor added:
  - Type: HTTPS
  - URL: `https://api.yourdomain.com/api/status`
  - Monitoring interval: 5 minutes
  - Alert contacts: Your email
- [ ] Monitor status: "Up"
- [ ] Test alert: Pause monitor, verify email received, resume monitor

### Sentry (If using)
- [ ] Sentry dashboard checked
- [ ] Backend project visible
- [ ] No errors in last hour
- [ ] Performance monitoring active

### Highlight.io (If using)
- [ ] Highlight dashboard checked
- [ ] Backend sessions visible
- [ ] Traces recording

---

## 🌐 Frontend Integration

### Update Frontend Configuration
- [ ] Frontend environment updated:
  ```bash
  # In frontend/.env or frontend/.env.production
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  ```
- [ ] Frontend rebuilt/redeployed
- [ ] Frontend can reach backend API

### Test End-to-End

#### Authentication Flow
- [ ] User can sign up
- [ ] User can log in
- [ ] User sessions persist
- [ ] Clerk webhooks working (check Clerk dashboard)

#### Memory Operations
- [ ] Create memory works
- [ ] List memories works
- [ ] Search memories works
- [ ] Delete memory works

#### Billing (If DODO_MODE=live)
- [ ] Checkout flow works
- [ ] Webhooks received (check backend logs)
- [ ] Subscription status updates
- [ ] Usage tracking works

---

## 🔍 Post-Deployment Validation (24-48 hours)

### Day 1 Checks
- [ ] Health endpoint responding: `curl https://api.yourdomain.com/api/status`
- [ ] No errors in logs: `docker compose logs backend --tail=100`
- [ ] SSL certificate valid (browser shows lock icon)
- [ ] Cron jobs executing (check cron-job.org history)
- [ ] UptimeRobot shows 100% uptime
- [ ] Resource usage acceptable:
  ```bash
  docker stats
  free -h
  df -h
  ```

### Day 2 Checks
- [ ] All Day 1 checks still passing
- [ ] No memory leaks (memory usage stable)
- [ ] No disk space issues
- [ ] Cron jobs still executing successfully
- [ ] No failed requests in UptimeRobot
- [ ] Frontend still working correctly

### Performance Validation
- [ ] API response times acceptable (<500ms for most endpoints)
- [ ] Search endpoint performing well (<1s)
- [ ] Model warming preventing cold starts
- [ ] No timeout errors

---

## 🎉 Migration Complete (After 48h)

### Render Transition (Optional)
If keeping Render as dev environment:
- [ ] Render environment renamed to "Development"
- [ ] Render environment variables updated for dev mode:
  - [ ] DODO_MODE=test
  - [ ] Different database URL (dev database)
  - [ ] ALLOWED_ORIGINS includes localhost
- [ ] Render deployment verified still works for dev

If removing Render:
- [ ] All traffic confirmed on VPS
- [ ] 7 days of stable operation
- [ ] Render service stopped/deleted
- [ ] Render billing canceled

### Documentation
- [ ] VPS IP address documented
- [ ] All credentials stored in password manager
- [ ] DNS records documented
- [ ] Cron job URLs documented
- [ ] Deployment procedures documented for team

### Team Handoff (If applicable)
- [ ] Team members can SSH to VPS
- [ ] Team members trained on deployment: `./deploy.sh`
- [ ] Team members know how to view logs
- [ ] Team members know rollback procedure
- [ ] Emergency contacts configured (phone/Slack/Discord)

---

## ✅ Success Criteria

You can consider deployment successful when:
- ✅ Health endpoint returns 200 OK
- ✅ SSL certificate is valid and auto-renewing
- ✅ All 3 cron jobs executing successfully
- ✅ UptimeRobot shows 100% uptime for 48 hours
- ✅ Frontend successfully communicates with backend
- ✅ No errors in backend logs
- ✅ Resource usage stable (CPU <50%, RAM <75%, Disk <70%)
- ✅ Zero-downtime deployment verified (`./deploy.sh` works)
- ✅ Rollback tested and working (`./deploy.sh rollback`)

---

## 📞 Troubleshooting Resources

If you encounter issues:
1. **Check logs first**: `docker compose logs -f backend`
2. **Health check**: `curl http://localhost:3000/api/status`
3. **Refer to**: `DEPLOYMENT_GUIDE.md` - Troubleshooting section
4. **Check**: `VPS_SETUP_GUIDE.md` - Common issues
5. **Review**: Backend logs in Sentry dashboard
6. **Verify**: All environment variables are set correctly

---

## 💰 Cost Tracking

### Monthly Costs
- [ ] VPS: $______/month
- [ ] Domain: $______/year ($____/month)
- [ ] External services: $0/month (all free tiers)
- [ ] **Total**: $______/month

### Cost Optimization
- [ ] Using cheapest viable VPS option
- [ ] All external services on free tiers
- [ ] No paid monitoring tools needed
- [ ] Annual VPS billing for discount (optional)

---

**Deployment complete!** 🎉

Estimated total time: 1-2 hours for initial setup + 24-48h monitoring period.

Keep this checklist for future reference and for onboarding team members.
