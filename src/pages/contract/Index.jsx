import React, { useEffect } from "react";
import claritySmartContract from "../../assests/clarity-smart-contract.png";
import clarityStacks from "../../assests/clarity-stacks.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Contract = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "linear",
    });
  }, []);

  return (
    <main className="contract">
      <h1 className="title">
        It's All About <span>Clarity</span>
      </h1>

      <div className="clarity-smart-contract">
        <h5>Clarity smart Contract</h5>
        <img
          src={claritySmartContract}
          alt="clarity smart contract"
          data-aos="fade-up"
        />
      </div>

      <div className="clarity-stacks" data-aos="fade-right">
        <p>
          <strong>The library contract</strong> is written in{" "}
          <span>Clarity language</span> of the Stacks blockchain and contains
          public and read only functions that help to verify bitcoin
          transactions and blocks through a <span>merkle tree.</span>
        </p>

        <div className="img">
          <img src={clarityStacks} alt="clarity stacks" />
        </div>
      </div>

      <div className="submitting-transc" data-aos="fade-right">
        <h4>Submitting Bitcoin transactions to the stacks network</h4>
        <p>
          First a proof based on the merkle tree is assembled, the entirety of
          the proof is sent to the Clarity smart contract endpoint. This works
          with a Stacks contract call with the parameters containing the raw
          transaction or a decomposed transaction object, block height and the
          Merkle proof.
        </p>
        <p>
          A helper functions <i>paramsFromTx</i> in JavaScript can be found here{" "}
          <a
            href="https://github.com/friedger/stacks-swaps/blob/main/src/lib/btcTransactions.js"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/friedger/stacks-swaps/blob/main/src/lib/btcTransactions.js
          </a>
        </p>
      </div>

      <div className="contract-methods" data-aos="fade-right">
        <h4>Methods used in the contract includes:</h4>
        <p>
          There are two ways to verify the btc tx in a contract and use the
          content of the bitcoin transaction :
        </p>
        <ul>
          <li>
            <p>
              Parse-tx: the full tx is submitted, the contract parses it and
              uses the parts it needs if the tx was mined, the method
            </p>
            <ol>
              <li>
                Returns <strong>(err ERR-OUT-OF-BOUNDS)</strong> if we read past
                the end of txbuff
              </li>
              <li>
                Returns <strong>(err ERR-VARSLICE-TOO-LONG)</strong> if we find
                a scriptPubKey or scriptSig that's too long to parse.
              </li>
              <li>
                Returns <strong>(err ERR-TOO-MANY-TXOUTS)</strong> if there are
                more than eight inputs to read
              </li>
              <li>
                Returns <strong>(err ERR-TOO-MANY-TXINS)</strong> if there are
                more than eight outputs to read
              </li>
              <li>
                Returns <strong>(err ERR-TOO-MANY-TXINS)</strong> if there are
                more than eight outputs to read
              </li>
            </ol>
          </li>
        </ul>
        <ul>
          <li>
            Concat-tx: The parts of the tx are submitted, the contract concats
            the parts to the full tx and uses the provided parts if the tx was
            mined
          </li>
        </ul>
      </div>

      <div className="contract-uses">
        <div className="grey-box">
          <h3>
            <strong>Note:</strong> Witnesses of a segwitbitcoin transaction are
            not part of the txid
          </h3>
        </div>
      </div>

      <div className="contract-uses" data-aos="fade-right">
        <h4>What can this Contract be used for?</h4>
        <p>
          Once it was confirmed that a bitcoin transaction was mined, different
          actions can be taken. For example, the amount of the first output of
          the btc transaction can be used to determine how many tokens on the
          Stacks chain should be sent to a Stacks address represented by the
          first input of the transaction. In general, a Stacks contract can read
          and use data embedded in a bitcoin transaction
        </p>
        <div className="more-examples" data-aos="fade-right">
          <h4>
            <strong>Catamaran Swaps</strong>
          </h4>
          <p>
            Catamaran Swaps are cross-chain swaps between bitcoin and Stacks
            assets (SIP-010 Fungible tokens, SIP-009 Non-Fungible Tokens or STX
            itself) where bitcoin payment is accepted for Stacks assets.
          </p>

          <h4>
            <strong>Auditing a Stacking pool</strong>
          </h4>
          <p>
            The Clarity Bitcoin Library can be used to audit a Stacking Pool
            that pays out Stacking rewards in Stacks tokens, i.e. the pool
            receives Bitcoin rewards that are later converted to Stacks and,
            finally, distributed to the pool members. Pool members could report
            the reward Bitcoin transactions via a Clarity contract and thereby
            unlock the rewards on the Stacks blockchain.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Contract;
