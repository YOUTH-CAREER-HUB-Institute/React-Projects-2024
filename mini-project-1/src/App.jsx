import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardItems from './components/card-items'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let image = {
    image1 : 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    image2 : 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image3: 'data:image/webp;base64,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'
  }

  return (
    <>
      <h1 className = 'text-6xl font-extrabold'>Mini Project 1: Reusable Card</h1>
      <CardItems aboutName = "Mackbbok" aboutData = "This is mackbook" btnText = "Buy Now" images={image.image1}/>
      <CardItems aboutName = "ChromeBook" aboutData = "This is chromebook" btnText = "Purchase Now" images={image.image2}/>
      <CardItems aboutName = "Asus" aboutData = "This is asus" btnText = "Sale Start" images={image.image3}/>
    </>
  )
}

export default App
