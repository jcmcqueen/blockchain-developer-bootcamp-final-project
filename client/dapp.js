console.log("hello")
const dnaAddress = 
//'0x5B867fc0ed89bB2F3Ff9E40c709980f6Fb23E519'
'0x3B7263c6A3ed22C2dAf667193d85b4afF00fc108'
//'0x9Afa32D09BC0AFe1830AF9c63f24Bc5db68066Fe'

const dnaABI =[
    {
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "recordId",
			"type": "uint256"
		  }
		],
		"name": "LogDNARented",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "recordId",
			"type": "uint256"
		  }
		],
		"name": "LogRecordAdded",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "recordId",
			"type": "uint256"
		  }
		],
		"name": "LogRecordFetched",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "recordId",
			"type": "uint256"
		  }
		],
		"name": "LogRecordFound",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "address",
			"name": "previousOwner",
			"type": "address"
		  },
		  {
			"indexed": true,
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		  }
		],
		"name": "OwnershipTransferred",
		"type": "event"
	  },
	  {
		"inputs": [],
		"name": "owner",
		"outputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	  },
	  {
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		  }
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "getNumRecords",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_age",
			"type": "uint256"
		  },
		  {
			"internalType": "enum DNARental.Sex",
			"name": "_sex",
			"type": "uint8"
		  },
		  {
			"internalType": "string",
			"name": "_URI",
			"type": "string"
		  }
		],
		"name": "addDNARecord",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_age",
			"type": "uint256"
		  },
		  {
			"internalType": "enum DNARental.Sex",
			"name": "_sex",
			"type": "uint8"
		  }
		],
		"name": "findDNARecord",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "recordId",
			"type": "uint256"
		  }
		],
		"name": "fetchDNARecord",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "age",
			"type": "uint256"
		  },
		  {
			"internalType": "enum DNARental.Sex",
			"name": "sex",
			"type": "uint8"
		  },
		  {
			"internalType": "string",
			"name": "uri",
			"type": "string"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "recordId",
			"type": "uint256"
		  }
		],
		"name": "rentDNARecord",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
		"payable": true
	  }
	]

window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask detected')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML = "MetaMask Has Been Detected"
    }
    else {
        console.log('MetaMask Not Available')
        this.alert("You need to install MetaMask!")
    }
})

const mmEnable = document.getElementById('mm-connect');

mmEnable.onclick = async( ) => {
    await ethereum.request({ method: 'eth_requestAccounts'})

const mmCurrentAccount = document.getElementById('mm-current-account');

mmCurrentAccount.innerHTML = "Here's you account: " + ethereum.selectedAddress;
}



const dnaSubmit = document.getElementById
('dnaAdd-input-button');

dnaSubmit.onclick = async () => {
    const   dnaAge = document.getElementById
    ('dnaAdd-input-age').value;

	const   dnaFile = document.getElementById
    ('dnaAdd-input-file').value;

    var web3 = new Web3(window.ethereum)

    const dnaRental = new web3.eth.Contract(dnaABI, dnaAddress);
	
    dnaRental.setProvider(window.ethereum);

	await dnaRental.methods.addDNARecord( dnaAge, 1, dnaFile).
	send({from: ethereum.selectedAddress})

//	const numRecords = await dnaRental.methods.getNumRecords()
//	console.log(numRecords[0].toString());
}

const dnaFetchSubmit = document.getElementById
('dnaFetch-input-button');

dnaFetchSubmit.onclick = async () => {
    const   dnaId = document.getElementById
    ('dnaFetch-input-id').value;

    var web3 = new Web3(window.ethereum)

    const dnaRental = new web3.eth.Contract(dnaABI, dnaAddress);
	
    dnaRental.setProvider(window.ethereum);

	let result = await dnaRental.methods.fetchDNARecord( dnaId ).call()

	let dnaAge = document.getElementById('dnaFetch-age')
	dnaAge.innerHTML = result[0];
	let dnaFile = document.getElementById('dnaFetch-file')
	dnaFile.innerHTML = result[2];

}

const dnaBuySubmit = document.getElementById
('dnaBuy-input-button');

dnaBuySubmit.onclick = async () => {
    const   dnaId = document.getElementById
    ('dnaBuy-input-id').value;

    var web3 = new Web3(window.ethereum)

    const dnaRental = new web3.eth.Contract(dnaABI, dnaAddress);
	
    dnaRental.setProvider(window.ethereum);

	let result = await dnaRental.methods.rentDNARecord( dnaId ).call({from: ethereum.selectedAddress})
}