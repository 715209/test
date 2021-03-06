import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as compression from "compression";
import * as cors from "cors";
import * as session from "express-session";

// Import routers
import userRouter from "./routers/userRouter";
import publishRouter from "./routers/publishRouter";
import authRouter from "./routers/authRouter";

// Server class
class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    const MONGO_URI = "mongodb://localhost/project44";

    mongoose.connect(
      MONGO_URI || process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: 200,
        reconnectInterval: 2000
      }
    );

    mongoose.connection.on("error", e => {
      console.log(`Mongodb error ${e}`);
    });

    mongoose.connection.on("connected", e => {
      console.log("Mongodb connected");
    });

    mongoose.connection.on("disconnecting", () => {
      console.log("Mongodb disconnecting");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongodb disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("Mongodb reconnected");
    });

    mongoose.connection.on("timeout", e => {
      console.log(`Mongodb timeout ${e}`);
    });

    mongoose.connection.on("close", () => {
      console.log("Mongodb connection closed");
    });

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
    this.app.use(
      session({
        // store: TODO
        name: "sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: !!+process.env.COOKIE_SECURE,
          maxAge: +process.env.COOKIE_MAXAGE,
          httpOnly: true
        }
      })
    );
  }

  public routes(): void {
    let router: express.Router;

    router = express.Router();

    this.app.use("/", router);
    this.app.use("/v1/publish", publishRouter);
    this.app.use("/v1/users", userRouter);
    this.app.use("/v1/auth", authRouter);
  }
}

export default new Server().app;
