import { ObjectId } from 'mongodb';

const deleteReq = async (req, res, db) => {
    const urlParts = req.url.split('/');
    const collectionType = urlParts[urlParts.length - 2];
    const id = urlParts[urlParts.length - 1];

    try {
        let result;

        if (collectionType === "recipes") {
            const collection = db.collection("recipes");
            result = await collection.deleteOne({ _id: new ObjectId(id) });

        } else if (collectionType === "users") {
            const collection = db.collection("users");
            result = await collection.deleteOne({ _id: new ObjectId(id) });

        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Invalid route" }));
        }

        if (result.deletedCount === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `${collectionType.slice(0, -1)} not found` }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `${collectionType.slice(0, -1)} deleted successfully` }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Error processing request", error: error.message }));
    }
};

export default deleteReq;
