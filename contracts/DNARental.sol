// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Contract for 'renting' DNA data
/// @author Craig McQueen
/// @notice It has been 20 years since I've coded, please excuse my rustiness

contract DNARental is Ownable {
    
    /// @notice Emmitted when a record is added.
    /// @param recordId record id
    event LogRecordAdded(uint recordId);

    /// @notice Emmitted when a record is found.
    /// @param recordId record id
    event LogRecordFetched(uint recordId);


    /// @notice Emmitted when a record is found.
    /// @param recordId record id
    event LogRecordFound(uint recordId);

    /// @notice Emmitted when a record is found.
    /// @param recordId record id
    event LogDNARented(uint recordId);

    // <enum State: ForSale, Sold, Shipped, Received>
    enum State { ForSale, Sold, Shipped, Received } // Enum
    enum Sex { MALE, FEMALE } // Enum

    struct DNARecord {
        uint    recordId;
        uint    age;
        uint    price;
        Sex     sex;
        State   state;
        string  URI;
        address payable owner;
        }

    struct Rental {
        uint timestamp;
        uint amount;
        address renter;
    }
    uint    private recordCounter = 0;

 
    mapping(uint => DNARecord) public dnaInventory;

    modifier onlyIfRecordExists(uint recordId) {
    require( recordId <= recordCounter , 
        "Record does not exist.");
    _;
  }

    constructor()  {}

    /// @notice Adds a record to a given property id
    /// @dev Check for exact payment sum to avoid having to send ETH back to sender
 
    function addDNARecord( uint _age, Sex _sex, 
        string memory _URI 
        ) 
    public onlyOwner returns (uint) {
        uint newRecordId = recordCounter + 1;

        DNARecord memory newRecord = DNARecord({
            recordId:   newRecordId,
            age: _age,
            sex: _sex,
            price: 5,
            state: State.ForSale,
            URI: _URI,
            owner: payable(msg.sender)
        });

        recordCounter = newRecordId;

        dnaInventory[newRecord.recordId] = newRecord;
        emit LogRecordAdded(newRecord.recordId); 
        return newRecordId;
    }

    function findDNARecord( uint _age, Sex _sex )
    public returns (uint256) {
        uint    returnValue = 0;

        for ( uint i=1 ; i <= recordCounter; i++ ) {
            if ( dnaInventory[i].age == _age && dnaInventory[i].sex == _sex )
            {
                emit LogRecordFound( i );
                returnValue = i;
                break;
            }
        }
        return( returnValue );
    }

  

    function fetchDNARecord( uint recordId ) public 
    onlyIfRecordExists(recordId)  
    returns ( uint age, Sex sex, string memory uri) {
        age = dnaInventory[recordId].age;
        sex = dnaInventory[recordId].sex;
        uri = dnaInventory[recordId].URI;
        emit LogRecordFetched(recordId);
        return (age, sex, uri );
    } 

    function rentDNARecord( uint recordId ) public payable onlyIfRecordExists( recordId ) {

        dnaInventory[recordId].owner.transfer(dnaInventory[recordId].price);
        emit LogDNARented( recordId );
    }
}