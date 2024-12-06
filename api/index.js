const express = require('express');
const createConnection = require('./connection');
const cors = require('cors');
const port = 3000;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(express.json());

let db;

// Fungsi untuk membuat koneksi dan menunggu koneksi selesai
async function connectToDatabase() {
  try {
    db = await createConnection(); // Fungsi createConnection untuk membuat koneksi ke MySQL
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
}

// Endpoint untuk register pengguna
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );

    const [newUser] = await db.execute(
      'SELECT id, username, email FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      user: newUser[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk login pengguna
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [users] = await db.execute(
      'SELECT id, username, email FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length > 0) {
      res.status(200).json({ 
        message: 'Login successful',
        user: users[0]
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk mengirim pesan
app.post('/send-message', async (req, res) => {
  const { message, user_id } = req.body;
  
  // Validate input
  if (!message || !user_id) {
    return res.status(400).json({ error: 'Message and user ID are required' });
  }

  // Check if database connection exists
  if (!db) {
    console.error('Database connection not established');
    return res.status(500).json({ error: 'Database connection error' });
  }

  try {
    // First check if user exists
    const [users] = await db.execute('SELECT id FROM users WHERE id = ?', [user_id]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Then insert the message
    const [result] = await db.execute(
      'INSERT INTO chat (message, user_id) VALUES (?, ?)',
      [message, user_id]
    );

    // Emit the message through socket.io
    io.emit('message', { message, user_id });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Endpoint untuk mendapatkan semua pesan
app.get('/chats', async (req, res) => {
  try {
    const [rows, fields] = await db.execute(`
      SELECT chat.message, users.username, chat.created_at 
      FROM chat 
      JOIN users ON chat.user_id = users.id
    `); // Sesuaikan dengan nama tabel dan kolom yang sesuai di database Anda
    res.json(rows);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get user ID by username
app.get('/api/get-user-id', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const [users] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);
    if (users.length > 0) {
      res.status(200).json({ user_id: users[0].id });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Jalankan fungsi untuk membuat koneksi ke database
connectToDatabase().then(() => {
  http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
