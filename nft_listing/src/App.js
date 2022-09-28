import "./App.css"
import fetch from "node-fetch"

var requestOptions = {
    method: "GET",
    redirect: "follow",
}

const apiKey = "8H1QViy-YkE6b1AzV4e7ygdJLJwdtoRG"
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`
const ownerAddr = "0x483526919B929Ef57183BD0e4e7F8ce58F4234c1"
const fetchURL = `${baseURL}?owner=${ownerAddr}`

fetch(fetchURL, requestOptions)
    .then((response) => response.json())
    .then((response) => JSON.stringify(response, null, 2))
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))

function App() {
    return <div className="App"></div>
}

export default App
