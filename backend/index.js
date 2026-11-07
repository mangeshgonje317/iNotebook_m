const connectToMongo =require('./db');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors(
  {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"],
    credentials: true
  }
))
app.use(express.json());
// available routes
app.get("/", (req, res) => {
  res.send("welcome to my server");
});
app.use('/api/auth',require('./routes/auth'))
app.use('/api/Notes',require('./routes/Notes'))

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => {
      console.log(`iNotebook backend listening on port ${port}`)
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exitCode = 1;
  }
};

startServer();
