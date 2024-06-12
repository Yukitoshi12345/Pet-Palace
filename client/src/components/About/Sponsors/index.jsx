import React from 'react'

const Sponsors = ({sponsors, description, heading}) => {
  return (
    <>
      <h3 className='mb-3 mt-8  text-2xl'>{heading}</h3>
      <p>{description}</p>
      <div className='flex flex-wrap gap-2 justify-evenly'>
        {
          sponsors.map((sponsor, index) => {
            return (
              <img key={index} src={sponsor.pic} alt='sponsor' className='size-36 rounded-xl object-cover shadow-sm'/> 
            )
          })
        } 
      </div>

    </>
  )
}

export default Sponsors