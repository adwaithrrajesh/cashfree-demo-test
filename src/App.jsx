import { useState } from 'react';
import { cashfree } from './util';
import axios from 'axios';

function App() {

  const [amount,setAmount] = useState('')
  const [status,setStatus] = useState('')

  const handleSubmit = async () => {

    setStatus('Processing')

    // replace
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJJZCI6IjY2NmFlMjYzMGZmNjhjZTNkOThhMDYyZiIsImlhdCI6MTcyOTQ5NDIxMywiZXhwIjoxNzMxMjIyMjEzfQ.mYnUyB5hVUW-fETjD9gyQR_kXvJI1nm3tun2mgHDe4Y'
    const response = await axios.post('https://tenera-server.onrender.com/api/payment/doPayment',{amount:amount},{headers:{Authorization:token}})
    setStatus('Done')

    const payment_session_id = response.data.payment_session_id

    let checkoutOptions = {
      paymentSessionId: payment_session_id,
      returnUrl: 'https://cashfree-test.onrender.com'
    };

    cashfree.checkout(checkoutOptions).then(function(result) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log('redirect');
      }
    });
    

  };




  return (
    <div>
      <h1>Payment</h1>
      <input
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <div>
        <button onClick={handleSubmit}>SUBMIT</button>
        <div>{status}</div>
      </div>
    </div>
  );
}

export default App;
