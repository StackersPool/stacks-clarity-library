// Stacks.js imports
import { showConnect, AppConfig, UserSession } from "@stacks/connect-react";
import { StacksMainnet } from "@stacks/network";
import { bufferCV, callReadOnlyFunction, cvToString, listCV, tupleCV, uintCV, } from "@stacks/transactions";
import { hexToBytes, intToBytes } from "@stacks/common";
// Extended
import sha256 from "sha256";
import axios from "axios";
// Extended by Friedger
import { hexReverse } from "../components/lib/utils-hash";
import { MerkleTree, hexStringBtcHash, } from "../components/lib/utils-merkleTree";

export const appInfo = {
    name: 'T.S.C.B.L',
    icon: window.location.origin + '/logo.png'
}

const appConfig = new AppConfig(['store_write', 'publish']);
export const userSession = new UserSession({ appConfig });

export const userData = () => {
    return userSession.loadUserData();
}

export const wallet = {
    userData: async () => {
        return {
            name: userData.profile.name,
            bns: await axios.get(`https://api.mainnet.hiro.so/v1/addresses/stacks/${userData.profile.stxAddress.mainnet}`).then((data) => { return data }),
            stx: userData.profile.stxAddress.mainnet,
            btc: userData.decentralizedID.split(':')[2],
            image: userData.profile.image,
        }
    },
    login: () => {
        showConnect({
            appDetails: {
                name: appInfo.name,
                icon: appInfo.icon
            },
            redirectTo: '/',
            onFinish: () => {
                console.log('Connection success');
                window.location.reload();
            },
            onCancel: () => {
                console.log('Connection cancel');
            },
            userSession,
        })
    },
    logout: () => {
        userSession.signUserOut();
        window.location.reload();
    },
    transaction: {
        getWasTxMined: async (btc_txID) => {
            // Get BTC txid info
            const txDetails = (await axios.get(`https://btc.getblock.io/rest/tx/1015a8d3-1f41-4d2b-9bdc-0f4c917ae94d/${btc_txID}.json`)).data;
            // Gets block info
            const block = (await axios.get(`https://btc.getblock.io/rest/block/1015a8d3-1f41-4d2b-9bdc-0f4c917ae94d/${txDetails.blockhash}.json`)).data;

            console.log({ txDetails });
            console.log({ block });

            // Smart contract call args value construct
            const txIndex = block.tx
                .map((tx) => tx.txid)
                .findIndex((t) => t === btc_txID);
            console.log("tx index:", txIndex);

            const headerCV = tupleCV({
                version: bufferCV(intToBytes(block.version, false, 4).reverse()),
                parent: bufferCV(hexToBytes(block.previousblockhash).reverse()),
                "merkle-root": bufferCV(hexToBytes(block.merkleroot).reverse()),
                timestamp: bufferCV(intToBytes(block.time, false, 4).reverse()),
                nbits: bufferCV(hexToBytes(block.bits).reverse()),
                nonce: bufferCV(intToBytes(block.nonce, false, 4).reverse()),
            });

            let options = {
                contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
                contractName: "clarity-bitcoin-helper",
                functionName: "concat-header",
                functionArgs: [headerCV],
                network: new StacksMainnet(),
                senderAddress: userSession.loadUserData().profile.stxAddress.mainnet,
            };

            const headerBuffCV = await callReadOnlyFunction(options);

            const merkleTree = new MerkleTree(
                block.tx.map((t) => hexReverse(t.txid)),
                hexStringBtcHash(sha256)
            );
            const proofElements = merkleTree.getProofElements(txIndex);
            const treeDepth = merkleTree.getTreeDepth();

            options = {
                contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
                contractName: "clarity-bitcoin-lib-v2",
                functionName: "was-tx-mined-compact",
                functionArgs: [
                    uintCV(block.height),
                    bufferCV(hexToBytes(txDetails.hex)),
                    headerBuffCV,
                    tupleCV({
                        "tx-index": uintCV(txIndex),
                        hashes: listCV(proofElements.map((pe) => bufferCV(hexToBytes(pe)))),
                        "tree-depth": uintCV(treeDepth),
                    }),
                ],
                network: new StacksMainnet(),
                senderAddress: userSession.loadUserData().profile.stxAddress.mainnet,
            };

            try {
                const result = await callReadOnlyFunction(options);
                console.log("was-tx-mined", cvToString(result));
            } catch (error) {
                console.log(error);
            }
        }
    }
}