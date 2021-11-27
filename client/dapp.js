
const dnaAddress = '0xEC3F02dAeCDCaA47CAD8431DEa09a291092f2373'

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
			"indexed": true,
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
			"indexed": true,
			"internalType": "uint256",
			"name": "recordId",
			"type": "uint256"
		  },
		  {
			"indexed": false,
			"internalType": "string",
			"name": "uri",
			"type": "string"
		  }
		],
		"name": "LogRecordAdded",
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
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  },
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
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "price",
			"type": "uint256"
		  }
		],
		"name": "setDefaultPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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

	let	dnaSex = 0;
	var ele = document.getElementsByName('gender');
              
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked && ele[i].value == "Female")
					dnaSex = 1;
			}

	const   dnaFile = document.getElementById
    ('dnaAdd-input-file').value;

    var web3 = new Web3(window.ethereum)

    const dnaRental = new web3.eth.Contract(dnaABI, dnaAddress);
	
    dnaRental.setProvider(window.ethereum);

	await dnaRental.methods.addDNARecord( dnaAge, dnaSex, dnaFile).
	send({from: ethereum.selectedAddress})

	const numRecords = await dnaRental.methods.getNumRecords().call();
	let   numRecText = document.getElementById('numRecText');
	numRecText.innerHTML = numRecords;
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
	let dnaSex = document.getElementById('dnaFetch-sex')
	dnaSex.innerHTML = result[1].toString();
	let dnaFile = document.getElementById('dnaFetch-file')
	dnaFile.innerHTML = result[2];

}

const dnaBuySubmit = document.getElementById
('dnaBuy-input-button');

dnaBuySubmit.onclick = async () => {
 //   const   dnaId = document.getElementById
   // ('dnaBuy-input-id').value;

  //  var web3 = new Web3(window.ethereum)
  //  const dnaRental = new web3.eth.Contract(dnaABI, dnaAddress);
 //   dnaRental.setProvider(window.ethereum);
//	let result = await dnaRental.methods.rentDNARecord( dnaId ).call({from: ethereum.selectedAddress})
	let dnaRentResult = document.getElementById('dnaRent-result')
	dnaRentResult.innerHTML = "sorry - not implemented yet";

}