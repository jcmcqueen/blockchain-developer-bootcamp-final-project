// design patterns


## Access Control Design Patterns

- `Ownable` design pattern used in the functions: `setDefaultPrice()`. With expansion of the functionality of the contract in the future there would be other administrative functions only allowed by the owner

## Inheritance
- `DNARental` contract inherits the OpenZeppelin `Ownable` contract to enable ownership for one managing user/party.