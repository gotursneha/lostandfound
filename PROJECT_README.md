# Lost & Found Management System

A comprehensive web application built with Angular 18 and Node.js to help reunite people with their lost belongings. The system provides an intuitive platform for reporting lost items, logging found items, and intelligently matching them to facilitate reunions.

## Features

### Complete Implementation ✅

#### Authentication & Security
- **User Registration** - Complete signup with validation
- **User Login** - Email and password authentication
- **Session Management** - Secure localStorage-based sessions
- **Route Guards** - Protection for authenticated pages
- **Admin Guard** - Special access control for admin features

#### Item Management
- **Report Lost Items** - Detailed form to report lost belongings
  - Item name, category, description
  - Date and location lost
  - Contact information
- **Report Found Items** - Log found items with details
  - Item name, category, description
  - Date and location found
  - Finder contact information
- **View All Items** - Comprehensive listing
  - Browse all lost items
  - Browse all found items
  - Real-time updates
  - Detailed item cards with all information

#### Intelligent Matching System (Admin Only)
- **Automated Matching** - Smart algorithm to match lost and found items
- **Match Score** - Percentage-based similarity scoring
- **Reunite Items** - Mark items as successfully returned
- **Match Details** - View detailed match information and reasoning

#### User Interface
- **Landing Page** - Professional homepage with navigation
- **About Us** - Information about the college and project
- **Contact Form** - Submit inquiries and feedback
- **Dashboard** - Personalized user dashboard with statistics
  - Total lost items count
  - Total found items count
  - Quick action cards
  - Welcome message
- **Responsive Design** - Mobile-friendly on all devices
- **Form Validation** - Real-time validation with error messages

## Tech Stack

- **Frontend Framework**: Angular 18.2.14
- **Backend**: Node.js with Express.js
- **Language**: TypeScript 5.4
- **Reactive Programming**: RxJS 7.5
- **Routing**: Angular Router with Guards
- **Forms**: Reactive Forms with Validators
- **HTTP Client**: Angular HttpClient
- **Styling**: CSS3 with Flexbox/Grid
- **Data Storage**: JSON file-based database

## Architecture

### Frontend Components
- **Landing Layout** - Public page wrapper with navigation
- **Home** - Landing page
- **About** - Information page
- **Contact** - Contact form
- **Login** - Authentication page
- **Register** - User registration
- **Dashboard** - User home (protected)
- **Report Lost** - Lost item form (protected)
- **Report Found** - Found item form (protected)
- **View Items** - Item browser (protected)
- **Matching** - Admin matching system (protected, admin only)

### Services
- **AuthService** - User authentication and session management
- **ItemService** - Lost and found item management

### Guards
- **AuthGuard** - Protects routes requiring authentication
- **AdminGuard** - Protects admin-only routes

### Backend Endpoints
```
Authentication:
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - User login
GET    /api/users            - List all users

Item Management:
POST   /api/items/lost       - Report lost item
POST   /api/items/found      - Report found item
GET    /api/items/lost       - Get all lost items
GET    /api/items/found      - Get all found items
PUT    /api/items/reunite    - Mark items as reunited

System:
GET    /api/health           - Health check
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (npm install -g @angular/cli)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lostandfound
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
node server.js
```
Backend runs on `http://localhost:3000`

**Terminal 2 - Start Frontend:**
```bash
npm start
```
Frontend runs on `http://localhost:4200` and opens automatically

The Angular proxy configuration will automatically route API calls to the backend.

## Usage Guide

### For Regular Users

1. **Register an Account**
   - Click "Login" in navigation
   - Click "Create an account"
   - Fill in name, email, and password
   - Submit to create account

2. **Login**
   - Enter your email and password
   - Access your personalized dashboard

3. **Report a Lost Item**
   - Navigate to Dashboard
   - Click "Report Lost Item" or use navigation
   - Fill in item details:
     - Item name
     - Category (Electronics, Documents, Keys, etc.)
     - Description
     - Date lost
     - Location lost
     - Contact information
   - Submit the report

4. **Report a Found Item**
   - Click "Report Found Item"
   - Provide found item details
   - Submit to database

5. **View All Items**
   - Browse all reported lost items
   - Browse all reported found items
   - Check for matches

### For Administrators

1. **Access Matching System**
   - Login with admin credentials
   - Navigate to `/matching`
   
2. **Review Matches**
   - System automatically generates match suggestions
   - View match percentage and reasoning
   - Review lost and found item details side-by-side

3. **Facilitate Reunions**
   - Contact both parties
   - Mark items as "Reunited" when successful
   - Items are removed from active listings

## Project Structure

```
lostandfound/
├── src/app/
│   ├── components/
│   │   ├── landing-layout/     # Public layout with header/footer
│   │   ├── home/               # Landing page
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact form
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── dashboard/          # User dashboard (protected)
│   │   ├── report-lost/        # Report lost item (protected)
│   │   ├── report-found/       # Report found item (protected)
│   │   ├── view-items/         # View all items (protected)
│   │   └── matching/           # Matching system (admin)
│   ├── services/
│   │   ├── auth.service.ts     # Authentication & user management
│   │   └── item.service.ts     # Item CRUD operations
│   ├── guards/
│   │   ├── auth.guard.ts       # Authentication guard
│   │   └── admin.guard.ts      # Admin access guard
│   ├── app-routing.module.ts   # Route configuration
│   └── app.module.ts           # Main module
├── backend/
│   ├── server.js               # Express server
│   ├── data/
│   │   ├── users.json          # User database
│   │   ├── lost-items.json     # Lost items database
│   │   └── found-items.json    # Found items database
│   └── package.json
├── proxy.conf.json             # API proxy configuration
└── package.json
```

## Application Routes

### Public Routes
- `/` → Home page
- `/home` → Home page
- `/about` → About us
- `/contact` → Contact form
- `/login` → User login
- `/register` → User registration

### Protected Routes (Requires Authentication)
- `/dashboard` → User dashboard
- `/report-lost` → Report lost item form
- `/report-found` → Report found item form
- `/view-items` → Browse all items

### Admin Routes (Requires Admin Access)
- `/matching` → Intelligent matching system

## Key Features Explained

### Intelligent Matching Algorithm
The matching system uses multiple criteria to suggest potential matches:
- **Item Name Similarity** - Fuzzy matching of item names
- **Category Match** - Exact category matching
- **Date Proximity** - Items lost/found within reasonable timeframe
- **Location Matching** - Geographic proximity analysis
- **Description Keywords** - Natural language processing of descriptions

### Form Validation
All forms include comprehensive validation:
- Required field validation
- Email format validation
- Password strength requirements
- Date validation
- Text length limits

### Session Management
- User sessions stored in localStorage
- Automatic logout on token expiration
- Persistent login across page refreshes
- Secure route protection

## Development

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Development Server with Watch
```bash
npm run watch
```

## Data Models

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}
```

### Lost Item
```typescript
{
  id: string;
  userId: string;
  itemName: string;
  category: string;
  description: string;
  dateLost: string;
  locationLost: string;
  contactInfo: string;
  status: 'active' | 'reunited';
  reportedAt: string;
}
```

### Found Item
```typescript
{
  id: string;
  userId: string;
  itemName: string;
  category: string;
  description: string;
  dateFound: string;
  locationFound: string;
  finderContact: string;
  status: 'active' | 'reunited';
  reportedAt: string;
}
```

## Future Enhancements

Potential features for future development:
- 📸 Image upload for items
- 📧 Email notifications for matches
- 🔍 Advanced search and filtering
- 💬 Real-time chat between users
- 📍 Map-based location selection
- 📱 Progressive Web App (PWA)
- 🌐 Multi-language support
- 🔔 Push notifications
- 📊 Analytics dashboard
- 🤖 AI-powered matching improvements

## Security Considerations

**Current Implementation (Development):**
- Plain text password storage
- Session-based authentication
- Client-side route guards

**Production Recommendations:**
- Implement bcrypt password hashing
- Use JWT tokens
- Add refresh token mechanism
- Implement rate limiting
- Add CSRF protection
- Use HTTPS only
- Implement proper session management
- Add input sanitization
- Use environment variables for secrets
- Implement proper database with indexes
- Add logging and monitoring

## Troubleshooting

### Backend Issues
```bash
# Check if backend is running
curl http://localhost:3000/api/health

# Restart backend
cd backend
node server.js
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart Angular
npm start
```

### Port Conflicts
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4200
lsof -ti:4200 | xargs kill -9
```

## Contributing

This is an educational project. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is for educational purposes.

## Author

College project for Lost & Found Management System.

## Acknowledgments

- Angular Team for the excellent framework
- Express.js for the backend framework
- All open-source contributors

### Watch Mode
```bash
npm run watch
```

## Next Steps

Future features to implement:
- [ ] User registration
- [ ] Report lost items with details
- [ ] Report found items with details
- [ ] Search and filter functionality
- [ ] Image upload for items
- [ ] Match lost and found items
- [ ] Notifications system
- [ ] User profile management
- [ ] Admin dashboard

## License

This project is for educational purposes.
