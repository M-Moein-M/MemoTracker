// initializing Tagger and handling required database functions for Tagger
const T = require('./Tagger');

// user database
const { User } = require('./database');

async function insertDoc(cluster, clusterID) {
  // update default cluster with the new cluster
  await User.updateOne({ _id: clusterID }, { cluster: cluster }, (err, doc) => {
    if (err) throw err;
  });
}

async function updateDoc(clusterID, cluster) {
  await User.updateOne({ _id: clusterID }, { cluster: cluster }, (err, doc) => {
    if (err) throw err;
  });
}

const Tagger = new T(insertDoc, updateDoc, 'id', 'id');

module.exports = { Tagger };
