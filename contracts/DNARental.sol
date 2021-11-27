// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Contract for 'renting' DNA data
/// @author Craig McQueen
/// @notice Allows a users to publish their DNA data and someone else to purchase it.
/// @dev It has been 20 years since I've coded, please excuse my rustiness
contract DNARental is Ownable {
    
    /// @notice Emmitted when a record is added.
    /// @param recordId record id
    event LogRecordAdded(uint indexed recordId, string uri);

    /// @notice Emmitted when a record is rented.
    /// @param recordId record id
    event LogDNARented(uint indexed recordId);

    // Enum for sex of the person DNA belongs to.
    enum Sex { MALE, FEMALE } 

    struct DNARecord {
        uint    recordId;
        uint    age;
        Sex     sex;
        uint    price;
        uint    numRentals;
        string  URI;
        address payable owner;
        }

    uint    recordCounter = 0;
    uint    defaultPrice = 5;

    mapping(uint => DNARecord) internal dnaInventory;

    modifier onlyIfRecordExists(uint recordId) {
    require( recordId <= recordCounter, 
        "Record does not exist.");
    _;
  }

    constructor()  {
    }

    /// @notice Returns the number of records.
    function getNumRecords( )
    public view returns(uint) {
            return recordCounter;
        }

    /// @notice Adds a record to the DNA inventory. 
    /// @param _age Age of the person for the dna record.
    /// @param _sex Sex of the person for the dna record.
    /// @param _URI Location of the DNA record.
    /// @dev For simplicity all DNA is worth the same and hard-coded for price.
    function addDNARecord( uint _age, Sex _sex, 
        string memory _URI 
        ) 
    public returns (uint) {
        
        dnaInventory[recordCounter] = DNARecord({
            recordId:   recordCounter,
            age: _age,
            sex: _sex,
            price: defaultPrice,
            numRentals: 0,
            URI: _URI,
            owner: payable(msg.sender)
        });

        recordCounter = recordCounter + 1;

        emit LogRecordAdded(recordCounter, _URI); 
        return recordCounter;
    }

    /// @notice Finds a record that matches the age and sex.
    /// @param _age Age to match for record.
    /// @param _sex Sex to march for record.
    function findDNARecord( uint _age, Sex _sex )
    public view returns (bool, uint) {
        uint    i = 0;
        bool    found = false;

        do {
            if ( dnaInventory[i].age == _age && dnaInventory[i].sex == _sex ) {
                found = true;
            }
            else {
                i++;
            }
        } while (found == false && i < recordCounter);

        return( found, i );
    }

    /// @notice Fetch a record based on the id.
    /// @param recordId The id of the DNA record to fetch.
     function fetchDNARecord( uint recordId ) public view
    onlyIfRecordExists(recordId)  
    returns ( uint age, Sex sex, string memory uri) {
        age = dnaInventory[recordId].age;
        sex = dnaInventory[recordId].sex;
        uri = dnaInventory[recordId].URI;
        return (age, sex, uri );
    } 

    /// @notice Rent a DNA record.
    /// @param recordId The id of the DNA record to rent.
    function rentDNARecord( uint recordId ) public payable onlyIfRecordExists( recordId ) {

        dnaInventory[recordId].owner.transfer(dnaInventory[recordId].price);
        dnaInventory[recordId].numRentals++;
        // TODO - need to track addresses that rented the DNA
        emit LogDNARented( recordId );
    }

    /// @notice Set inital price.
    /// @param price The default price of DNA records.
    /// @dev Will only be used for records added after price set. Only contract owner can all this.
    function setDefaultPrice( uint price ) public onlyOwner {
        defaultPrice = price;
    }
}