const userMock = require('./user');
const thingMock = require('./thing');
const groupMock = require('./group');
const filterMock = require('./filter');
function Mock(app) {
    userMock(app);
    thingMock(app);
    groupMock(app);
    filterMock(app);
}
module.exports = Mock;