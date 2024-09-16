import { useState, useRef, useCallback } from 'react'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = '!@#$%^&*(){}[]/._-=+%'

function App() {

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const passwordRef = useRef(null);

  const notify = useCallback((message,hasError=false) => {
    
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }else{
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

  }, [])

  //callback function to handle the generation of the password
  const handleGeneratePassword = useCallback(() => {
    //if no option are selected, show an error notification
    if(
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ){
      notify('You must select at least one option',true)
      return 
    }
    //initialize an empty character list
    let characterList = ''
    //add selected character sets to the empty character list
    if (includeUppercase) {
      characterList += upperCaseLetters
    } if (includeLowercase) {
      characterList += lowerCaseLetters
    } if (includeNumbers) {
      characterList += numbers
    } if (includeSymbols) {
      characterList += specialCharacters
    }
    //genetate the password and update the state
    setPassword(createPassword(characterList))
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols, passwordLength,notify])

  //function to generate a password of the desired length from the given character list
  const createPassword = useCallback((characterList) => {
    let password = ''
    const charcaterListLength = characterList.length
    //randomly select charcters from the list to form the password
    for (let i = 0; i < passwordLength; i++) {
      const charaterIndex = Math.floor(Math.random() * charcaterListLength)
      password += characterList.charAt(charaterIndex)
    }
    return password
  }, [passwordLength])

  //callback function to copy the clipboard password to the cliboard using useRef
  const copyToClipboard = useCallback(() => {
    //select the text in the input element using useRef
    passwordRef.current.select();
    passwordRef.current?.select()
    passwordRef.current?.setPasswordLength;
    window.navigator.clipboard.writeText(password);
    //show a success notification
    notify('password copied to clipboard')

  }, [password,notify])

  

  

  return (
    <div className='min-h-screen bg-[#3b3b98] flex justify-center items-center'>
      <div className='w-80'>
        <div className='bg-[#23235b] rounded shadow-lg p-5'>
          <h2 className='text-center text-white mb-5'>Password Generator</h2>
          <div className='relative bg-black bg-opacity-40 p-3 text-white h-12 mb-4'>
            <input
              type="text"
              ref={passwordRef}
              value={password}
              readOnly
              className='w-full bg-transparent border-none text-white outline-none cursor-default'
            />

            <button
              onClick={copyToClipboard}
              className='absolute bg-[#3b3b98] text-white border-none h-10 p-2 cursor-pointer top-1 right-1'
            >
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="Password-Length">Password Length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="Password-Length"
              name='password-sterngth'
              max='50'
              min='5'
              className='text-black w-16'

            />
          </div>

          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="uppercase-letters">Include Upper Case</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name='uppercase-letters'
              className='text-black w-16'
            />
          </div>

          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="lowrcase-letters">Include Lower Case</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id="lowrcase-letters"
              name='lowrcase-letters'
              className='text-black w-16'
            />
          </div>

          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="numbers"
              name='numbers'
              className='text-black w-16'
            />
          </div>

          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="symbols"
              name='symbols'
              className='text-black w-16'
            />
          </div>

          <button
            onClick={handleGeneratePassword}
            className='bg-[#3b3b98] text-white w-full p-2 text-lg cursor-pointer'
          >
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </div>
  )
}

export default App
