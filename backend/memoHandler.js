const { Tagger } = require('./Tagger-config');

const memoHandler = {
  insertNewMemo: async function (text, tags, user) {
    const userId = user._id;
    console.log(userId);

    // check for existing cluster
    if (user.cluster.default) {
      await Tagger.createNewCluster(userId);
    }
  },
};

module.exports = { memoHandler };
