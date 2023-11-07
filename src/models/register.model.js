import path from "path";
import fs from "fs/promises";

const __file = path.resolve("./src/database/users.json");

async function createNewUser(body){
  const db = await fs.readFile(__file, "utf-8");
  const data = JSON.parse(db);
  const keys = Object.keys(data);

  let newUserId = 0;

  if(keys.length > 0) {
    const lastId = keys[keys.length - 1];
    newUserId += Number(lastId) + 1;
  };

  data[newUserId] = {
    name: body.name,
    email: body.email,
    password: body.password
  }

  const data_stringify = JSON.stringify(data, null, 2);

  await fs.writeFile(__file, data_stringify);

  return newUserId;
}

export default {
  createNewUser,
};