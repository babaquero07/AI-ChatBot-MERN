import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Connections and listeners
const PORT = process.env.PORT || 8090;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Server open & connected to Database"));
  })
  .catch((error) => {
    console.log(error);
    // process.exit(1);
  });
