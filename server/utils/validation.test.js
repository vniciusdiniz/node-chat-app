const expect = require('chai').expect;

var isRealString = require('./validation.js').isRealString;

describe('isRealString', () => {

    it('should allow string with non-space characters', () => {
        var string = '  String Goes Here  ';
        expect(isRealString(string)).to.be.true;
    });
    it('should reject non-string values', () => {
        var nonString = 908;
        expect(isRealString(nonString)).to.be.false;
    });
    it('should reject string with only space', () => {
        var onlySpaceString = '          ';
        expect(isRealString(onlySpaceString)).to.be.false;
    });
    
});