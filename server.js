const { createServer } = require("http");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();
const dev = app.get("env") !== "production";

app.use(bodyParser.json());
app.use(cors()); // Cross Origin Resource Sharing

/*
    NODE_ENV=production node server.js
*/

// pusher - mongodb 를 실시간 데이터로 보여주기 위해 사용
const Pusher = require("pusher");
const pusher = new Pusher({
    appId: "1101209",
    key: "2e65538689cd28c448d1",
    secret: "365e30ab7a270fa705e6",
    cluster: "ap3",
    useTLS: true,
});

// mongodb connection
mongoose.connect("mongodb+srv://whatsapp_db:1234@cluster0.rxl35.mongodb.net/whatsapp_db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb is connected");

    // Pusher
    const msgCollection = connection.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});

if (!dev) {
    app.disable("x-powered-by");
    app.use(compression());
    app.use(morgan("common"));

    app.use(express.static(path.resolve(__dirname, "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

if (dev) {
    app.use(morgan("dev"));
}

/*
    Route
*/
const dbMessageRouter = require("./server/routes/dbMessages");
const userRouter = require("./server/routes/user");

app.use("/messages", dbMessageRouter);
app.use("/user", userRouter);

const server = createServer(app);
server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`Server started !!`);
});
