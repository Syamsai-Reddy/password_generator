import { useState, useCallback, useEffect,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
     
// useRef hook
 
const passwoardRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswoardToClipboard = useCallback(() => {
     passwoardRef.current?.select()
     passwoardRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
  }, [password])
useEffect(()=>{ passwordGenerator();},[length,charAllowed,numberAllowed,passwordGenerator])

  return (
    <div className="w-full bg-gray-700 text-orange-400 px-4 my-8 rounded-md shadow-md text-center max-w-md mx-auto">
    <h1 className="text-center text-white  ">password Generator</h1>
    <div className="flex shadow-sm rounded-md overflow-hidden py-7">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="Password"
      readOnly
      ref={passwoardRef}
    />
        <button  onClick={copyPasswoardToClipboard}className="bg-blue-700 outline-none text-white px-3 py-0  shrink-0">copy</button>
      </div>
      <div className="flex text-sm gap-2 pb-2">
        <div className="flex items-center gap-x-1">
            <input type='range' 
            min={7}
            max={100}
            className="cursor-pointer"
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            ></input>
            <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type='checkbox' defaultChecked={charAllowed} id='characterinput' onChange={()=>setCharAllowed((prev)=>(!prev))}/>
          <label>Characters</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type='checkbox' defaultChecked={charAllowed} id='characterinput' onChange={()=>setCharAllowed((prev)=>(!prev))}/>
          <label>Numbers</label>
        </div>
      </div>
    </div>
  )

}
export default App