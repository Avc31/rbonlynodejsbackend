import { ObjectId } from 'mongodb';

const putReq = async (req, res, db) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const urlParts = req.url.split('/');
            const collectionType = urlParts[urlParts.length - 2];
            const id = urlParts[urlParts.length - 1]; 

            if (collectionType === "recipes") {
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

            } else if (collectionType === "users") {
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
};

export default putReq;
