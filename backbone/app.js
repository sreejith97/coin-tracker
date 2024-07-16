const express = require("express");
const axios = require("axios");
const { MongoClient, ServerApiVersion } = require("mongodb");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const uri =
  "mongodb+srv://fomoadmin:fomoadmin@cluster0.tqy62nm.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const coinCodes = ["ETH", "BTC", "LTC"]; // Array of coin codes

let collection;
let statusCollection;
let isFetching = false;
let fetchInterval;

app.use(express.json());

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const db = client.db("priceTracker");
    collection = db.collection("prices");
    statusCollection = db.collection("status");

    // Initialize status
    const statusDoc = await statusCollection.findOne({
      name: "fetchingStatus",
    });
    if (statusDoc) {
      isFetching = statusDoc.isFetching;
    } else {
      await statusCollection.insertOne({
        name: "fetchingStatus",
        isFetching: false,
      });
    }

    // Start fetching data if isFetching is true
    if (isFetching) {
      startFetching();
    }
  } catch (err) {
    console.error(err);
  }
}

const fetchData = async () => {
  if (!isFetching) return;

  try {
    for (const code of coinCodes) {
      const response = await axios.post(
        "https://api.livecoinwatch.com/coins/single",
        {
          currency: "USD",
          code,
          meta: true,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": "262cdd08-7426-4ad2-bad7-1632f63a434a",
          },
        }
      );

      const data = response.data;
      await collection.insertOne(data);
      io.emit("priceUpdate", data);
    }
  } catch (error) {
    console.error(error);
  }
};

const startFetching = () => {
  if (!fetchInterval) {
    fetchInterval = setInterval(fetchData, 10000);
  }
};

const stopFetching = () => {
  if (fetchInterval) {
    clearInterval(fetchInterval);
    fetchInterval = null;
  }
};

app.post("/toggle-fetching", async (req, res) => {
  isFetching = !isFetching;

  await statusCollection.updateOne(
    { name: "fetchingStatus" },
    { $set: { isFetching } }
  );

  if (isFetching) {
    startFetching();
  } else {
    stopFetching();
  }

  res.json({ isFetching });
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send latest data to newly connected client
  collection
    .find()
    .sort({ _id: -1 })
    .limit(5)
    .toArray((err, docs) => {
      if (err) {
        console.error(err);
        return;
      }
      docs.forEach((doc) => socket.emit("priceUpdate", doc));
    });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  //   res.send("Real-time price tracker");

  res.sendFile(__dirname + "/public/index.html");
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  run().catch(console.dir); // Connect to MongoDB and start the fetch process
});
