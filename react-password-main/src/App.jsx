import React, { useState, useCallback, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Constants representing different character sets for password generation
const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = '!@#$%^&*()'

function App() {
  // State to store the generated password
  const [password, setPassword] = useState('')

  // State to store the desired length of the password
  const [passwordLength, setPasswordLength] = useState(20)

  // State to manage whether uppercase letters should be included
  const [includeUppercase, setIncludeUppercase] = useState(false)

  // State to manage whether lowercase letters should be included
  const [includeLowercase, setIncludeLowercase] = useState(false)

  // State to manage whether numbers should be included
  const [includeNumbers, setIncludeNumbers] = useState(false)

  // State to manage whether special characters should be included
  const [includeSymbols, setIncludeSymbols] = useState(false)

  // useRef hook to reference the input element containing the generated password
  const passwordRef = useRef(null)

  // Callback function to display notifications using react-toastify
  // It accepts a message and a boolean indicating whether it's an error message
  const notify = useCallback((message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }, [])

  // Callback function to handle the generation of the password
  const handleGeneratePassword = useCallback(() => {
    // If no options are selected, show an error notification
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must select at least one option', true)
      return
    }

    // Initialize an empty character list
    let characterList = ''

    // Add selected character sets to the character list
    if (includeLowercase) {
      characterList += lowerCaseLetters
    }
    if (includeUppercase) {
      characterList += upperCaseLetters
    }
    if (includeNumbers) {
      characterList += numbers
    }
    if (includeSymbols) {
      characterList += specialCharacters
    }

    // Generate the password and update the state
    setPassword(createPassword(characterList))
  }, [includeLowercase, includeUppercase, includeNumbers, includeSymbols, notify])

  // Function to generate a password of the desired length from the given character list
  const createPassword = useCallback(
    (characterList) => {
      let password = ''
      const characterListLength = characterList.length

      // Randomly select characters from the list to form the password
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.floor(Math.random() * characterListLength)
        password += characterList.charAt(characterIndex)
      }
      return password
    },
    [passwordLength] // Dependency array includes passwordLength since it determines the length of the password
  )

  // Callback function to copy the generated password to the clipboard using useRef
  const copyToClipboard = useCallback(() => {
    // Select the text in the input element using useRef
    passwordRef.current.select()
    
    // Execute the copy command to copy the content to the clipboard
    document.execCommand('copy')
    
    // Show a success notification
    notify('Password copied to clipboard!')
  }, [notify])

  return (
    <div className="min-h-screen bg-[#3b3b98] flex justify-center items-center">
      <div className="w-80">
        <div className="bg-[#23235b] rounded shadow-lg p-5">
          <h2 className="text-center text-white mb-5">Password Generator</h2>
          <div className="relative bg-black bg-opacity-40 p-3 text-white h-12 mb-4">
            {/* Use a readOnly input field to display the generated password */}
            <input
              ref={passwordRef} // Assign the ref to the input element
              type="text"
              value={password} // Bind the password state to the input field
              readOnly // Make the input field read-only
              className="w-full bg-transparent border-none text-white outline-none cursor-default"
            />
            <button
              onClick={copyToClipboard} // Call the copyToClipboard function when the button is clicked
              className="absolute bg-[#3b3b98] text-white border-none h-10 p-2 cursor-pointer top-1 right-1"
            >
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="password-strength">Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="20"
              min="10"
              className="text-black w-16"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>

          <button
            onClick={handleGeneratePassword}
            className="bg-[#3b3b98] text-white w-full p-2 text-lg cursor-pointer"
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
          />
        </div>
      </div>
    </div>
  )
}

export default App
