const expect         = require('expect');
const {isRealString} = require('./validation.js');


describe("isRealString()", ()=>{
  it("should reject non-string values",()=>{
    var string = {};
    expect(isRealString(string)).toBe(false);
  });

  it("should reject spaces as strings", ()=>{
    var string = "   ";
    expect(isRealString(string)).toBe(false);
  });

  it("should accept proper strings", ()=>{
    var string = "proper string";
    expect(isRealString(string)).toBe(true);
  });
});