const userMock = require('./user');
const thingMock = require('./thing');
const groupMock = require('./group');
const filterMock = require('./filter');
const designerMock = require('./designer');
function Mock(app) {
    userMock(app);
    thingMock(app);
    groupMock(app);
    filterMock(app);
    designerMock(app);
}
module.exports = Mock;