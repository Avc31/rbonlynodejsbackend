import { ObjectId } from 'mongodb';
import authenticateKey from '../middleware/authenticatekey.mjs';

const deleteReq = async (req, res, db) => {

    authenticateKey(req, res, async () => {

        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = url.pathname.split('/').pop();
        const apiKey = req.headers['x-api-key'] || url.searchParams.get("apikey");

        try {
            let result;

            if (url.pathname === `/api/recipes/${id}` && apiKey) {
                const collection = db.collection("recipes");
                result = await collection.deleteOne({ _id: new ObjectId(id) });

            } else if (url.pathname === `/api/users/${id}` && apiKey) {
                const collection = db.collection("users");
                result = await collection.deleteOne({ _id: new ObjectId(id) });

            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Invalid route" }));
            }

            if (result.deletedCount === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `${url.pathname.slice(11, -1)} not found` }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `${url.pathname.slice(11, -1)} deleted successfully` }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Error processing request", error: error.message }));
        }
    })

};

export default deleteReq;
