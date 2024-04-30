import React from 'react'
import {heros} from '../../data'

const Hero = () => {
  return (
    <div className='hidden md:flex w-full lg:h-[28rem] md:h-[22rem]'>
    {/* get a random hero image from the heros array */}
    <img src={heros[Math.floor(Math.random() * heros.length)].pic} alt='hero' className='w-full h-full object-cover object-center'/>

    </div>
  )
}

export default Hero