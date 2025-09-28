import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-16 bg-white border border-gray-400/50 backdrop-blur-[2px] py-2.5 px-4 md:px-6 sticky top-0 z-30'>
      <div className='container mx-auto flex items-center justify-between gap-5'>
        <Link to="/dashboard">
        <h1 className='text-lg md:text-xl font-medium text-black leading-5'>
          Interview Prep AI
        </h1>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  )
}

export default Navbar