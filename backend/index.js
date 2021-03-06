import app from "./server.js"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"

dotenv.config()

const port = process.env.PORT || 8000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
