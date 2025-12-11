# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended) ☁️

MongoDB Atlas is free, easy to set up, and works perfectly for development and production.

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account
3. Complete the registration

### Step 2: Create a New Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (perfect for development)
   - Select your preferred cloud provider (AWS recommended)
   - Choose a region closest to you (for Zimbabwe, select Cape Town or Frankfurt)
3. Click **"Create"** (this takes 3-5 minutes)

### Step 3: Set Up Database Access

#### Create Database User:
1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `gleam-admin` (or any name you prefer)
5. Set a strong password: `YourStrongPassword123!` (save this!)
6. Under "Database User Privileges", select **"Atlas Admin"**
7. Click **"Add User"**

### Step 4: Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0` to allowed IPs
   - ⚠️ For production, use specific IPs
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go back to **"Database"** in the sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver and latest version
5. Copy the connection string, it looks like:
   ```
   mongodb+srv://gleam-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add your database name before the `?`:
   ```
   mongodb+srv://gleam-admin:YourStrongPassword123!@cluster0.xxxxx.mongodb.net/gleam-candles?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File

Open `server/.env` and update:

```env
MONGODB_URI=mongodb+srv://gleam-admin:YourStrongPassword123!@cluster0.xxxxx.mongodb.net/gleam-candles?retryWrites=true&w=majority
```

**Important:** Replace with your actual connection string!

### Step 7: Test Connection

```bash
cd server
npm run seed
```

If successful, you'll see:
```
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
Products deleted
Products seeded successfully
Admin user created
Database seeded successfully!
```

---

## Option 2: Local MongoDB Installation 🖥️

For running MongoDB on your local machine.

### macOS Installation

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0
```

### Windows Installation

1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Run the installer (.msi file)
3. Choose "Complete" installation
4. Install MongoDB as a Service (recommended)
5. Install MongoDB Compass (GUI tool - optional but helpful)

### Ubuntu/Linux Installation

```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update packages
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Configure Local MongoDB

Update `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/gleam-candles
```

### Test Local Connection

```bash
cd server
npm run seed
```

---

## Verify Everything Works

### 1. Check Database Connection

Start your server:
```bash
cd server
npm run dev
```

You should see:
```
MongoDB Connected: [your-host]
Server running in development mode on port 5000
```

### 2. Test API Health Check

Open browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "message": "Gleam API is running..."
}
```

### 3. Check Products Endpoint

```bash
curl http://localhost:5000/api/products
```

You should see all seeded products!

---

## MongoDB Compass (Optional GUI Tool)

Download: https://www.mongodb.com/try/download/compass

Connect using your connection string to visually browse your database.

---

## Troubleshooting

### Error: "MongooseServerSelectionError"

**Atlas:**
- Check if IP is whitelisted (0.0.0.0/0 for all IPs)
- Verify username/password in connection string
- Ensure cluster is fully deployed (not still creating)

**Local:**
- Check if MongoDB service is running
- Verify port 27017 is not in use

### Error: "Authentication failed"

- Double-check username and password
- Ensure password doesn't contain special characters that need URL encoding
- Try recreating the database user

### Error: "Network timeout"

- Check your internet connection (for Atlas)
- Verify firewall isn't blocking connections
- Try a different network

---

## Next Steps After Setup

1. ✅ MongoDB is running
2. ✅ Database is seeded with products
3. ✅ Server is connected

Now you can:
- Start backend: `npm run dev`
- Test API endpoints
- Connect your frontend to the API
- Build features!

---

## Production Tips

For production deployment:

1. **Atlas:**
   - Use specific IP addresses instead of 0.0.0.0/0
   - Enable backup
   - Set up monitoring alerts

2. **Environment Variables:**
   - Never commit `.env` file
   - Use secure passwords
   - Rotate credentials regularly

3. **Performance:**
   - Add indexes to frequently queried fields
   - Monitor database performance
   - Scale cluster as needed

---

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Documentation: https://docs.mongodb.com/
- Connection String Format: https://docs.mongodb.com/manual/reference/connection-string/
