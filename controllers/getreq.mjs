import { ObjectId } from 'mongodb';
import authenticateKey from '../middleware/authenticatekey.mjs';

const getReq = async (req, res, db) => {
  
  authenticateKey(req, res, async () => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop();
    console.log(id)
    const apiKey = req.headers['x-api-key'] || url.searchParams.get("apikey");

    if (url.pathname === "/api/recipes" && apiKey) {
      const collection = db.collection("recipes");
      const data = await collection.find({}).toArray();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));

    } else if (url.pathname === "/api/users" && apiKey) {
      const collection = db.collection("users");
      const data = await collection.find({}).toArray();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));

    } else if (url.pathname === `/api/recipes/${id}` && apiKey) {
      const collection = db.collection("recipes");
      const data = await collection.findOne({ _id: new ObjectId(id) });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data || { message: "Recipe not found" }));

    } else if (url.pathname === `/api/users/${id}` && apiKey) {
      const collection = db.collection("users");
      const data = await collection.findOne({ _id: new ObjectId(id) });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data || { message: "User not found" }));

    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ title: "not found", message: 'route not found' }));
    }

  })
}

export default getReq;
