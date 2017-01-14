const expect         = require('expect');
const {Users}         = require("./users.js");

describe("Chat Room Users", ()=>{
  var users;

  beforeEach(()=>{
    users = new Users();

    users.users = [{
      id:'1',
      name:'Alan',
      room:'Node Course'
    },
    {
      id:'2',
      name:'Carl',
      room:'Node Course'
    },
    {
      id:'3',
      name:'Tin',
      room:'IT Course'
    },
    {
      id:'4',
      name:'Arthur',
      room:'IT Course'
    }]
  });

  it("should add a new user", ()=>{
    var users = new Users();
    var user = {id: '123', name:'Alan', room:'JKD'};

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });


  it("should return the users of Node Course", ()=>{
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Alan', 'Carl']);
  });

  it("should return the users of IT Course", ()=>{
    var userList = users.getUserList('IT Course');

    expect(userList).toEqual(['Tin', 'Arthur']);
  });

  it("should return the user of a given id", ()=>{
    var userId = '2';
    var user   = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it("should not find a user with invalid id", ()=>{
    var userId = '20';
    var user   = users.getUser(userId);
    expect(user).toNotExist();
  });

  it("should remove a user", ()=>{
    var userId = '4';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(3);
  });

  it("should not remove a user", ()=>{
    var userId = '20';
    var user   = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(4);
  });
});