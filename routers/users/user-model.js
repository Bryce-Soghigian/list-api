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
  
  function find() {
    return db.select('*').from('users');
  }
  function findBy(filter) {
      return db('users').where(filter);
  }
  
  async function add(user) {
      const [ id ] = await db('users').insert(user);
      return findById(id);
  }
  
  function findById(id) {
      return db('users').where({ id }).first();
  }
  function getUsers() {
    return db("users");
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