const { DB, COLLECTIONS } = require('../../common_constants/db');

let users = [];

const requestAllUsers = (client) => {
  const collection = client.db(DB).collection(COLLECTIONS.USERS);

  return collection.find({}, { projection: { activityJournal: 0 } }).toArray();
};

const allUsersExport = () => users || [];

const prepareAllUsers = async (client) => {
  users = await requestAllUsers(client);
};

module.exports = {
  allUsersExport,
  prepareAllUsers,
};
