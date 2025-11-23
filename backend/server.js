const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const LOST_ITEMS_FILE = path.join(__dirname, 'data', 'lost-items.json');
const FOUND_ITEMS_FILE = path.join(__dirname, 'data', 'found-items.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utility functions
const readUsersFile = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return { users: [] };
  }
};

const writeUsersFile = (data) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
};

const readLostItemsFile = () => {
  try {
    const data = fs.readFileSync(LOST_ITEMS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading lost items file:', error);
    return { lostItems: [] };
  }
};

const writeLostItemsFile = (data) => {
  try {
    fs.writeFileSync(LOST_ITEMS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing lost items file:', error);
    return false;
  }
};

const readFoundItemsFile = () => {
  try {
    const data = fs.readFileSync(FOUND_ITEMS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading found items file:', error);
    return { foundItems: [] };
  }
};

const writeFoundItemsFile = (data) => {
  try {
    fs.writeFileSync(FOUND_ITEMS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing found items file:', error);
    return false;
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }

  const data = readUsersFile();

  // Check if user already exists
  const existingUser = data.users.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password, // In production, hash this password!
    createdAt: new Date().toISOString()
  };

  data.users.push(newUser);

  if (writeUsersFile(data)) {
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Error saving user data'
    });
  }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const data = readUsersFile();

  // Find user by email
  const user = data.users.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found. Please register first.'
    });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect password. Please try again.'
    });
  }

  // Login successful
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// Get all users (for debugging - remove in production)
app.get('/api/users', (req, res) => {
  const data = readUsersFile();
  const users = data.users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt
  }));
  res.json({ users });
});

// Report Lost Item
app.post('/api/items/lost', (req, res) => {
  const { itemName, category, description, date, location, contactName, contactEmail, contactPhone, imageUrl } = req.body;

  // Validation
  if (!itemName || !category || !description || !date || !location || !contactName || !contactEmail || !contactPhone) {
    return res.status(400).json({
      success: false,
      message: 'All required fields must be provided'
    });
  }

  const data = readLostItemsFile();

  const newItem = {
    id: Date.now().toString(),
    type: 'lost',
    itemName,
    category,
    description,
    date,
    location,
    contactName,
    contactEmail,
    contactPhone,
    imageUrl: imageUrl || '',
    status: 'active',
    createdAt: new Date().toISOString()
  };

  data.lostItems.push(newItem);

  if (writeLostItemsFile(data)) {
    res.status(201).json({
      success: true,
      message: 'Lost item reported successfully',
      item: newItem
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Error saving lost item data'
    });
  }
});

// Report Found Item
app.post('/api/items/found', (req, res) => {
  const { itemName, category, description, date, location, contactName, contactEmail, contactPhone, imageUrl } = req.body;

  // Validation
  if (!itemName || !category || !description || !date || !location || !contactName || !contactEmail || !contactPhone) {
    return res.status(400).json({
      success: false,
      message: 'All required fields must be provided'
    });
  }

  const data = readFoundItemsFile();

  const newItem = {
    id: Date.now().toString(),
    type: 'found',
    itemName,
    category,
    description,
    date,
    location,
    contactName,
    contactEmail,
    contactPhone,
    imageUrl: imageUrl || '',
    status: 'active',
    createdAt: new Date().toISOString()
  };

  data.foundItems.push(newItem);

  if (writeFoundItemsFile(data)) {
    res.status(201).json({
      success: true,
      message: 'Found item reported successfully',
      item: newItem
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Error saving found item data'
    });
  }
});

// Get all lost items
app.get('/api/items/lost', (req, res) => {
  const data = readLostItemsFile();
  res.json({ success: true, items: data.lostItems });
});

// Get all found items
app.get('/api/items/found', (req, res) => {
  const data = readFoundItemsFile();
  res.json({ success: true, items: data.foundItems });
});

// Reunite items - update status to resolved
app.put('/api/items/reunite', (req, res) => {
  const { lostItemId, foundItemId } = req.body;

  if (!lostItemId || !foundItemId) {
    return res.status(400).json({
      success: false,
      message: 'Both lostItemId and foundItemId are required'
    });
  }

  // Update lost item
  const lostData = readLostItemsFile();
  const lostItemIndex = lostData.lostItems.findIndex(item => item.id === lostItemId);
  
  if (lostItemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Lost item not found'
    });
  }

  // Update found item
  const foundData = readFoundItemsFile();
  const foundItemIndex = foundData.foundItems.findIndex(item => item.id === foundItemId);
  
  if (foundItemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Found item not found'
    });
  }

  // Update both items' status to resolved
  lostData.lostItems[lostItemIndex].status = 'resolved';
  lostData.lostItems[lostItemIndex].resolvedAt = new Date().toISOString();
  lostData.lostItems[lostItemIndex].matchedWith = {
    id: foundItemId,
    type: 'found',
    itemName: foundData.foundItems[foundItemIndex].itemName,
    contactName: foundData.foundItems[foundItemIndex].contactName,
    contactEmail: foundData.foundItems[foundItemIndex].contactEmail
  };
  
  foundData.foundItems[foundItemIndex].status = 'resolved';
  foundData.foundItems[foundItemIndex].resolvedAt = new Date().toISOString();
  foundData.foundItems[foundItemIndex].matchedWith = {
    id: lostItemId,
    type: 'lost',
    itemName: lostData.lostItems[lostItemIndex].itemName,
    contactName: lostData.lostItems[lostItemIndex].contactName,
    contactEmail: lostData.lostItems[lostItemIndex].contactEmail
  };

  // Save both files
  const lostSaved = writeLostItemsFile(lostData);
  const foundSaved = writeFoundItemsFile(foundData);

  if (lostSaved && foundSaved) {
    res.json({
      success: true,
      message: 'Items marked as reunited successfully',
      lostItem: lostData.lostItems[lostItemIndex],
      foundItem: foundData.foundItems[foundItemIndex]
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Error updating item statuses'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Lost & Found Backend Server`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health\n`);
});
