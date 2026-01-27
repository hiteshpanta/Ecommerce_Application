
import { NavLink } from 'react-router'
import DropDownProfile from '../DropDownProfile'
import { Button } from '../ui/button'


export default function Header() {
  return (
    <div className='bg-gray-200 px-5 justify-between flex items-end py-[7px]'>
       <h1 className='text-[30px] font-bold'>Ercel Store</h1>


       <div className='space-x-5'>
        <NavLink to={'/login'}>
          <Button variant='link' className={'text-[16px]'}>Login</Button>
        </NavLink>
        <NavLink to={'signup'}>
          <Button>Sign Up</Button>
        </NavLink>
        
      </div>

      {/* <DropDownProfile /> */}

      

    </div>
  )
}
