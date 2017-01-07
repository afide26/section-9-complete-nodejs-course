const expect           = require('expect');


var {messageGenerator} = require('./message.js');

describe("messageGenerator", ()=>{

  it("should generate the correct message object", ()=>{
    var message = messageGenerator("alan@egg.com", "Test message");

    expect(200);
    expect((message)=>{
      expect(message.body.from).toBe("alan@egg.com");
      expect(message.body.text).toBe("Test message");
      expect(message.body.createdAt).toBeA("number");
    });
  });
});