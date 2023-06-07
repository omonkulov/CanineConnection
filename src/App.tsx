import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from './recoil/auth';
import { API } from './api/takehomeApi';

function App() {
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

  function handleLoginSuccess(data:GenericApiResponse){
    console.log(data)
  }
  
  function handleLoginFail(data:GenericApiResponse){
    console.log(data)
  }
  
  useEffect(() => {
    API.login({
      email: "test@gmail.coom",
      name: "test"
    },
    handleLoginSuccess,
    handleLoginFail,
    )
  }, [])
  
  return (
    <div className="App">
        <h3 className='bg-red-200'>Expected</h3>
    </div>
  );
}

export default App;
