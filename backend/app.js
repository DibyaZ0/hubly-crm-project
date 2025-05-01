import express from 'express';
import cors from 'cors';
import { connectDB, connectAtlasDB, getDB } from './mongo-context.js';
import { getAllUser, createUser, loginUser, deleteUser, updateUser } from './useroperation.js';
import { getAllTickets } from './ticketoperations.js';

const app = express()
const port = 3000
const collectionName = "users";
app.use(express.json())

app.use(cors()); 
app.use(express.json());

app.get('/api/user', async (req, res) => {
  const user = await getAllUser();
  res.json(user);
})

app.post('/api/user', async (req, res) => {
  const user = await createUser(req.body);
  return res.status(200).json(user);
})

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/user/delete', async (req, res) => {
  try {
    const idToDelete = req.body.id;
    const deletedCount = await deleteUser(idToDelete)

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    } 
      return res.status(200).json({ message: 'User deleted successfully' });
    
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    updatedUser.id = id;
    const modifiedCount = await updateUser(updatedUser);
    if (modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/tickets', async(req, res) => {
  const allTickets = await getAllTickets();
  res.status(200).json({
    message: "All tickets",
    tickets: allTickets
  });
});

connectAtlasDB()
  .then(() => {
    app.listen(port, () => {
      console.info(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
