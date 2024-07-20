const express = require("express");
const axios = require("axios");
const { MongoClient, ServerApiVersion } = require("mongodb");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const cron = require("node-cron");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const uri =
  "mongodb+srv://fomoadmin:fomoadmin@cluster0.tqy62nm.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const coinCodes = ["ETH", "BTC", "LTC"];

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

    if (isFetching) {
      startFetching();
    }

    io.on("connection", async (socket) => {
      console.log("New client connected");

      const allData = [];

      for (const code of coinCodes) {
        try {
          const docs = await collection
            .find({ code })
            .sort({ _id: -1 })
            .limit(20)
            .toArray();

          allData.push({ code, data: docs });
        } catch (err) {
          console.error(`Error fetching data for ${code}:`, err);
        }
      }

      socket.emit("priceUpdate", allData);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  } catch (err) {
    console.error(err);
  }
}

const fetchData = async () => {
  if (!isFetching) return;

  try {
    const allData = [];

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
      await collection.insertOne({ ...data, code });

      const latestDocs = await collection
        .find({ code })
        .sort({ _id: -1 })
        .limit(20)
        .toArray();

      allData.push({ code, data: latestDocs });
    }

    io.emit("priceUpdate", allData);
  } catch (error) {
    console.error("Error fetching data:", error);
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

app.get("/fetching-status", async (req, res) => {
  try {
    const statusDoc = await statusCollection.findOne({
      name: "fetchingStatus",
    });

    if (statusDoc) {
      res.json({ isFetching: statusDoc.isFetching });
    } else {
      res.status(404).json({ message: "Fetching status not found" });
    }
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

cron.schedule("*/15 * * * *", async () => {
  console.log("Testb1");
  try {
    const statusDoc = await statusCollection.findOne({
      name: "fetchingStatus",
    });
    if (statusDoc && statusDoc.isFetching) {
      await axios.post(
        `https://coin-tracker-yel9.onrender.com/toggle-fetching`
      );
    }
  } catch (error) {
    console.error("Error toggling fetching status via cron job:", error);
  }
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  run().catch(console.dir);
});
