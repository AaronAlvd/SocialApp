const { groupUsers1 } = require('./users1');
const { groupUsers2 } = require('./users2');
const { groupUsers3 } = require('./users3');
const { groupUsers4 } = require('./users4');


const groupUsers00 = [...groupUsers1, ...groupUsers2, ...groupUsers3, ...groupUsers4];

module.exports = { groupUsers00 }