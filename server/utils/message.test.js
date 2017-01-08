const expect             = require('expect');


var {messageGenerator,
generateLocationMessage} = require('./message.js');

describe("messageGenerator", ()=>{

  it("should generate the correct message object", ()=>{
    var from    = "Alan";
    var text    = "Test message";
    var message = messageGenerator(from, text);

    expect(200);
    expect(message.from).toBe(from);
    expect(message.createdAt).toBeA('number');

  });
});

describe("generateLocationMessage", ()=>{

  it("should generate correct collection object", ()=>{
    var from      = "Alan";
    var latitude  = 15;
    var longitude = 19;
    var url       = 'https://www.google.com/maps?q=15,19'
    var message   = generateLocationMessage(from, latitude, longitude);

    expect(200);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});