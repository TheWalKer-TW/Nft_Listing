// alchemy-nft-api/fetch-script.js
import fetch from "node-fetch";

// Setup request options:
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

// Replace with your Alchemy API key:
const apiKey = "8H1QViy-YkE6b1AzV4e7ygdJLJwdtoRG";
const baseURL = `https://eth-goerli.g.alchemy.com/v2/${apiKey}/getNFTs/`;
// Replace with the wallet address you want to query:
const ownerAddr = "0x483526919B929Ef57183BD0e4e7F8ce58F4234c1";
const fetchURL = `${baseURL}?owner=${ownerAddr}`;

// Make the request and print the formatted response:
await fetch(fetchURL, requestOptions)
  .then((response) => response.json())
  .then((response) => JSON.stringify(response, null, 2))
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

console.log(
  "-----------------------------------------------------------------"
);
console.log(
  "-----------------------------------------------------------------"
);

const baseURL2 = `https://eth-goerli.g.alchemy.com/v2/${apiKey}/getNFTMetadata`;
const contractAddr = "0x1c74DC12dA6b105756a9C0E4D49d142d77f90fA0";
const tokenId = "3";
const tokenType = "erc721";
const fetchURL2 = `${baseURL2}?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${tokenType}`;

fetch(fetchURL2, requestOptions)
  .then((response) => response.json())
  .then((response) => JSON.stringify(response, null, 2))
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
