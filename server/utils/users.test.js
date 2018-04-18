const expect = require('chai').expect;
const {Users} = require('./users');



describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Andrew',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Anselmo',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Ana',
            room: 'Node Course'
        }]
    });

    it('should add a new user', () => {
        
        var users = new Users();
        var user = {
            id: '123',
            name: 'Vini',
            room: 'The Office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.deep.equal([user]);
    });

    it('should return names for node course', () => {
        
        var userList = users.getUserList('Node Course');

        expect(userList).to.deep.equal(['Andrew', 'Ana']);
    });

    it('should return names for react course', () => {
        
        var userList = users.getUserList('React Course');

        expect(userList).to.deep.equal(['Anselmo']);
    });

    it('should remove a user', () => {
        var user = {
            id: '99',
            name: 'Vini',
            room: 'Node Course'
        };
        var newUser = users.addUser(user.id, user.name, user.room);
        var removedUser = users.removeUser(newUser.id);
        
        expect(users.users).to.not.include(removedUser);
    });

    it('should not remove a user', () => {
        var idFake = '66666666';
        var removedUser = users.removeUser(idFake);
       
        expect(removedUser).to.be.null;
    });

    it('should find a user', () => {
        var user = {
            id: '66',
            name: 'Vini',
            room: 'Node Course'
        };
        var newUser = users.addUser(user.id, user.name, user.room);
        var userFound = users.getUser(user.id);
        
        expect(userFound).to.equal(newUser);
    });

    it('should not find a user', () => {
        var idFake = 'fake8888'
        var userFound = users.getUser(idFake);

        expect(userFound).to.be.null;
    });
});
