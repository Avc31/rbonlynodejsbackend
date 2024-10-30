import { ObjectId } from 'mongodb';

const getReq = async (req, res, db) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.pathname.split('/').pop();

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
}

export default getReq;
