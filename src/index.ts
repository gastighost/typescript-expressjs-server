import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";

import connectDb from "./services/mongodb";

import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error-handler";
import userRoutes from "./routes/user-routes";
import productRoutes from "./routes/product-routes";

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
