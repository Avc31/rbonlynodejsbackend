import 'dotenv/config';

const authenticateKey = (req, res, next) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const apiKey = req.headers['x-api-key'] || url.searchParams.get('apikey');
    //console.log(apiKey)

    console.log(req.method);

    if (!apiKey) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'API key is missing' }));
    }

    if (req.method === "GET") {
        if (apiKey !== process.env.GET_API_KEY) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Invalid API key' }));
        }
    } else if (req.method === "POST") {
        if (apiKey !== process.env.POST_API_KEY) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Invalid API key' }));
        }
    } else if (req.method === "PUT") {
        if (apiKey !== process.env.PUT_API_KEY) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Invalid API key' }));
        }
    } else if (req.method === "DELETE") {
        if (apiKey !== process.env.DELETE_API_KEY) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Invalid API key' }));
        }
    }


    next();
};

export default authenticateKey;
