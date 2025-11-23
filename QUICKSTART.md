# Quick Start Guide - Lost & Found Application

## 🚀 Getting Started in 3 Steps

Follow these simple steps to run the complete Lost & Found application on your local machine.

---

## Step 1: Install Dependencies

### Frontend Dependencies
```bash
npm install
```

### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

**What's being installed:**
- Angular 18 and its dependencies
- Express.js and CORS middleware
- All required development tools

---

## Step 2: Start the Backend Server

Open a new terminal and run:

```bash
cd backend
node server.js
```

**Expected Output:**
```
🚀 Lost & Found Backend Server
📡 Server running on http://localhost:3000
📊 Health check: http://localhost:3000/api/health
✅ Data files initialized
```

**What the backend provides:**
- User authentication APIs
- Lost item management
- Found item management
- Intelligent matching system
- JSON file-based data storage

---

## Step 3: Start the Angular Application

Open another terminal and run:

```bash
npm start
```

**Expected Output:**
```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
```

The application will automatically open at `http://localhost:4200/`

---

## 🎯 Testing the Complete Application

### 1. Explore the Landing Page
- **Home Page**: Learn about the Lost & Found system
- **About Us**: College and project information
- **Contact**: Submit inquiries via the contact form

### 2. Register a New User
- Click **"Login"** in the navigation menu
- Click **"Create an account"** at the bottom
- Fill in the registration form:
  - **Name**: John Doe
  - **Email**: john@example.com
  - **Password**: password123 (minimum 6 characters)
  - **Confirm Password**: password123
- Click **"Register"**
- You'll be automatically redirected to login

### 3. Login to Your Account
- Enter your email: `john@example.com`
- Enter your password: `password123`
- Click **"Login"**
- You'll be redirected to your Dashboard

### 4. View Your Dashboard
The dashboard shows:
- Welcome message with your name
- **Total Lost Items** count
- **Total Found Items** count
- Quick action cards:
  - Report Lost Item
  - Report Found Item
  - View All Items

### 5. Report a Lost Item
- Click **"Report Lost Item"** or navigate to `/report-lost`
- Fill in the form:
  - **Item Name**: iPhone 13 Pro
  - **Category**: Electronics
  - **Description**: Black iPhone with blue case
  - **Date Lost**: Select date
  - **Location Lost**: College Library, 2nd Floor
  - **Contact Info**: john@example.com or 555-0123
- Click **"Submit Report"**
- Item is saved to `backend/data/lost-items.json`

### 6. Report a Found Item
- Click **"Report Found Item"** or navigate to `/report-found`
- Fill in the form:
  - **Item Name**: Wallet
  - **Category**: Wallet
  - **Description**: Brown leather wallet with ID cards
  - **Date Found**: Select date
  - **Location Found**: Campus Cafeteria
  - **Finder Contact**: john@example.com
- Click **"Submit Report"**
- Item is saved to `backend/data/found-items.json`

### 7. View All Items
- Click **"View Items"** in the navigation
- Browse two sections:
  - **Lost Items**: All reported lost items with details
  - **Found Items**: All reported found items with details
- Each item card shows:
  - Item name and category
  - Description
  - Date and location
  - Contact information
  - Report timestamp

### 8. Admin Matching System (Admin Users Only)
- Navigate to `/matching`
- The system automatically:
  - Analyzes all lost and found items
  - Generates potential matches
  - Calculates match percentage
  - Provides match reasoning
- Review matches and mark items as **"Reunited"**
- Reunited items are removed from active listings

---

## 📁 Data Storage

All application data is stored in JSON files in the backend:

### User Data
```
backend/data/users.json
```
Contains all registered user accounts with encrypted authentication.

### Lost Items
```
backend/data/lost-items.json
```
Database of all reported lost items.

### Found Items
```
backend/data/found-items.json
```
Database of all reported found items.

You can view these files to inspect the data directly!

---

## 🌐 Application URLs

### Frontend
- **Home**: http://localhost:4200/
- **About**: http://localhost:4200/about
- **Contact**: http://localhost:4200/contact
- **Login**: http://localhost:4200/login
- **Register**: http://localhost:4200/register
- **Dashboard**: http://localhost:4200/dashboard (requires login)
- **Report Lost**: http://localhost:4200/report-lost (requires login)
- **Report Found**: http://localhost:4200/report-found (requires login)
- **View Items**: http://localhost:4200/view-items (requires login)
- **Matching**: http://localhost:4200/matching (admin only)

### Backend API
- **Health Check**: http://localhost:3000/api/health
- **API Base**: http://localhost:3000/api/

---

## 🔧 Troubleshooting

### Port Already in Use

**Backend (Port 3000):**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Frontend (Port 4200):**
```bash
# macOS/Linux
lsof -ti:4200 | xargs kill -9

# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Backend Not Connecting

1. **Verify backend is running:**
   ```bash
   curl http://localhost:3000/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Check terminal for errors**
   - Look for Node.js error messages
   - Ensure all dependencies are installed

3. **Verify data files exist:**
   ```bash
   ls backend/data/
   ```
   Should show: `users.json`, `lost-items.json`, `found-items.json`

### Data Files Missing

If data files don't exist, create them:

```bash
cd backend/data

# Create users.json
echo '{"users":[]}' > users.json

# Create lost-items.json
echo '{"lostItems":[]}' > lost-items.json

# Create found-items.json
echo '{"foundItems":[]}' > found-items.json
```

### Module Not Found Errors

**Frontend:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Cannot Access Protected Routes

Make sure you're logged in:
1. Navigate to http://localhost:4200/login
2. Login with your credentials
3. Try accessing protected routes again

### Angular CLI Not Found

Install Angular CLI globally:
```bash
npm install -g @angular/cli
```

---

## 📝 Quick Command Reference

### Start Everything
```bash
# Terminal 1 - Backend
cd backend && node server.js

# Terminal 2 - Frontend
npm start
```

### Stop Servers
```bash
# Press Ctrl+C in each terminal
```

### View Logs
```bash
# Backend logs are in Terminal 1
# Frontend logs are in Terminal 2
# Browser console for client-side logs (F12 → Console)
```

### Reset Data
```bash
# Clear all users
echo '{"users":[]}' > backend/data/users.json

# Clear all lost items
echo '{"lostItems":[]}' > backend/data/lost-items.json

# Clear all found items
echo '{"foundItems":[]}' > backend/data/found-items.json
```

---

## ✨ Features Overview

| Feature | Status | Access Level |
|---------|--------|--------------|
| User Registration | ✅ Complete | Public |
| User Login | ✅ Complete | Public |
| Landing Pages | ✅ Complete | Public |
| User Dashboard | ✅ Complete | Authenticated |
| Report Lost Item | ✅ Complete | Authenticated |
| Report Found Item | ✅ Complete | Authenticated |
| View All Items | ✅ Complete | Authenticated |
| Intelligent Matching | ✅ Complete | Admin Only |
| Item Reunification | ✅ Complete | Admin Only |

---

## 🎓 Learning Resources

### Angular Documentation
- Official Docs: https://angular.io/docs
- Router: https://angular.io/guide/router
- Forms: https://angular.io/guide/forms

### Express.js Documentation
- Official Docs: https://expressjs.com/
- Routing: https://expressjs.com/en/guide/routing.html

---

## 💡 Tips for Development

1. **Keep both terminals open** - You need both frontend and backend running
2. **Check browser console** - Press F12 to see any client-side errors
3. **Monitor backend terminal** - API errors appear here
4. **Use the proxy** - Angular automatically proxies `/api/*` to backend
5. **Hot reload enabled** - Changes to code reload automatically

---

## 🚀 Next Steps

After getting familiar with the application:
1. Explore the code structure
2. Try modifying component styles
3. Add new features
4. Implement suggested enhancements
5. Deploy to a cloud platform

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review the main README.md
3. Check backend/data/ files exist
4. Verify both servers are running
5. Clear browser cache and try again

**Happy coding!** 🎉

### Angular Compilation Errors

```bash
# Clear Angular cache
rm -rf .angular/cache
ng serve
```

## 🌐 URLs

- **Frontend**: http://localhost:4200/
- **Backend API**: http://localhost:3000/api
- **Backend Health Check**: http://localhost:3000/api/health

## 📝 API Testing with curl

```bash
# Health Check
curl http://localhost:3000/api/health

# Register User
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"password123"}'
```

## ⚠️ Important Notes

1. **Backend must be running first** before starting Angular
2. Keep both terminals open while using the application
3. User passwords are stored in plain text (development only)
4. Data persists in JSON file across server restarts
5. To reset data, delete or empty `backend/data/users.json`

## 🎓 College Information

This project is developed for:
**Rao Bahadur Y Mahabaleshwarappa Engineering College**
Ballari, Karnataka, India

## 📧 Support

If you encounter any issues, check:
1. Both servers are running
2. No port conflicts
3. All dependencies are installed
4. Node.js version is 14 or higher

---

Happy coding! 🎉
