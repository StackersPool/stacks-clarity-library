import { hexToBytes } from "@stacks/common";

export const hexStringBtcHash =
  (sha256) => (valueToBeHashed) => {
    // hash twice
    return sha256.x2(hexToBytes(valueToBeHashed));
  };


export class MerkleTree {
  hashes = [];
  hashFunction = undefined;
  constructor(array, hashFunction) {
    this.checkInput(array);
    this.hashFunction = hashFunction;
    this.generateTree(array);
  }

  verify = (
    proof,
    leaf,
    rootHash,
    index,
  ) => {
    let hash = leaf;
    for (let i = 0; i < proof.length; i++) {
      if (index % 2 === 0) {
        hash = this.hashFunction(`${hash}${proof[i]}`);
      } else {
        hash = this.hashFunction(`${proof[i]}${hash}`);
      }
      index = Math.floor(index / 2);
    }
    return hash === rootHash;
  }

  getRootHash = () => {
    return this.hashes.filter(
      (e) =>
        e.level === this.hashes[this.hashes.length - 1].level
    )[0].hashes[0];
  }

  getTreeDepth = () => {
    return this.hashes[this.hashes.length - 1].level;
  }
  
  getProofElements = (investigatedEntryIndex) => {
    let level = 0;
    const levels = this.hashes[this.hashes.length - 1].level;
    let relevantIndex = investigatedEntryIndex;
    const proofElements = [];
    while (level < levels) {
      relevantIndex =
        level === 0
          ? investigatedEntryIndex
          : this.getRelevantIndex(relevantIndex);
      const isLeftNode = relevantIndex % 2 === 0;
      if (isLeftNode) {
        proofElements.push(
          this.hashes.filter((e) => e.level === level)[0].hashes[
            relevantIndex + 1
          ]
        );
        // same level proof comes from right
      } else {
        proofElements.push(
          this.hashes.filter((e) => e.level === level)[0].hashes[
            relevantIndex - 1
          ]
        );
        // same level proof comes from left
      }
      level++;
    }
    return proofElements;
  }

  getHashes = () =>  {
    return this.hashes;
  }

  getRelevantIndex = (previousIndex) => {
    return Math.floor(previousIndex / 2);
  }
  
  generateTree = (array) => {
    let level = 0;
    let itemsOnThisLevel = array;

    while (itemsOnThisLevel.length > 1) {
      itemsOnThisLevel = this.getHashesForLevel(level, itemsOnThisLevel);
      this.hashes.push({ level, hashes: itemsOnThisLevel });
      level++;
    }
  }

  getHashesForLevel = (level, array) => {
    const hashesOnThisLevel = [];
    if (array.length % 2 == 1) {
      array.push(array[array.length - 1]);
    }
    for (let i = 0; i < array.length; i++) {
      if (level === 0) {
        hashesOnThisLevel.push(array[i]);
      } else if (i % 2 === 0) {
        const hash = this.hashFunction(`${array[i]}${array[i + 1]}`);
        hashesOnThisLevel.push(hash);
      }
    }
    return hashesOnThisLevel;
  }

  checkInput = (array) => {}

}
