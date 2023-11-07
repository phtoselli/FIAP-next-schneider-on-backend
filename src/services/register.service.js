import model from "../models/register.model.js";

async function createNewUser(data){
  if(!data.name || !data.email || !data.password) throw new Error("Dados inválidos.");

  const result = await model.createNewUser(data);
  return result;
}

export default {
  createNewUser,
};