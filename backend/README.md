# Lost & Found Backend Server

Node.js Express backend server for the Lost & Found application, providing comprehensive REST APIs for authentication, item management, and intelligent matching functionality.

## Features

### Authentication & User Management
- User registration with comprehensive validation
- User login authentication
- Password validation (minimum 6 characters)
- Email format validation
- Duplicate user detection

### Lost & Found Item Management
- Report lost items with detailed information
- Report found items with finder details
- Retrieve all lost items
- Retrieve all found items
- Mark items as reunited
- Real-time data persistence

### Data Storage
- JSON file-based database system
- Three separate data stores:
  - `users.json` - User accounts
  - `lost-items.json` - Lost items database
  - `found-items.json` - Found items database
- Automatic file creation and management
- Data validation and error handling

### API Features
- RESTful API design
- CORS enabled for Angular frontend
- JSON request/response format
- Comprehensive error handling
- Input validation
- Health check endpoint

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
# Development mode with nodemon (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### System

#### Health Check
- **GET** `/api/health`
- **Description**: Check server status
- **Response**: 
  ```json
  {
    "status": "OK",
    "message": "Server is running"
  }
  ```

---

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Description**: Create a new user account
- **Request Body**: 
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Validation**:
  - All fields required
  - Email must be valid format
  - Password minimum 6 characters
  - Email must be unique
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```
- **Error Responses**:
  - 400: Missing/invalid fields
  - 409: User already exists
  - 500: Server error

#### Login User
- **POST** `/api/auth/login`
- **Description**: Authenticate user
- **Request Body**: 
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```
- **Error Responses**:
  - 400: Missing credentials
  - 404: User not found
  - 401: Incorrect password

#### Get All Users (Debug)
- **GET** `/api/users`
- **Description**: Retrieve all registered users (without passwords)
- **Response**: 
  ```json
  {
    "success": true,
    "count": number,
    "users": [
      {
        "id": "string",
        "name": "string",
        "email": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

---

### Lost Items

#### Report Lost Item
- **POST** `/api/items/lost`
- **Description**: Submit a lost item report
- **Request Body**: 
  ```json
  {
    "userId": "string",
    "itemName": "string",
    "category": "string",
    "description": "string",
    "dateLost": "string",
    "locationLost": "string",
    "contactInfo": "string"
  }
  ```
- **Validation**:
  - All fields required
  - Item name, category, description required
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "Lost item reported successfully",
    "item": {
      "id": "string",
      "userId": "string",
      "itemName": "string",
      "category": "string",
      "description": "string",
      "dateLost": "string",
      "locationLost": "string",
      "contactInfo": "string",
      "status": "active",
      "reportedAt": "string"
    }
  }
  ```

#### Get All Lost Items
- **GET** `/api/items/lost`
- **Description**: Retrieve all active lost items
- **Response**: 
  ```json
  {
    "success": true,
    "count": number,
    "items": [...]
  }
  ```

---

### Found Items

#### Report Found Item
- **POST** `/api/items/found`
- **Description**: Submit a found item report
- **Request Body**: 
  ```json
  {
    "userId": "string",
    "itemName": "string",
    "category": "string",
    "description": "string",
    "dateFound": "string",
    "locationFound": "string",
    "finderContact": "string"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "Found item reported successfully",
    "item": {
      "id": "string",
      "userId": "string",
      "itemName": "string",
      "category": "string",
      "description": "string",
      "dateFound": "string",
      "locationFound": "string",
      "finderContact": "string",
      "status": "active",
      "reportedAt": "string"
    }
  }
  ```

#### Get All Found Items
- **GET** `/api/items/found`
- **Description**: Retrieve all active found items
- **Response**: 
  ```json
  {
    "success": true,
    "count": number,
    "items": [...]
  }
  ```

---

### Item Reunification

#### Mark Items as Reunited
- **PUT** `/api/items/reunite`
- **Description**: Mark lost and found items as successfully reunited
- **Request Body**: 
  ```json
  {
    "lostItemId": "string",
    "foundItemId": "string"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Items marked as reunited successfully"
  }
  ```
- **Error Responses**:
  - 400: Missing item IDs
  - 404: Item(s) not found
  - 500: Update failed

## Data Storage

The application uses three JSON files for data persistence:

### users.json
```json
{
  "users": [
    {
      "id": "timestamp_string",
      "name": "John Doe",
      "email": "john@example.com",
      "password": "hashed_password",
      "createdAt": "ISO_timestamp"
    }
  ]
}
```

### lost-items.json
```json
{
  "lostItems": [
    {
      "id": "timestamp_string",
      "userId": "user_id",
      "itemName": "iPhone 13 Pro",
      "category": "Electronics",
      "description": "Black iPhone with blue case",
      "dateLost": "2024-01-15",
      "locationLost": "College Library",
      "contactInfo": "john@example.com",
      "status": "active",
      "reportedAt": "ISO_timestamp"
    }
  ]
}
```

### found-items.json
```json
{
  "foundItems": [
    {
      "id": "timestamp_string",
      "userId": "user_id",
      "itemName": "Wallet",
      "category": "Wallet",
      "description": "Brown leather wallet",
      "dateFound": "2024-01-15",
      "locationFound": "Campus Cafeteria",
      "finderContact": "finder@example.com",
      "status": "active",
      "reportedAt": "ISO_timestamp"
    }
  ]
}
```

All files are located in `backend/data/` directory.

## Security Notes

⚠️ **Important**: This is a development setup for educational purposes.

### Current Implementation:
- Plain text password storage
- Basic validation
- No rate limiting
- No JWT tokens
- File-based storage

### For Production Deployment:

#### Must-Have Security Features:
1. **Password Security**
   ```bash
   npm install bcrypt
   ```
   - Hash passwords with bcrypt
   - Never store plain text passwords
   - Use salt rounds (10-12 recommended)

2. **Authentication Tokens**
   ```bash
   npm install jsonwebtoken
   ```
   - Implement JWT tokens
   - Add refresh token mechanism
   - Set proper expiration times

3. **Database**
   - Migrate to PostgreSQL/MongoDB
   - Use connection pooling
   - Implement indexes for performance
   - Use transactions

4. **API Security**
   ```bash
   npm install helmet express-rate-limit
   ```
   - Add Helmet.js for headers
   - Implement rate limiting
   - Add request validation
   - Sanitize inputs

5. **Environment Variables**
   ```bash
   npm install dotenv
   ```
   - Store secrets in .env file
   - Never commit sensitive data
   - Use different configs per environment

6. **HTTPS & CORS**
   - Enforce HTTPS only
   - Configure CORS properly
   - Add CSRF protection
   - Implement Content Security Policy

7. **Logging & Monitoring**
   ```bash
   npm install morgan winston
   ```
   - Log all requests
   - Monitor errors
   - Track suspicious activity
   - Set up alerts

8. **Input Validation**
   ```bash
   npm install joi express-validator
   ```
   - Validate all inputs
   - Sanitize data
   - Prevent SQL/NoSQL injection
   - Validate file uploads

## Testing with curl

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Report Lost Item
```bash
curl -X POST http://localhost:3000/api/items/lost \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "itemName": "iPhone 13 Pro",
    "category": "Electronics",
    "description": "Black iPhone with blue case",
    "dateLost": "2024-01-15",
    "locationLost": "College Library",
    "contactInfo": "john@example.com"
  }'
```

### Report Found Item
```bash
curl -X POST http://localhost:3000/api/items/found \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "itemName": "Wallet",
    "category": "Wallet",
    "description": "Brown leather wallet",
    "dateFound": "2024-01-15",
    "locationFound": "Campus Cafeteria",
    "finderContact": "finder@example.com"
  }'
```

### Get All Lost Items
```bash
curl http://localhost:3000/api/items/lost
```

### Get All Found Items
```bash
curl http://localhost:3000/api/items/found
```

### Mark Items as Reunited
```bash
curl -X PUT http://localhost:3000/api/items/reunite \
  -H "Content-Type: application/json" \
  -d '{
    "lostItemId": "123456789",
    "foundItemId": "987654321"
  }'
```

## Testing with Postman

You can import these endpoints into Postman:

1. Create a new collection "Lost & Found API"
2. Set base URL: `http://localhost:3000`
3. Add the endpoints above
4. Test each endpoint

### Recommended Test Flow:
1. ✅ Health Check - Verify server is running
2. ✅ Register User - Create test account
3. ✅ Login - Authenticate user
4. ✅ Report Lost Item - Add lost item
5. ✅ Report Found Item - Add found item
6. ✅ Get Lost Items - View all lost
7. ✅ Get Found Items - View all found
8. ✅ Reunite Items - Mark as reunited

## Port Configuration

Default port: **3000**

To change the port, modify the `PORT` constant in `server.js`:

```javascript
const PORT = 3000; // Change this value
```

Or use environment variable:
```bash
PORT=5000 node server.js
```

## Server Configuration

### CORS Configuration
The server allows requests from:
- `http://localhost:4200` (Angular dev server)
- Add more origins in production

### Body Parser Limits
- JSON payload limit: Default
- URL encoded limit: Default

Adjust in `server.js` if needed:
```javascript
app.use(bodyParser.json({ limit: '10mb' }));
```

## Error Handling

The server implements comprehensive error handling:

### Common Error Responses:

**400 Bad Request**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**401 Unauthorized**
```json
{
  "success": false,
  "message": "Incorrect password"
}
```

**404 Not Found**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**409 Conflict**
```json
{
  "success": false,
  "message": "User already exists"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error message"
}
```

## Development Tips

### Watch Mode
Use nodemon for auto-restart on file changes:
```bash
npm run dev
```

### Debugging
Enable debug logs:
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

### Testing Data
Create sample data files for testing:
```bash
cd backend/data

# Add sample lost item
echo '{
  "lostItems": [
    {
      "id": "123",
      "itemName": "Test Item",
      "category": "Electronics",
      "status": "active"
    }
  ]
}' > lost-items.json
```

## Troubleshooting

### Server Won't Start
```bash
# Check if port is in use
lsof -ti:3000

# Kill existing process
lsof -ti:3000 | xargs kill -9

# Verify Node.js installation
node --version
npm --version
```

### Data Files Not Found
```bash
# Create data directory
mkdir -p backend/data

# Initialize files
echo '{"users":[]}' > backend/data/users.json
echo '{"lostItems":[]}' > backend/data/lost-items.json
echo '{"foundItems":[]}' > backend/data/found-items.json
```

### Module Errors
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
Check CORS configuration in `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

## Performance Considerations

### Current Limitations:
- File-based storage (not scalable)
- No caching
- Synchronous file operations
- No connection pooling

### Recommended Improvements:
1. Migrate to database (MongoDB/PostgreSQL)
2. Implement caching (Redis)
3. Use async file operations
4. Add pagination for large datasets
5. Implement indexing
6. Add compression middleware
7. Use CDN for static assets

## Deployment

### Prerequisites:
- Node.js environment
- Environment variables configured
- Database setup (if migrated from JSON)

### Environment Variables:
```bash
PORT=3000
NODE_ENV=production
DB_CONNECTION_STRING=<your-db-url>
JWT_SECRET=<your-secret>
```

### Production Start:
```bash
NODE_ENV=production node server.js
```

### Process Manager (PM2):
```bash
npm install -g pm2
pm2 start server.js --name "lostandfound-backend"
pm2 save
pm2 startup
```

## Contributing

To contribute to the backend:
1. Follow RESTful API conventions
2. Add proper error handling
3. Include input validation
4. Document new endpoints
5. Write tests for new features

## License

Educational project for Lost & Found Management System.

## Support

For issues or questions:
- Check the troubleshooting section
- Review the API documentation
- Check server logs
- Verify data files exist

---

**Backend Server Ready!** 🚀
