class Users {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var res = null;

        for(var i=0; i< this.users.length; i++){
            if (this.users[i].id === id){
                var res = this.users[i];
                this.users.splice( i, 1);
            }
        }

        return res;
        //this.users = users.filter((user) => user.id !== id);
    }

    getUser(id){
        for(var i=0; i<this.users.length; i++){
            if (this.users[i].id === id){
                return this.users[i];
            }
        }
        return null;
        //return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room){
        var users = this.users.filter((user) => {
            return user.room === room;
        });
        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {Users};

// //ES6 class
// class Person {
//     //consctructor function
//     constructor (name, age){
//         this.name = name;
//         this.age = age;
//     }
//     //method
//     getUserDescription(){
//         return `${this.name} is ${this.age} years old.`
//     }
// }

// var me = new Person('Vinicius', 28);
// console.log(me.getUserDescription());