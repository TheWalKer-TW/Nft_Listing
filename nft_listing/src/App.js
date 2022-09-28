import "./App.css"
import fetch from "node-fetch"

var requestOptions = {
    method: "GET",
    redirect: "follow",
}

const apiKey = "8H1QViy-YkE6b1AzV4e7ygdJLJwdtoRG"
const baseURL = `https://eth-goerli.g.alchemy.com/v2/${apiKey}/getNFTs/`
const ownerAddr = "0x483526919B929Ef57183BD0e4e7F8ce58F4234c1"
const fetchURL = `${baseURL}?owner=${ownerAddr}`

async function App() {
    await fetch(fetchURL, requestOptions)
        .then((response) => response.json())
        .then((response) => JSON.stringify(response, null, 2))
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error))

    return <div className="App"></div>
}

module.export = App
