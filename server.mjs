import http from 'http'
import 'dotenv/config';
import getReq from './controllers/getreq.mjs';
import postReq from './controllers/postreq.mjs';
import putReq from './controllers/putreq.mjs';
import connectToDatabase from './connectdb.mjs';


const PORT = process.env.PORT;
const db = await connectToDatabase();

const server = http.createServer(async (req, res) => {

  if (req.method == "GET") {
    getReq(req, res, db);
  } else if (req.method == "POST") {
    postReq(req, res, db);
  } else if (req.method == "PUT") {
    putReq(req, res, db);
  } else if (req.method == "DELETE") {
    deleteReq(req, res, db);
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      title: "not found", message: 'route not found',
    }));
  }


});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
});