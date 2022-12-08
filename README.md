# BKCrypto_FrontEnd

**Offical website:**
- http://194.146.12.190:3000/

**Demo Third-party Wine Seller Website:**
- https://wine-seller-app.vercel.app/

## **User guide**
### Login as admin/issuer:
- Go to /login page, click _"Import Mnemonic"_
- Input the following 12-phrase mnemonic:
    ```
    1.awesome  2.chat  3.share  4.arctic  5.satoshi  6.erosion  
    7.planet  8.wave  9.hollow  10.will  11.three  12.involve
    ```
- Connect metamask with the contract owner's public key provided in the file ```src/constants```
- Sign transactions ```publish```, ```revoke```, ```unrevoke``` with metamask

### Login as user:
- Register to the platform
- Create new identity and claim it and wait for the activation from the issuer.
- Create proofs
- Test proofs via BKCrypt0 or the Wine Seller App provided above

## **Developer guide**

**Installation requirement:**
- Node v14+

**Executional steps:**
- `npm i`
- `npm start`
