const express = require('express');
const createConnection = require('./connection');
const cors = require('cors');
const port = 3000;
const app = express();

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
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    res.status(201).json({ message: 'User registered successfully' });
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
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      res.status(200).json({ message: 'Login successful', redirectUrl: 'http://localhost:5173/' });
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
    if (!message || !user_id) {
      return res.status(400).json({ error: 'Message and user ID are required' });
    }
  
    try {
      const [result] = await db.execute(
        'INSERT INTO chat (message, user_id) VALUES (?, ?)',
        [message, user_id]
      );
  
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Endpoint untuk mendapatkan semua pesan
app.get('/chats', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM chat');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Jalankan fungsi untuk membuat koneksi ke database
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
