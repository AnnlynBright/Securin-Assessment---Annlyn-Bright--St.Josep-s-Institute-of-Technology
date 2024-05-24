const { MongoClient } = require('mongodb');
require('dotenv').config();
async function fetchMongoData() {

  //const uri = 'mongodb+srv://annlyn:annlyn@atlascluster.aqvozlz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    
    await client.connect();
    
    
    const database = client.db('cv-datas');
    const collection = database.collection('cves');

   
    const query = {};
    const documents = await collection.find(query).toArray();
    console.log(documents)
    
    documents.forEach(document => {
      const usersArray = document.vulnerabilities;
      console.log(usersArray);

    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
  
    await client.close();
  }
}

// Call the function
fetchMongoData();
module.exports = fetchMongoData;