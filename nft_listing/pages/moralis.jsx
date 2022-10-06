import { useState } from "react"
import { NFTCard } from "../components/nftCard"
import axios from "axios"

const MoralisPage = () => {
    const [wallet, setWalletAddress] = useState("")
    const [collection, setCollectionAddress] = useState("")
    const [NFTs, setNFTs] = useState([])
    const [fetchForCollection, setFetchForCollection] = useState(false)
    const [chain, setChain] = useState("")

    const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY

    // This function checks if it's needed to do a resync and does it in that case
    const checkReSyncNeeded = async (arrayNFTs = NFTs) => {
        console.log("Checking if reSyncMetadata is necessary...")
        const imageUriArray = arrayNFTs.map((nft) => JSON.parse(nft.metadata).image)
        console.log(imageUriArray)

        const duplicates = imageUriArray.filter(
            (nftUri, index) => imageUriArray.indexOf(nftUri) != index
        )

        console.log(duplicates)
    }

    const fetchNFTs = async () => {
        console.log("Fetching NFTs data...")

        const options = {
            method: "GET",
            url: `https://deep-index.moralis.io/api/v2/${wallet}/nft`,
            params: { chain: "goerli", format: "decimal" },
            headers: { accept: "application/json", "X-API-Key": apiKey },
        }

        axios
            .request(options)
            .then(function (response) {
                console.log("Request made, getting&setting data...")
                console.log(response.data)
                setNFTs(response.data.result)
                console.log(`NFTs data: `)
                console.log(NFTs)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const reSyncMetadata = async () => {
        console.log("ReSync NFTs metadata...")

        const options = {
            method: "GET",
            url: `https://deep-index.moralis.io/api/v2/nft/${nftAddress}/${tokenId}/metadata/resync`,
            params: { chain: "eth", flag: "uri", mode: "async" },
            headers: { accept: "application/json", "X-API-Key": apiKey },
        }

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.error(error)
            })
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
                <button
                    className={
                        "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
                    }
                    onClick={() => {
                        console.log("Clicked!")
                        if (fetchForCollection) {
                            fetchNFTsForCollection()
                        } else {
                            setWalletAddress("0x483526919B929Ef57183BD0e4e7F8ce58F4234c1")
                            fetchNFTs()
                        }
                    }}
                >
                    Let's go!{" "}
                </button>
                <button
                    className={
                        "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
                    }
                    onClick={() => {
                        console.log("Clicked 2!")
                        checkReSyncNeeded(NFTs)
                    }}
                >
                    Let's go 2!{" "}
                </button>
            </div>

            <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
                {/* {NFTs.length ? reSyncNeeded(NFTs) : <div>Not working</div>} */}
                {/* &&  NFTs.map((nft) =>{" "} */}
                {/* {
                        return <NFTCard nft={nft}></NFTCard>
                    })
                } */}
            </div>
        </div>
    )
}

export default MoralisPage
