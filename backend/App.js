const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const data=require("./data")

const hostname =
  process.env.NODE_ENV == 'development' ? process.env.DEVELOPMENT_HOST : process.env.CLIENT_HOST;
const httpPort = process.env.HTTP_PORT;
const httpsPort = process.env.HTTPS_PORT;

// SSL Configuration (Configure your SSL options here)
const httpsOptions = {
  // ...
};

const app = express();
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
    limit: '50mb',
  })
);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  })
);

// Error handling middleware for invalid environment variables
app.use((req, res, next) => {
  if (!process.env.TOKEN || !process.env.BASEURL) {
    return res.status(500).json({ error: 'Environment variables not set properly' });
  }
  next();
});

app.get('/getResponse', async (req, res) => {
  let page = req.query.page;
  let query = req.query.query;
  let countryId = req.query.countryId;

  const token = process.env.TOKEN;
  return res.status(200).json({ data: data.data });
  try {
    
    const response = await axios.get(`${process.env.BASEURL}&query=${query}&page=${page}&countryId=${countryId}`,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
});

const httpServer = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
  // Run HTTPS server in the production (server/live) environment
  const httpsServer = https.createServer(httpsOptions, app);
  httpsServer.listen(httpsPort, function () {
    console.log('HTTPS App listening on port', httpsPort);
  });
} else {
  // Run HTTP server only in the development (localhost) environment
  const server1 = httpServer.listen(httpPort, 'localhost', function () {
    console.log('HTTP App listening on localhost:', httpPort);
  });
}
