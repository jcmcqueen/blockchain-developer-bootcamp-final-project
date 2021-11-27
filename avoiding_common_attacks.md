// avoiding common attacks

## SWC-103 (Floating pragma)

Specific compiler pragma '>=0.5.0' used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## Modifiers used only for validation

All modifiers in contract(s) only validate data with `require` statements.

## Saving gas

The functions `getNumRecords` and `fetchDNARecord` are marked as view and accessed through call so as to not invoked a transaction and therefore save gas.