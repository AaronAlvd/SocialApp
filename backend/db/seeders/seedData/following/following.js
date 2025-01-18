const { following1 } = require('./following1')
const { following2 } = require('./following2')

const following = [...following1, ...following2];

module.exports = { following }