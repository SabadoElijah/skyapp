import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xA60d84a44Ea140243e427655CC7C2fD0a248359C", //contract add
        abi as any,
        signer
    );
}