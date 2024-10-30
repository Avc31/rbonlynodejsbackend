import { ObjectId } from 'mongodb';

const getReq = async (req, res, db) => {

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

export default getReq;