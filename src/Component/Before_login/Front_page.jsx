import React from 'react'
import { NavLink } from 'react-router-dom'
import ai_image_head from '../../assets/images_aihead.jpeg'
// D:\gncipl- internship\6th-weekGNCIPl\Matty-Online-Graphic-Design-Tool\src\assets\images_aihead.jpeg

function front_page() {
  return (
    <>
          <div  className='text-center flex justify-center items-center '><h1 className='text-center text-4xl font-bold'>Welcome to DesignHub </h1>
             
          </div>
          <p  className='text-center flex justify-center items-center pt-4 ' >A browser-based design tool to easily create posters, banners, and social media images. <br /> 
            Features drag-and-drop editing, ready templates, cloud saving, and quick PNG/PDF <br />
            exports — no software install needed</p>
          <img className='h-100 pl-50 ' src="../src/assets/front_page_image.png" alt="front_page_image" />
         

          <div className='text-center flex justify-center items-center pb-5Hey, Cortana. '>
        <NavLink to="/signup"> <button className='  w-36 h-12 rounded-md  text-white bg-black font-bold p-2 hover:text-2xl      '> Sign up Now </button>
       </NavLink> </div>

      <div className='bg-gray-100 '> <div className='text-center'><h2>Build Your AI business</h2></div>
        <div className='text-4xl font-bold text-center'><h1>Experience the future of creative design <br /> with generative AI</h1></div>
        <p className='text-center'>Use the image generator AI to convert your business ideas into reality. Our platform empowers you to create designs online for free, <br /> perfect  for elevating your marketing efforts.

</p>
<div>
 
        <div className='pl-10 pt-25 space-y-5 pb-40'><div className='text-4xl font-bold '><h1>Why Choose DesignHub?</h1></div>
      <li>Make creating designs online and offline an effortless experience</li>
      <li>Utilize the logo generator to create logo design online for free</li>
      <li>Simplified, intuitive workflow that saves time and reduces costsEnsure < br/> brand consistency with our professional-grade output</li>
      <li>Ensure brand consistency with our professional-grade output</li>
            {/* <img className='float-right  absolute top- right-20 top-10  h-40 w-40 ' src={ai_image_head} alt="image" /> */}
      
      </div>
      </div>

        <div className='bg-gray-300 pb-30 pt-20 space-y-5 text-center md:text-right pr-30'>
        <div className='text-4xl font-bold '><h1>Creativity</h1></div>
      <li>Craft captivating designs effortlessly with AI design generator tools</li>
      <li>No design experience is needed to create innovative designs online</li>
      <li>Simplified, intuitive workflow that saves time and reduces costsEnsure < br/> brand consistency with our professional-grade output</li>
      <li>Discover an infinite world of design possibilities</li>
      
      </div>

        </div>
      </>
  )
}

export default front_page