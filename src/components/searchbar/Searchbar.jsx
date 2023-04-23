import React from 'react';
import { userSession, wallet } from '../../store/wallet';
// Stacks imports


const Searchbar = () => {
  const handleTextChange = (e) => {
    const input = e.target.value;
    const inputLength = String(input).length;
    if (inputLength === 64) {
      wallet.transaction.getWasTxMined(input);
    }
  }

  return (
    <div className='searchbar'>
      {console.log(userSession.isUserSignedIn())}
      {
        userSession.isUserSignedIn()
          ? <input type='text' placeholder='Search: Transactions , block, address...' onInput={handleTextChange} />
          : <div className="connect"><a onClick={() => wallet.login()}>Connect</a></div>
      }
      {/* <button onClick={() => wallet.logout()}>Disconnect</button> */}
    </div>
  );
};

export default Searchbar;
