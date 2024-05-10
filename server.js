const express = require('express');
const app = express();
const PORT = process.env.PORT || 3888;
const db = require('./db');
const { Post } = require('./models');

// Middleware
app.use(express.static('public'));
app.use(express.json());




// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// app.get('/login',(req,res) =>{
//    res.sendFile(__dirname+'/public/login.html')
// });
// app.get('/signup',(req,res) =>{
//   res.sendFile(__dirname+'/public/signup.html')
// // });
// app.get('/Afterloginindex',(req,res) =>{
//   res.sendFile(__dirname+'/public/Afterloginindex.html')
// });


// Home page route
app.get('/', (req, res) => {
    // If user is authenticated, render the home page with personalized content
    if (req.user) {
      res.send(`<h1>Welcome back, ${req.user.username}!</h1><a href="/logout">Logout</a><br><a href="/blog">Go to Blog</a>`);
    } else {
      // If user is not authenticated, render the login form
      res.send(`
        <h1>Welcome to My Blogging Website</h1>
        <form action="/login" method="post">
          <input type="text" name="username" placeholder="Username" required>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      `);
    }
  });
  

// Route to get all blog posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to create a new blog post
app.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are present
  if (!username || !email || !password) {
    return res.status(400).send('Username, email, and password are required');
  }

  try {
    const newUser = new users1({ username, email, password });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;
//   const newUser = new User({ username, email, password });
//   await newUser.save();
//   res.redirect('/login');
// });

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users1 = await User.findOne({ email, password });
  if (!users1) {
      return res.status(401).send('Invalid email or password');
  }
  res.redirect('/Afterloginindex');
});

// Start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
