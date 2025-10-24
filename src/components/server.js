const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());                    // Allow cross-origin
app.use(express.json());            // Parse JSON bodies

// Route to receive contact form
app.post('/contact', (req, res) => {
  const data = req.body;
  console.log("Contact data received:", data);

  // For now, just respond success
  res.status(200).json({ code: 200, message: "Received OK" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});