import React from 'react'
import floatingChatbot from '../../assets/chatbot_icon.png'
import { useState } from 'react'
import uploadbutton from '../../assets/upload.png'


function F_chat() {
     const [isOpen, setIsOpen] = useState(false);

  return (
      <div onClick={() => { setIsOpen(!isOpen)  }} className="fixed bottom-10  right-10 z-50 bg-gray-200 shadow-lg rounded-full p-2 flex items-center justify-center   "   >
          <div className='bg-black h-10 w-10 flex items-center justify-center rounded-full cursor-pointer'>
        <img className='hover:h-2'  src={floatingChatbot} alt="image" />
      
        </div>
        {isOpen &&(
            <div onClick={(e) => e.stopPropagation()}  className="absolute bottom-16 right-0  bg-gray-300 h-130 shadow-lg rounded-lg p-4 w-80 ">
                <h2 className="text-lg font-semibold mb-2">Chatbot <hr /> </h2>

                <div className='flex align-items-center justify-center  h-100   ' > <p className="text-gray-600">How can I assist you today?</p> </div>
                
                  <input className='bg-gray-400 border absolute bottom-2 border-gray-300  rounded-3xl  p-2 mb-2 w-70' type="text" placeholder='Ask Anything'  onClick={(e) => e.stopPropagation()} />
          <button> <img className='absolute bottom-6 rounded-full bg-gray-500 left-63 hover:bg-black'  src={uploadbutton}  alt="" /></button>
              
            </div>
        )}


    </div>
  )
}

export default F_chat