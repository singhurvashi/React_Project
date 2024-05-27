import React, { useState, useCallback,useEffect ,useRef} from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char)
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard =useCallback(()=> {
    passwordRef.current?.select();
   
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{ 
    passwordGenerator()
  }, [length,numberAllowed, charAllowed,passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-1 my-20 text-orange-600 bg-gray-800">
      <h1 className="text-white text-center  my-2">Password Generator</h1>
      <div className ="flex shadow rounded-lg overflow-hidden px-3 mb-9">
      <input
          type="text"
          value={password}
          className="outline-solid  rounded-lg w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button  onClick ={copyPasswordToClipboard}className='outline-none bg-blue-700 text white px-3 py-0.5 shrink-0'>Copy</button>
        
      </div>
      <div className="flex text-sm gap-x-2 ">
        <div ClassName=' flex items-center gap-x-1'>
          <input 
          type="range"
         min={6}
         max={50}
         value={length}
         className='cursor-pointer'
         onChange={(e) => setLength(e.target.value)}
         />
         <label>Length: {length}  </label>
        </div>
        <div ClassName=' flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
       onChange={()=>{setNumberAllowed((prev)=>!prev);
        
       }}
         
        
         />
          <label htmlFor="numberInput"> Numbers</label>
          </div>
          <div ClassName=' flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
       onChange={()=>{setCharAllowed((prev)=>!prev);
        
       }}
       />
       <label htmlFor="characterInput"> Characters</label>
       
       </div>
       </div>
      </div>
   
  );
}

export default App;
