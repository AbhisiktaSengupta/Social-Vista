import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
    name:"Saved Posts",
    slug:"/saved-posts",
    active: authStatus,
  }
  ]


  return (
    <header className='shadow-md bg-[#9195F6] border-b-2 border-[#350b39] '>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='110 px' height='110 px'   />
              </Link>
          </div>
          <ul className='flex ml-auto py-5 text-lg text-[#350b39] font-serif font-bold'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name} >
                <button
                onClick={() => navigate(item.slug)}
                className='hover:bg-[#F9F07A] inline-bock px-6 py-2 font-NavBtn duration-200 hover:font-semibold rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className='font-NavBtn'/>
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header