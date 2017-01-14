// addUser(id, username, roomname);
// removeUser(id);
// getUser(id);
// getUserList(roomname);


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
    // return user that was removed
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user)=> user.id !== id);
    }

    return user;
  }

  getUser(id){
    // return this.users.filter((user)=> user.id === id)[0];
    return this.users.filter(function(user){
      return user.id === id;
    })[0];
  }

  getUserList(room){
    // return an array of users ['Alan', 'Carl', 'Tin']
    var users = this.users.filter((user)=>{
      return user.room === room;
    });

    var namesArray = users.map((user)=>{
      return user.name;
    });

    return namesArray;
  }
}

module.exports = {Users};