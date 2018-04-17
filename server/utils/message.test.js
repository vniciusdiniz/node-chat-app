const expect = require('chai').expect;
var {
    generateMessage,
    generateLocationMessage
} = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message from jen';
        var message = generateMessage(from, text);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.include({from, text});
    });
});

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        var from = 'Home';
        var lat = 15;
        var lng = 14;
        var url = 'https://www.google.com/maps?q=15,14'
        var locationMsg = generateLocationMessage(from, lat, lng);

        expect(locationMsg.createdAt).to.be.a('number');
        expect(locationMsg).to.include({from, url});
    });
});