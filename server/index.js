const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ClientSession,
} = require("mongodb");
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@simple-del.4ijtj0g.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //collection
    const userListCollection = client.db("todo-list").collection("user-list");

    //--------------------------
    //        API - Route
    //--------------------------

    // list related apis
    app.get("/list", async (req, res) => {
      const result = await userListCollection.find().toArray();
      res.send(result);
    });
    app.post("/post", async (req, res) => {
      const listData = req.body.list;
      const result = await userListCollection.insertOne({ item: listData }); // Wrap the data in an object
      res.send(result);
    });
    app.put("/edit", async (req, res) => {
      const body = req.body.list;
      const id = req.query.id;
      const result = await userListCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { item: body } }
      );
      res.send(result);
    });
    app.delete("/delete", async (req, res) => {
      const id = req.query.id;
      const result = await userListCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    // ends
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// routes
app.get("/", (req, res) => {
  res.send("simple CRUD");
});
app.listen(port, () => {
  console.log(`simple CRUD listening on ${port}`);
});
