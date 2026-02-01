import { app } from "./app";
app.listen(3000, () => console.log("running"));
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

