
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


exports.test = async (req, res) => {
  console.log({status:'ok'});
    res.status(200).json({status:'ok'});
  };
exports.createUser = async (req, res) => {
    try {
      const newUser = req.body;
      const db = client.db('btpn');
      const collection = db.collection('user')
      let result = await collection.insertOne(newUser);
      let data = {
        request : newUser,
        result : result,
      }
      console.log('==================result==================');
      console.log(data);
      console.log('====================================');
      res.status(201).json({data});
    } catch (error) {
      console.log('================error====================');
      console.log(error.message);
      console.log('====================================');
      res.status(400).json({ message: error.message });

    }
  };
exports.getAllUser = async (req, res) => {
  try {
    const db = client.db('btpn');
    const collection = db.collection('user'); 
    const users = await collection.find({}).toArray();
    let data = {
      request : '',
      result : users,
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = req.query.userId;  
      const updatedUserData = req.body; // Ambil data pengguna yang ingin diperbarui dari body permintaan

    const db = client.db('btpn');
    const collection = db.collection('user'); 

    // Perbarui data pengguna dengan ID yang cocok
    const result = await collection.findOneAndUpdate (
      { _id: new ObjectId(userId) }, // Gunakan 'new' sebelum ObjectId
      { $set: updatedUserData }, // Atur data pengguna yang ingin diperbarui
      { returnOriginal: false } // Mengembalikan dokumen yang diperbarui, bukan yang lama
    );

    // Periksa apakah pengguna ditemukan
    if (!result) {
      throw new Error('User not found');
    }
    let data = {
      request :req.body,
      result : 'Data Updated !',
    }
    res.status(200).json({data}); // Kirim data pengguna yang diperbarui sebagai respons
  } catch (error) {
    res.status(404).json({ message: error.message }); // Tangani kesalahan
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.query.userId; // Ambil ID pengguna dari parameter query

    const db = client.db('btpn');
    const collection = db.collection('user'); 

    // Hapus pengguna berdasarkan ID yang cocok
    const result = await collection.findOneAndDelete(
      { _id: new ObjectId(userId) } // Gunakan 'new' sebelum ObjectId
    );

    let data = {
      request :userId,
      result : 'User deleted successfully!',
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};