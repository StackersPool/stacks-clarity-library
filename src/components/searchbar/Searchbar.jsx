import React from 'react';
import { userSession, wallet } from '../../store/wallet';
// Stacks imports


const Searchbar = () => {
  const [result, setResult] = React.useState(null);
  const [textChanged, setTextChanged] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleTextChange = (e) => {
    const input = e.target.value;
    const inputLength = String(input).length;
    setTextChanged(true);
    setLoading(true);
    if (inputLength > 0) {
      wallet.transaction.getWasTxMined(input).then((data) => {
        setResult(data);
        setLoading(false)
      });
    } else {
      setTextChanged(false);
      setLoading(false);
    }
  }

  React.useEffect(() => {

  }, [loading, result, textChanged])

  return (
    <div className='searchbarcontainer'>
      <div className='searchbar'>
        {
          userSession.isUserSignedIn()
            ? <input type='text' placeholder='Search: Transactions , block, address...' onInput={handleTextChange} />
            : <div className="connect"><a onClick={() => wallet.login()}>Connect</a></div>
        }
      </div>
      {result && textChanged &&
        <div className='result'>
          <small><p>Status: {result.status}</p></small>
          <small><p>Result: {result.result}</p></small>
        </div>
      }
      {loading && <p className='loadbar'>Loadding...</p>}
    </div>
  );
};

export default Searchbar;
