import React from 'react'
import { NavLink } from 'react-router-dom'
import ai_image_head from '../../assets/creative.png'
import Choose_designHub from '../../assets/Choose_designHub.png'


function front_page() {
  return (
    <>
    <div>      <div className='text-center flex justify-center items-center '><h1 className='text-center text-4xl font-bold mt-5 shadow-lg rounded-md animate-bounce  '>Welcome to Matty </h1>
             
          </div>

          <p  className='text-center flex justify-center items-center pt-4 '  >A browser-based design tool to easily create posters, banners, and social media images. <br /> 
            Features drag-and-drop editing, ready templates, cloud saving, and quick PNG/PDF <br />
            exports — no software install needed</p>
          <img className='h-100  w-200 ml-51 py-0 shadow-2xl ' src="../src/assets/front_page_image.png" alt="front_page_image" />
         

          <div className='text-center flex justify-center items-center pb-5Hey, Cortana. '>
         </div>

      <div className='bg-gray-100 space-y-5'> <div className='text-center font-black'><h2>Build Your AI business</h2></div>
        <div className='text-4xl font-bold text-center'><h1>Experience the future of creative design <br /> with generative AI</h1></div>
        <p className='text-center'>Use the image generator AI to convert your business ideas into reality. Our platform empowers you to create designs online for free, <br /> perfect  for elevating your marketing efforts.

</p>
    </div>


<div>
 
        <div className='flex'>
          <div className='pl-10 pt-25 space-y-5 pb-40'>
          <h1 className='text-4xl font-bold ' >Why Choose Matty?</h1>
      <li>Make creating designs online and offline an effortless experience</li>
      <li>Utilize the logo generator to create logo design online for free</li>
      <li>Simplified, intuitive workflow that saves time and reduces costsEnsure < br/> brand consistency with our professional-grade output</li>
      <li>Ensure brand consistency with our professional-grade output</li>
      </div>

      <div className=''>
            <img className=' h-80 w-100  mt-20  ml-50' src={Choose_designHub} alt="image" />
            </div>
      
      </div>
      </div>

        <div className='bg-gray-300 flex '>
          <div> <img className=' h-80 w-90 mt-15 shadow-lg mr-80 ml-20   ' src={ai_image_head} alt="image" /></div>

          <div className='  pb-30 pt-20 space-y-5 text-center md:text-right pr-30'>
        <h1 className='text-4xl font-bold mr-83' >Creativity</h1>
      <li className='mr-5' >Craft captivating designs effortlessly with AI design generator tools</li>

      <li className='mr-4'>No design experience is needed to create innovative designs online</li>
        
      <li className='ml-40'>Simplified, intuitive workflow that saves time and reduces costsEnsure  brand consistency with our professional-grade output</li>
        
      <li className='mr-40' >Discover an infinite world of design possibilities</li>
    
      </div>
      
      </div>

        </div>
      </>
  )
}

export default front_page