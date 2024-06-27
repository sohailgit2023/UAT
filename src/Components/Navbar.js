import React, { useContext, useEffect, useState } from 'react';
import pursuitLogo from '../images/pursuit_logo(white).png'
import { Link, useLocation } from 'react-router-dom';
import { BiSolidFilePdf } from "react-icons/bi";
import { CgPlayButtonO } from "react-icons/cg";
import clsx from 'clsx';
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Context from '../Context/Context';
import Cookies from 'js-cookie';
const Navbar = () => {
  const { setSidebar, setHighlight, highlight } = useContext(Context);
  const location = useLocation();
  const [action, setAction] = useState('/')
  const [isSideMenuOpen, setMenu] = useState(false);
  console.log('shanti')
  console.log(highlight)
  const link=[
    {
      name:'UATNext', pathName:'/'
    },
    {
      name:'Execute Test', pathName:'/ExecuteTestRun'
    },
    // {
    //   name:'Review SIT Test Cases', pathName:'/review-SIT-Test'
    // },
    {
      name:'Autor UAT Test Cases', pathName:'/author-UAT-Test'
    },
    // {
    //   name:'Triage-UAT-Defects', pathName:'/triage-UAT-Defects'
    // }
  ]
  useEffect(() => {
    setAction(location.pathname.split('/')[1])
    console.log(location.pathname)
    Cookies.remove('TestCycleId_Or_TestSuiteId')
    console.log(location.pathname.split('/')[2])
    location.pathname.split('/')[2]!==undefined ? setHighlight(location.pathname.split('/')[2]) : setHighlight('')
  }, [location.pathname])
  return (
    <div className='flex fixed top-0 justify-between h-3/12 w-full bg-cyan-500 z-50 shadow-md'>
      <div className='flex items-center gap-3 sm:gap-6'>
        <div className='flex justify-between items-center bg-slate-400'>
          <img className='h-12 bg-teal-800 p-2 lg:p-1' src={pursuitLogo} alt='' />
        </div>
        <Link to='/' className='text-sm sm:text-base lg:text-base font-bold text-white '>UATNext</Link>
      </div>
      <div
        className={clsx(
          " fixed h-full w-screen lg:hidden top-0 right-0  -translate-x-full  transition-all ",
          isSideMenuOpen && "translate-x-0"
        )}
      >
        <section className="text-black bg-gradient-to-r from-cyan-600 to-cyan-400  flex-col absolute left-0 top-0 h-screen gap-1 z-50 w-full sm:w-56 flex  ">
          <div className='flex justify-between items-center ml-6 mr-6 mt-3'>
            <div className='flex items-center gap-1'>
            <div className='flex justify-center items-center h-12 w-12 rounded-full bg-slate-300'>
              <span>RS</span>
            </div>
            <span className='text-sm font-normal text-white'>Rakesh Shaw</span>
            </div>
            <IoCloseOutline
              onClick={() => { setMenu(false); setSidebar({ isSideMenuOpen }) }}
              className="mt-0 text-xl sm:p-1 sm:text-3xl cursor-pointer"
            />
          </div>
          <div className='h-0.5 rounded-full w-full bg-emerald-100'></div>
          <div className='flex flex-col justify-center items-center gap-1 ml-3 mr-3 mt-2'>
            {
              link.map((e,i)=>(
                <div key={i} className={`flex justify-left w-full py-2 rounded pl-4 ${action === e.pathName.split('/')[1] ? 'bg-emerald-100 text-black' : 'text-white'}`}>
              <Link to={e.pathName} className=' text-sm sm:text-base lg:text-base font-medium ' onClick={() => { setMenu(false); setSidebar({ isSideMenuOpen: true }); setHighlight('')}}>{e.name}</Link>
            </div>
              ))
            }
          </div>
        </section>
      </div>
      <div className='flex flex-row-reverse lg:flex-row items-center gap-3  sm:gap-5 lg:gap-8 px-4 sm:px-8'>
        <FiMenu
          onClick={() => { setMenu(true); setSidebar({ isSideMenuOpen }) }}
          className="text-xl sm:text-3xl cursor-pointer lg:hidden"
        />
        {
          link.map((e,i)=>(
            e.pathName!=='/' &&
            <div className='flex flex-col hidden lg:block'>
        <Link to={e.pathName} className='text-white text-xs sm:text-sm lg:text-base whitespace-nowrap hidden lg:block' onClick={()=>setHighlight('')}>{e.name}</Link>
        <div className={`h-0.5 ${action === e.pathName.split('/')[1] ? 'bg-yellow-600' : 'bg-cyan-500'}`}></div>
        </div>
          ))
        }
        <CgPlayButtonO className='text-white sm:text-2xl lg:text-3xl text-yellow-500 bg-white' />
        <BiSolidFilePdf className='text-white text-xl sm:text-3xl lg:text-4xl' />
      </div>
    </div>
  )
}
export default Navbar;