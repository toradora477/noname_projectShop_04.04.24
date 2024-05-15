const { DB, COLLECTIONS } = require('../../common_constants/db');
const { ObjectId } = require('mongodb');
let users = [];

const requestAllUsers = (client) => {
  const collection = client.db(DB).collection(COLLECTIONS.USERS);

  return collection.find({}).toArray();
};

const allUsersExport = () => users || [];


const prepareAllUsers = async (client) => {
  users = await requestAllUsers(client);
};

const updateAccounts = async (req, data, collectionName) => {
  const _body = { ...data };

  delete _body._id;
  const collection = req.app.locals.client.db(DB).collection(collectionName);
  const result = await collection.updateOne({ _id: new ObjectId(data._id) }, { $set: { ..._body } });
  if (collectionName === COLLECTIONS.USERS) await prepareAllUsers(req.app.locals.client);
  return result;
};

module.exports = {
  allUsersExport,
  prepareAllUsers,
  updateAccounts,
};
