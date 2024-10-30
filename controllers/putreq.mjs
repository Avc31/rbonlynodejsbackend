import { ObjectId } from 'mongodb';
import authenticateKey from '../middleware/authenticatekey.mjs';

const putReq = async (req, res, db) => {

    authenticateKey(req, res, async () => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);

                const url = new URL(req.url, `http://${req.headers.host}`);
                const id = url.pathname.split('/').pop();
                const apiKey = req.headers['x-api-key'] || url.searchParams.get("apikey");

                if (url.pathname === `/api/recipes/${id}` && apiKey) {
                    const collection = db.collection("recipes");
                    const result = await collection.updateOne(
                        { _id: new ObjectId(id) },
                        { $set: data }
                    );
                    if (result.matchedCount === 0) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Recipe not found" }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Recipe updated successfully", result }));
                    }

                } else if (url.pathname === `/api/users/${id}` && apiKey) {
                    const collection = db.collection("users");
                    const result = await collection.updateOne(
                        { _id: new ObjectId(id) },
                        { $set: data }
                    );
                    if (result.matchedCount === 0) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "User not found" }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "User updated successfully", result }));
                    }

                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Invalid route" }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Error processing request", error: error.message }));
            }
        });
    })

};

export default putReq;
