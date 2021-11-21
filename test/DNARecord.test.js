/*

The public version of the file used for testing can be found here: https://gist.github.com/ConsenSys-Academy/ce47850a8e2cba6ef366625b665c7fba

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.

*/

let DNARental = artifacts.require("DNARental");

const addRecords = async (instance, tx = {}) => {
  await instance.addDNARecord(
    5, DNARental.Sex.FEMALE, "https://google.com", tx );
  await instance.addDNARecord(
      3, DNARental.Sex.FEMALE, "https://aws.com", tx );
  await instance.addDNARecord(
        52, DNARental.Sex.MALE, "https://microsoft.com", tx );

};

contract("DNARental", function (accounts) {
  const [contractOwner, alice] = accounts;
 

  beforeEach(async () => {
    instance = await DNARental.new();
    await addRecords( instance, { from: contractOwner}); 
  });

 
  it("is owned by owner", async () => {
    assert.equal(
      // Hint:
      //   the error `TypeError: Cannot read property 'call' of undefined`
      //   will be fixed by setting the correct visibility specifier. See
      //   the following two links
      //   1: https://docs.soliditylang.org/en/v0.8.5/cheatsheet.html?highlight=visibility#function-visibility-specifiers
      //   2: https://docs.soliditylang.org/en/v0.8.5/contracts.html#getter-functions
      await instance.owner.call(),
      contractOwner,
      "owner is not correct",
    );
  });

  it("add a DNA record", async () => {
    await instance.addDNARecord( 34, DNARental.Sex.MALE, "cybermuscle.com", { from:contractOwner});
    
    const result = await instance.fetchDNARecord.call(4);
 
    assert.equal( result[0], 34, "the age of the last item does not match the expected value",
    );
  });

  it("find a DNA record", async () => {
    const result = await instance.findDNARecord( 74, DNARental.Sex.MALE );
 
     assert.notEqual( result[0], 0, "the expected item was not found",
    );
  });

  it("rent a DNA record", async () => {
    const result = await instance.rentDNARecord( 1 );
 
 //    assert.notEqual( result[0], 0, "the expected item was not found",
   
  });
  
});
