import dotenv from "dotenv";
import { app } from "./express";

dotenv.config();

const port: number = Number(process.env.PORT) || 8001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`);
});
