import { useState } from "react"
import { NFTCard } from "../components/nftCard"

const Home = () => {
    const [wallet, setWalletAddress] = useState("")
    const [collection, setCollectionAddress] = useState("")
    const [NFTs, setNFTs] = useState([])
    const [fetchForCollection, setFetchForCollection] = useState(false)
    const [chain, setChain] = useState("eth")

    const fetchNFTs = async () => {
        console.log("Fetching nfts...")

        var requestOptions = {
            method: "GET",
            redirect: "follow",
        }

        const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

        let baseURL
        switch (chain) {
            case "eth":
                baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`
                break
            case "polygon":
                baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/`
                break
            case "goerli":
                baseURL = `https://eth-goerli.g.alchemy.com/v2/${apiKey}/getNFTs/`
                break
            default:
                baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`
                break
        }
        console.log("BaseURL: " + baseURL)

        let nfts
        if (!collection.length) {
            console.log("Fetching nfts owned by address...")

            const fetchURL = `${baseURL}?owner=${wallet}`
            console.log("Fetching URL: " + fetchURL)

            nfts = await fetch(fetchURL, requestOptions)
                .then((data) => data.json())
                .catch((error) => console.log("error", error))
        } else {
            console.log("Fetching nfts for collection owned by address...")

            const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
            console.log("Fetching URL: " + fetchURL)

            nfts = await fetch(fetchURL, requestOptions)
                .then((data) => data.json())
                .catch((error) => console.log("error", error))
        }

        if (nfts) {
            console.log("NFTs:", nfts)
            setNFTs(nfts.ownedNfts)
        }
    }

    const fetchNFTsForCollection = async () => {
        if (collection.length) {
            var requestOptions = {
                method: "GET",
            }

            const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

            let baseURL
            switch (chain) {
                case "eth":
                    baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection/`
                    break
                case "polygon":
                    baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTsForCollection/`
                    break
                case "goerli":
                    baseURL = `https://eth-goerli.g.alchemy.com/v2/${apiKey}/getNFTsForCollection/`
                    break
                default:
                    baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection/`
                    break
            }
            console.log("BaseURL: " + baseURL)

            const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`
            console.log("Fetching URL: " + fetchURL)

            const nfts = await fetch(fetchURL, requestOptions)
                .then((data) => data.json())
                .catch((error) => console.log("error", error))

            if (nfts) {
                console.log("NFTs in collection:", nfts)
                setNFTs(nfts.nfts)
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 gap-y-3">
            <div className="flex flex-col w-full justify-center items-center gap-y-2">
                <input
                    onChange={(e) => {
                        setWalletAddress(e.target.value)
                    }}
                    value={wallet}
                    type={"text"}
                    placeholder="Add your wallet address"
                ></input>{" "}
                <input
                    onChange={(e) => {
                        setCollectionAddress(e.target.value)
                    }}
                    value={collection}
                    type={"text"}
                    placeholder="Add the collection address"
                ></input>
                <label className="text-gray-600 ">
                    <input
                        onChange={(e) => {
                            setFetchForCollection(e.target.checked)
                        }}
                        type={"checkbox"}
                        className="mr-2"
                    ></input>
                    Fetch for collection
                </label>
                <label>
                    Choose a chain:
                    <select value={chain} onChange={(e) => setChain(e.target.value)}>
                        <option value="eth">Ethereum</option>
                        <option value="polygon">Polygon</option>
                        <option value="goerli">Goerli</option>
                    </select>
                </label>
                <button
                    className={
                        "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
                    }
                    onClick={() => {
                        console.log("Clicked!")
                        console.log(fetchForCollection)
                        if (fetchForCollection) {
                            fetchNFTsForCollection()
                        } else fetchNFTs()
                    }}
                >
                    Let's go!{" "}
                </button>
            </div>

            <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
                {NFTs.length &&
                    NFTs.map((nft) => {
                        return <NFTCard nft={nft}></NFTCard>
                    })}
            </div>
        </div>
    )
}

export default Home
