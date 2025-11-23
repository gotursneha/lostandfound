# Lost & Found Application

A comprehensive Lost & Found management system built with Angular 18 and Node.js Express backend. This application helps users report lost items, log found items, and facilitates reuniting people with their belongings through an intelligent matching system.

## Features

### Authentication & User Management
- User registration with validation
- Secure login system
- Session management with localStorage
- Route guards for protected pages

### Item Management
- **Report Lost Items**: Submit detailed reports of lost belongings
- **Report Found Items**: Log found items with descriptions and locations
- **View All Items**: Browse comprehensive lists of lost and found items
- **Item Matching**: Admin-only intelligent matching system to connect lost items with found items
- **Reunite Items**: Mark items as successfully reunited with owners

### User Interface
- Responsive landing page with navigation
- Public pages: Home, About Us, Contact
- Protected dashboard for authenticated users
- Real-time statistics and item counters
- Form validation and error handling
- Mobile-friendly responsive design

## Tech Stack

- **Frontend**: Angular 18.2.14
- **Backend**: Node.js with Express
- **Styling**: CSS
- **Data Storage**: JSON files
- **Authentication**: Session-based with route guards
- **State Management**: RxJS and Angular Services

## Prerequisites

- Node.js (v14 or higher)
- npm
- Angular CLI (`npm install -g @angular/cli`)

## Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

## Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
# or
node server.js
```
Backend will run on `http://localhost:3000`

**Terminal 2 - Angular Dev Server:**
```bash
npm start
# or
ng serve
```
Frontend will run on `http://localhost:4200`

### Option 2: Using Angular Proxy

The application is configured with a proxy to handle API calls. Just run:

```bash
# Start backend
cd backend && node server.js &

# Start Angular (in another terminal)
ng serve
```

Navigate to `http://localhost:4200/`

## Project Structure

```
lostandfound/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── landing-layout/     # Public layout with navigation
│   │   │   ├── home/               # Landing page
│   │   │   ├── about/              # About us page
│   │   │   ├── contact/            # Contact form
│   │   │   ├── login/              # User login
│   │   │   ├── register/           # User registration
│   │   │   ├── dashboard/          # User dashboard
│   │   │   ├── report-lost/        # Report lost items
│   │   │   ├── report-found/       # Report found items
│   │   │   ├── view-items/         # View all items
│   │   │   └── matching/           # Admin matching system
│   │   ├── services/
│   │   │   ├── auth.service.ts     # Authentication service
│   │   │   └── item.service.ts     # Item management service
│   │   ├── guards/
│   │   │   ├── auth.guard.ts       # Route protection
│   │   │   └── admin.guard.ts      # Admin access control
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   └── assets/
├── backend/
│   ├── server.js                   # Express server
│   ├── data/
│   │   ├── users.json              # User data
│   │   ├── lost-items.json         # Lost items database
│   │   └── found-items.json        # Found items database
│   └── package.json
└── proxy.conf.json                 # API proxy configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users` - Get all users (debug only)

### Item Management
- `POST /api/items/lost` - Report a lost item
- `POST /api/items/found` - Report a found item
- `GET /api/items/lost` - Get all lost items
- `GET /api/items/found` - Get all found items
- `PUT /api/items/reunite` - Mark items as reunited

### System
- `GET /api/health` - Server health check

## Application Routes

### Public Routes (No Authentication Required)
- `/` - Home landing page
- `/home` - Home page
- `/about` - About us page
- `/contact` - Contact page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Authentication Required)
- `/dashboard` - User dashboard with statistics
- `/report-lost` - Report a lost item
- `/report-found` - Report a found item
- `/view-items` - View all lost and found items

### Admin Routes (Admin Access Required)
- `/matching` - Intelligent matching system for lost/found items

## Usage Guide

### For Regular Users:
1. **Register/Login**: Create an account or login to access features
2. **Report Lost Item**: Submit details of items you've lost
3. **Report Found Item**: Log items you've found
4. **View Items**: Browse all reported lost and found items
5. **Check Dashboard**: View your statistics and quick actions

### For Administrators:
- Access the **Matching** page to review potential matches between lost and found items
- Facilitate reunions by marking items as successfully returned

## Build

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Troubleshooting

### Port Already in Use
If you encounter port conflicts:

```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 4200 (frontend)
lsof -ti:4200 | xargs kill -9
```

### Backend Connection Issues
1. Ensure backend server is running on port 3000
2. Check `proxy.conf.json` is correctly configured
3. Verify data files exist in `backend/data/`

### Module Not Found Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clean backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Contributing

This is an educational project. Feel free to fork and enhance with additional features such as:
- Image upload for items
- Email notifications
- Advanced search and filtering
- Real-time chat between finders and losers
- Location-based matching
- Mobile app version

## License

This project is for educational purposes.

## Author

Developed as a college project for Lost & Found management system.


## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Data Storage

The application uses JSON files for data persistence:
- **users.json** - Stores user account information
- **lost-items.json** - Database of reported lost items
- **found-items.json** - Database of reported found items

All data files are located in `backend/data/`

## Security Notes

⚠️ **Important**: This is a development/educational setup. For production deployment:
- Implement password hashing (bcrypt)
- Add JWT authentication tokens
- Use a proper database (MongoDB, PostgreSQL, etc.)
- Implement rate limiting
- Add input sanitization and SQL injection prevention
- Enable HTTPS
- Add CSRF protection
- Implement proper session management

## Troubleshooting Notes

- The application uses Angular's legacy NgModule architecture
- User passwords are stored in plain text (for development only)
- CORS is enabled on the backend for localhost:4200
- The proxy configuration redirects `/api` calls to `http://localhost:3000`

## Security Warnings

⚠️ **This is a development setup. For production:**
- Implement password hashing (bcrypt)
- Add JWT authentication
- Use a proper database (MongoDB, PostgreSQL, etc.)
- Implement rate limiting
- Add input sanitization
- Enable HTTPS
- Remove the debug `/api/users` endpoint

## College Information

**Managed By:**
Rao Bahadur Y Mahabaleshwarappa Engineering College
Ballari, Karnataka, India

## License

This project is for educational purposes.

