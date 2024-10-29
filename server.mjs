import http from 'http'
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

import 'dotenv/config';

const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db('recipe_book'); // database name
  } catch (error) {
    console.error("Could not connect to MongoDB Atlas:", error);
    throw error;
  }
}

const db = await connectToDatabase();

const getReq = async (req, res) => {

  const urlParts = req.url.split('/');
  const collectionType = urlParts[urlParts.length - 2];
  const id = urlParts[urlParts.length - 1];

  if (req.url === "/api/recipes") {

    const collection = db.collection("recipes");  // collection name
    const data = await collection.find({}).toArray();
    //const data = await collection.find({"title": "Gulab Jamun"},  { projection: { reviews: 1, _id: 0, title: 1 } }).toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

  } else if (req.url === "/api/users") {

    const collection = db.collection("users");  // collection name
    const data = await collection.find({}).toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

  } else if (req.url === `/api/recipes/${id}`) {

    const collection = db.collection("recipes");  // collection name
    const data = await collection.find({ _id: new ObjectId(id) }).toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

  } else if (req.url === `/api/users/${id}`) {

    const collection = db.collection("users");  // collection name
    const data = await collection.find({ _id: new ObjectId(id) }).toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

  } else {

    res.end(JSON.stringify({
      title: "not found", message: 'route not found',
    }));

  }

}



const server = http.createServer(async (req, res) => {

  if (req.method == "GET") {
    getReq(req, res);
  } else if (req.method == "POST") {
    postReq(req, res);
  } else if (req.method == "PUT") {
    putReq(req, res);
  } else if (req.method == "DELETE") {
    deleteReq(req, res);
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      title: "not found", message: 'route not found',
    }));
  }


});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
});