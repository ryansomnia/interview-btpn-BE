
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://ryansomnia:lzhyto2371@ryansomnia.p7unym0.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('MongoDB connection error:', err);
    return;
  }
  console.log('Connected to MongoDB');
});

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, 'secretKey', { expiresIn: '1h' }); 
};
exports.regist = async (req, res) => {

    try {
 
        const { username, password } = req.body;
        const db = client.db('btpn');
        const collection = db.collection('auth')
        let result = await collection.insertOne({ username, password });
        let data = {
          request : req.body,
          result : result,
        }
        console.log('==================result==================');
        console.log(data);
        console.log('====================================');
        res.status(201).json({data});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
exports.login = async (req, res) => {
    const { username, password } = req.body;
  console.log('====================================');
  console.log('login');
  console.log('====================================');
    try {
        await client.connect();
        const db = client.db('btpn');
        const collection = db.collection('user')
        const user = await collection.findOne({ username });
  
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
          }
          if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
          }
          
      const token = jwt.sign({ userId: user._id }, 'a6kh534hk45g54g456u$%$', { expiresIn: '1h' }); 
      let data = {
        request : req.body,
        result : token,
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };


exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, 'a6kh534hk45g54g456u$%$', (err, decoded) => { 
    if (err) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    req.userId = decoded.userId;
    next();
  });
};
