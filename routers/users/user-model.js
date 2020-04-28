const db = require("../../config/knex-config")


module.exports = {
  getUsers,
  find,
  add,
  findBy,
  findById,
  addUser,
  updateUser,
  deleteUser
};
//======Returns all users======//
function find() {
  return db.select('*').from('users');
  
}

async function add(user) {
	const [ id ] = await db('users').insert(user);

	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}

function addUser(newUser) {
  return db("users").insert(newUser, "id");
}
function updateUser(changes, id) {
    return db("users")
      .update(changes)
      .where({ id });
  }
  
  function deleteUser(id) {
    return db("users")
      .del()
      .where({ id });
  }