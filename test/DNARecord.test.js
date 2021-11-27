/*

The public version of the file used for testing can be found here: https://gist.github.com/ConsenSys-Academy/ce47850a8e2cba6ef366625b665c7fba

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.

*/


const getErrorObj = (obj = {}) => {
  const txHash = Object.keys(obj)[0];
  return obj[txHash];
};
const DNARental = artifacts.require("DNARental");

const ERR_RECORDID_NOT_FOUND = "Record does not exist.";
const ERR_NOT_OWNER = "Ownable: caller is not the owner";


const addRecords = async (instance, tx = {}) => {
  await instance.addDNARecord(
    5, DNARental.Sex.FEMALE, "https://google.com", tx );
  await instance.addDNARecord(
      3, DNARental.Sex.FEMALE, "https://aws.com", tx );
  await instance.addDNARecord(
        52, DNARental.Sex.MALE, "https://microsoft.com", tx );

};

contract("DNARental", function (accounts) {
  const [contractOwner, secondAccount] = accounts;
 

  beforeEach(async () => {
    instance = await DNARental.new();
    await addRecords( instance, { from: contractOwner}); 
  });

 
  it("is owned by owner", async () => {
    assert.equal(
      await instance.owner.call(),
      contractOwner,
      "owner is not correct",
    );
  });

  describe("Functionality", () => { 

    it("add a DNA record", async () => {
      const numRecordsBefore = await instance.getNumRecords();
      var newRecId = await instance.addDNARecord( 25, DNARental.Sex.MALE, "cybermuscle.com", { from: accounts[0] });
      const numRecordsAfter = await instance.getNumRecords();
      
      assert.equal( numRecordsAfter.toNumber(), 
        numRecordsBefore.toNumber() + 1)
    });

    it("fetch a DNA record", async () => {
        try {
        const result = await instance.fetchDNARecord( 2 );
        assert.equal( result[2], "https://microsoft.com", "the expected item was not found",);
      } catch (e) {
        const { error, reason } = getErrorObj(e.data);
        assert.equal(error, "revert");
        assert.equal(reason, ERR_RECORDID_NOT_FOUND);
      }
    });

    it("should not be able to fetch a record that doesn't exist", async () => {
      try {
      const result = await instance.fetchDNARecord( 5 );
      assert.equal( result[2], "https://microsoft.com", "the expected item was not found",);
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_RECORDID_NOT_FOUND);
    }
  });

    it("find a DNA record", async () => {
      const result = await instance.findDNARecord( 52, DNARental.Sex.MALE );
  
      assert.equal( result[0], true, "the expected item was not found",
      );
    });


  });  
})
