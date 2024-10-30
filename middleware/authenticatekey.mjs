import 'dotenv/config';

const authenticateKey = (req, res, next) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const apiKey = req.headers['x-api-key'] || url.searchParams.get('apikey');
    //console.log(apiKey)

    if (!apiKey) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'API key is missing' }));
    }

    if (apiKey !== process.env.API_KEY) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid API key' }));
    }

    next();
};

export default authenticateKey;
