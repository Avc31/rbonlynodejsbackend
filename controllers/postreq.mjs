import authenticateKey from "../middleware/authenticatekey.mjs";

const postReq = async (req, res, db) => {

    authenticateKey(req, res, async () => {
        let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {

            const data = JSON.parse(body);

            const url = new URL(req.url, `http://${req.headers.host}`);

            const apiKey = req.headers['x-api-key'] || url.searchParams.get("apikey");

            if (url.pathname === "/api/recipes" && apiKey) {

                const collection = db.collection("recipes");
                const result = await collection.insertOne(data);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Recipe added", result }));

            } else if (url.pathname === "/api/users" && apiKey) {

                const collection = db.collection("users");
                const result = await collection.insertOne(data);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "User added", result }));

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

export default postReq;