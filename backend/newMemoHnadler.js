const Tagger = require('./Tagger');

function tagHandler(memoObj) {
  // extract memo properties
  const { memoTxt, tag } = memoObj;
  const memoTags = tag.split(' ');

  const memoId = generateMemoId();
}

function generateMemoId() {
  return 'id';
}

module.exports = tagHandler;
