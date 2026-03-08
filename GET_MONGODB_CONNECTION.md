# 🔗 GET YOUR MONGODB ATLAS CONNECTION STRING

## Quick Steps:

### 1. Go to MongoDB Atlas
https://cloud.mongodb.com/

### 2. Login with your account

### 3. Get Connection String

**Option A: If you already have a cluster:**
1. Click "Database" in left menu
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string

**Option B: If you need to create a cluster:**
1. Click "Build a Database"
2. Choose "M0 FREE" tier
3. Click "Create"
4. Wait 2-3 minutes

### 4. Create Database User (if needed)
1. Click "Database Access" (left menu)
2. Click "Add New Database User"
3. Username: `lmsuser`
4. Password: `lmspass123` (or your choice)
5. Click "Add User"

### 5. Allow Network Access
1. Click "Network Access" (left menu)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"

### 6. Get Connection String
1. Go back to "Database"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 7. Tell Me Your Connection String

Just paste it here and I'll update the backend/.env file for you!

Or if you want to do it yourself:
1. Open `backend/.env`
2. Replace the MONGODB_URI line with your connection string
3. Make sure to replace `<password>` with your actual password
4. Add `/lms` before the `?` to specify database name

Example:
```
MONGODB_URI=mongodb+srv://lmsuser:lmspass123@cluster0.xxxxx.mongodb.net/lms?retryWrites=true&w=majority
```
