import React from 'react';
import bitcoinVerification from '../../assests/bitcoin-verification.png';
import merkleTree from '../../assests/merkle-tree.png';

const HowItWorks = () => {
  return (
    <main className='how-it-works'>
      <h1 className='title'>
        How To Verify <span>BITCOIN PROOFS</span>
      </h1>
      <div className='bitcoin-proofs'>
        <div className='img'>
          <img src={bitcoinVerification} alt='how to verify bitcoin proofs' />
        </div>
        <p>
          <strong>Bitcoin transaction</strong> data is pulled from a post-segwit
          Bitcoin node using the RPC endpoint. The node must be an archive node.
          Initially, it assumes that it is using a GetBlock node, since they
          offer a free tier node that meets all of the requirements.
        </p>
      </div>

      <div className='merkle-proof'>
        <div className='img'>
          <img src={merkleTree} alt='merkle tree node' />
        </div>
        <p>
          A <span>merkle proof</span> for the transaction is created using the
          <span> merkle tree</span> node module. In the future, it may be
          possible to eliminate this dependency by calling the{' '}
          <strong>gettxoutproof</strong>
          endpoint of<strong> Bitcoin RPC</strong>.
        </p>
        <br />
        <p>
          In order for the Stacks network to verify a proof, it needs to know
          the Stacks block height that corresponds to the block where the
          transaction of interest was recorded on the Bitcoin network.
        </p>
        <br />
        <p>
          The hash values of Bitcoin block headers are available in Clarity
          contracts via <strong>get-burn-block-info</strong> ?. Then, it remains
          to just verify hashes of merkle trees, transactions and block headers.
          There are two main methods which are:
        </p>
        <br />
        <ol>
          <li>
            <strong>Was TX Mined:</strong> This is a top-level verification code
            to determine whether or not a bitcoin transaction was mined in a
            prior bitcoin block. It takes the block header and block height, the
            transaction, and merkle tree proof, and determines that:
          </li>
          <ul>
            <li>
              the block header corresponds to the block that was mined at the
              given bitcoin height
            </li>
            <li>
              The transaction's merkle proof links it to the block header's
              merkle root
            </li>
          </ul>
          <br />
          <p>
            The proof is a list of sibling merkle tree nodes that allow us to
            calculate the parent node from two children nodes in each merkle
            tree level, the depth of the block's merkle tree, and in the index
            in the block in which the given transaction can be found (starting
            from 0) .
          </p>
          <br />
          <p>
            The first element in hashes must be the given transaction's sibling
            transaction's ID. This and the given transaction's txid are hashed
            to calculate the parent hash in the merkle tree, which is then
            hashed with the next hash in the proof, and so on and so forth,
            until the final hash can be compared against the block header's
            merkle root field. The tx-index tells us in which order to hash each
            pair of siblings.
          </p>
          <br />
          <li>
            <strong>Parse Block Header</strong>: This method parses a bitcoin
            block header and returns a tuple structured as followed on success,
            the tuple data includes:
          </li>
          <ul>
            <li>Block Version</li>
            <li>Parent Block Hash</li>
            <li>Merkle root for all this block's transactions</li>
            <li>UNIX epoch timestamp of this block, in seconds</li>
            <li>Compact block difficulty representation</li>
            <li>PoW solution</li>
          </ul>
        </ol>
        <br />
        <h4>Applications that use the clarity bitcoin library:</h4>
        <p>
          <strong>CATARAMAN SWAP</strong>{' '}
          <a
            href='https://docs.catamaranswaps.org/en/latest/'
            rel='noreferrer'
            target='_blank'
          >
            (https://docs.catamaranswaps.org/en/latest/)
          </a>{' '}
          catamaran swap is using the concat method.
        </p>
        <h3>
          MAGIC BRIDGE (LINK AND ABOUT ) is using the parse method <br /> ZEST
          PROTOCOL(LINK AND ABOUT )
        </h3>
      </div>
    </main>
  );
};

export default HowItWorks;
