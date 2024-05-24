const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(cors());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function fetchMongoData() {
  await client.connect();
  const database = client.db('cv-datas');
  const collection = database.collection('cves');
  const documents = await collection.find({}).toArray();
  await client.close();
  return documents;
}

async function fetchCVEById(cveId) {
    await client.connect();
    const database = client.db('cv-datas');
    const collection = database.collection('cves');
    const document = await collection.findOne({ "cve.id": cveId });
    await client.close();
    return document;
  }

app.get('/data', async (req, res) => {
  try {
    const data = await fetchMongoData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from MongoDB');
  }
});

app.get('/data/:cveId', async (req, res) => {
    const cveId = req.params.cveId;
    try {
      const cveDetails = await fetchCVEById(cveId);
      if (!cveDetails) {
        return res.status(404).send('CVE ID not found');
      }
      res.json(cveDetails);
    } catch (error) {
      res.status(500).send('Error fetching CVE details from MongoDB');
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
