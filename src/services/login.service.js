import model from "../models/login.model.js";

async function findUser(data){
  if(!data.email || !data.password) throw new Error("Dados inválidos.");

  const result = await model.findUser(data);

  if(!result || result.password !== data.password) throw new Error("Usuário não encontrado!");

  delete result.password;

  return result;
}

export default {
  findUser,
};