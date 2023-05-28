import React, { useEffect } from 'react';
import bitcoinVerification from '../../assests/bitcoin-verification.png';
import merkleTree from '../../assests/merkle-tree.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'linear',
    });
  }, []);

  return (
    <main className='how-it-works'>
      <h1 className='title'>
        How To Verify <span>Bitcoin Transactions</span>
      </h1>
      <div className='bitcoin-proofs'>
        <div className='img'>
          <img
            src={bitcoinVerification}
            alt='how to verify bitcoin transactions'
            data-aos='fade-up'
          />
        </div>
        <p data-aos='fade-right'>
          <strong>CLARITY BITCOIN LIBRARY </strong>The Clarity Bitcoin Library is a tool that examines and interprets bitcoin transactions and block headers. It checks whether a bitcoin transaction was actually sent (mined) on the bitcoin chain. The main purpose for this contract is to verify that a tx (transaction) was mined in a bitcoin block.
        </p>
      </div>

      <div className='merkle-proof' data-aos='fade-right'>
        <div className='img'>
          <img src={merkleTree} alt='merkle tree node' />
        </div>
        <p data-aos='fade-right'>
        The library (contract) is written in Clarity language of the Stacks blockchain and it uses a function (though they are about 43 other functions) to verify if the tx (transaction) was mined in a certain block, in order of us to verify a tx then this follow steps must be made:
        </p>
        <br />
        <p data-aos='fade-right'>
        The function first verifies that the block-header data is equal to the block data; if it's true then it goes to the second part of the verification.
        </p>
        <br />
        <p data-aos='fade-right'>
        Secondly after the block header has been verified,the function now verifies if the merkle-proof matches the block's merkle root. There are two main methods which are:
        </p>
        <br />
        <ol data-aos='fade-up'>
          <li>
            <strong>Was TX Mined:</strong>  This read-only function is a function to confirm if a bitcoin transaction was mined or sent to a prior bitcoin block, it takes the bitcoin-header and height ,the transaction, and a merkle proof, and determines that:
          </li>
          <ul>
            <li>
            The block header corresponds to the block that was mined at the given Bitcoin height
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
          <p data-aos='fade-right'>
            The first element in hashes must be the given transaction's sibling
            transaction's ID. This and the given transaction's txid are hashed
            to calculate the parent hash in the merkle tree, which is then
            hashed with the next hash in the proof, and so on and so forth,
            until the final hash can be compared against the block header's
            merkle root field. The tx-index tells us in which order to hash each
            pair of siblings.
          </p>
          <br />
          <li data-aos='fade-right'>
            <strong>WAS-TX-MINED-COMPACT</strong>:This read-only function is a function
            to confirm if a bitcoin transaction was mined or sent to a prior bitcoin block,
            it takes the bitcoin-header and height ,the transaction, and a merkle proof, and determines that:

          </li>
          <ul data-aos='fade-up'>
            <li>the block header corresponds to the block that was mined at the given Bitcoin height</li>
            <li>The transaction's merkle proof matches the block header's merkle root.</li>
          </ul>
        </ol>
        <p data-aos='fade-right'>
        Returns a boolean value false message if these requirements are not met.
        
          </p>
          <p data-aos='fade-right'>
          Note: This read-only function is a function similar to the function above but the inputs are different and also the helper functions are a little bit different.
          </p>
        <br />
        <h4 data-aos='fade-right'>
          Applications that use the clarity bitcoin library:
        </h4>
        <p data-aos='fade-right'>
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
        <h3 data-aos='fade-right'>
          MAGIC BRIDGE (LINK AND ABOUT ) is using the parse method <br /> ZEST
          PROTOCOL(LINK AND ABOUT )
        </h3>
      </div>
    </main>
  );
};

export default HowItWorks;
