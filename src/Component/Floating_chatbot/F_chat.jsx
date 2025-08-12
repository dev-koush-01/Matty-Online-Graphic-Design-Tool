import React from 'react'
import floatingChatbot from '../../assets/chatbot_icon.png'
import { useState } from 'react'

function F_chat() {
     const [isOpen, setIsOpen] = useState(false);

  return (
      <div onClick={() => { setIsOpen(!isOpen) }} className="fixed bottom-10  right-10 z-50 bg-gray-200 shadow-lg rounded-full p-2 flex items-center justify-center">
          <div className='bg-black h-10 w-10 flex items-center justify-center rounded-full cursor-pointer'>
        <img className='hover:h-2' src={floatingChatbot} alt="image" />
      
        </div>
        {isOpen &&(
            <div className="absolute bottom-16 right-0  bg-gray-300 h-130 shadow-lg rounded-lg p-4 w-80 ">
                <h2 className="text-lg font-semibold mb-2">Chatbot</h2>
                <p className="text-gray-600">How can I assist you today?</p>
                  <input className='bg-gray-400 border  border-gray-300  rounded-lg p-2 mb-2 w-full' type="text" placeholder='Ask Anything'  onClick={(e) => e.stopPropagation()} />
            
              
            </div>
        )}

    
    </div>
  )
}

export default F_chat