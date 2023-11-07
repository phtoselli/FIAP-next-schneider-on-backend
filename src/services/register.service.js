import model from "../models/register.model.js";
import login from "../models/login.model.js";

async function createNewUser(data){
  if(!data.name || !data.email || !data.password) throw new Error("Dados inválidos.");

  const userExist = await login.findUser(data);

  if(userExist) throw new Error("Usuário já existe!");

  const result = await model.createNewUser(data);
  return result;
}

export default {
  createNewUser,
};