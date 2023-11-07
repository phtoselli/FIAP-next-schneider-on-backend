import path from "path";
import fs from "fs/promises";

const __file = path.resolve("./src/database/users.json");

async function findUser(body){
  const db = await fs.readFile(__file, "utf-8");
  const data = JSON.parse(db);
  const values = Object.values(data);

  const result = values.find((user) => body.email === user.email);

  return result;
}

export default {
  findUser,
};