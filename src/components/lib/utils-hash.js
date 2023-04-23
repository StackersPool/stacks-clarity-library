import { hexToBytes, bytesToHex } from "@stacks/common";
import { sha256 } from "sha256";

export const reversedTxId = (txHex) =>
  sha256(sha256(txHex, "hex", "hex"), "hex", "hex");

export const headerHash = (headerHex) =>
  hexReverse(sha256(sha256(headerHex, "hex", "hex"), "hex", "hex"));

export function hexReverse(hexString) {
  return bytesToHex(hexToBytes(hexString).reverse());
}
