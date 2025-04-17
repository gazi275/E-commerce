import mongoose from "mongoose";
import config from "./App/config";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config.MongoURI as string);
    app.listen(config.Port, () => {
      console.log(`app is listening on port ${config.Port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
