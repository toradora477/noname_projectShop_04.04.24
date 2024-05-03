const { DB, COLLECTIONS } = require('../../common_constants/db');
const { ObjectId } = require('mongodb');
let users = [];

const requestAllUsers = (client) => {
  const collection = client.db(DB).collection(COLLECTIONS.USERS);

  return collection.find({}, { projection: { activityJournal: 0 } }).toArray();
};

const allUsersExport = () => users || [];

const prepareAllUsers = async (client) => {
  users = await requestAllUsers(client);
};

const updateUser = async (req, data) => {
  const _body = { ...data };

  delete _body._id;
  const collection = req.app.locals.client.db(DB).collection(COLLECTIONS.USERS);
  const result = await collection.updateOne({ _id: new ObjectId(data._id) }, { $set: { ..._body } });
  await prepareAllUsers(req.app.locals.client);
  return result;
};

module.exports = {
  allUsersExport,
  prepareAllUsers,
  updateUser,
};
