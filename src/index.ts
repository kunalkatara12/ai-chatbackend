import app from "./app";
import { connectToDB } from "./db/connection.db";
// app.get("/", (req: Request, res: Response) => {
//   res.send("Jai Shree Ram");
// });
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 1200;
connectToDB()
  .then(() => {
    // sample response
    app.get("/", (req, res) => {
      res.send("Jai Shree Ram");
    });
    app.listen(port, () => {
      console.log(`Connected to DB 👍 and Port is listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error in connecting to database in index.ts:", err);
  });
