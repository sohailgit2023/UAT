import React, { useContext, useEffect, useState, useTransition } from "react";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import axios from 'axios';
import axiosInstance from "../../../utils";
import Context from "../../../Context/Context";
import Hierarchy_Folder from "../../Hierarchy_Folder";
import { Outlet, useLocation } from "react-router-dom";
import {RotatingLines} from 'react-loader-spinner';
import Cookies from "js-cookie";
const Execute_Test_Run = () => {
    const {sidebar, setHighlight}=useContext(Context);
    const location=useLocation();
    const [projectInfo, setProjectInfo]=useState('');
    const [value, setValue]=useState('')
    const [option, setOption]=useState([])
    const [testCycle, setTestCycle]=useState([])
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const handelFetchProject= async()=>{
        try{
            setIsProcessing(true)
          const projectResponse=await axiosInstance.get('/module/52126818')
        //    axios.get('https://pursuitrnd.qtestnet.com/api/v3/projects/130015/modules/52126818',{headers: {
        //       'Authorization': `Bearer fe453042-4eb3-463c-a2e2-06436acd57df`,
        //     'Access-Control-Allow-Origin': true
        //   }
        // })
            console.log(projectResponse.data)
            setProjectInfo(projectResponse.data)
            Cookies.set('projectName', projectResponse.data.name)
            handelFetchRelease()
        }catch(err){
            setErrorText(err.message);
                setIsError(true)
            console.log(err);
        }finally{
            setIsProcessing(false)
        }
    }
    const handelFetchRelease=async()=>{
        try{
            const releaseResponse=await axiosInstance.get('/release/920054')
            console.log(releaseResponse.data)
            setOption([{ value: releaseResponse.data.id, label: releaseResponse.data.name }])
        }catch(err){
            console.log(err);
        }
    }
    const handelFetchTestSuit=async()=>{
        try{
            const testCycleResponse=await axiosInstance.get('/testcycle')
            console.log(testCycleResponse)
            setTestCycle(testCycleResponse.data)
            console.log(testCycleResponse.data.length)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        setIsProcessing(true)
     handelFetchProject()
    }, [])
    useEffect(()=>{
        if(value!==''){
            handelFetchTestSuit()
            Cookies.set('releaseName',value)
            Cookies.get('CookiesName')== undefined ? Cookies.set('CookiesName',JSON.stringify(['projectName','releaseName'])) : Cookies.set('CookiesName',JSON.stringify([...JSON.parse(Cookies.get('CookiesName'))]))
        }else if(Cookies.get('releaseName')!==undefined){
            setValue(Cookies.get('releaseName'))
        }
    },[value])
   // console.log(JSON.parse(Cookies.get('projectInfo')))
    return (
        <>
              { 
              isProcessing ?
              <div className='flex justify-center items-center h-svh w-full'>
                {/* <span className="text-3xl text-slate-400 font-medium">Loading....</span> */}
                   <RotatingLines strokeColor="#00ABF0" strokeWidth="3" height="96" width="96"/>
              </div> :
              <>
              {
                 isError ? (
                    <div className='flex justify-center items-center w-full py-20 mt-20'>
                        <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>{errorText}</h2>
                    </div>
                ) :
                (
                    <div className="flex  h-9/12 mt-10">
            <div className={`w-2/12 sm:w-1/3 bg-emerald-50 ${sidebar.isSideMenuOpen===false && 'invisible'}`}>
                <div className="flex flex-col">
                 <div className="flex items-center gap-1.5 sm:gap-3 md:gap-6 lg:gap-8 mt-4 md:mt-6 ml-1 sm:ml-4 mr-1.5 sm:mr-4 md:ml-6 md:mr-6 lg:mr-10">
                        <span className="font-medium sm:font-semibold text-xs  md:text-sm lg:text-base text-slate-400">Project</span>
                        <span className="text-xs sm:text-xs lg:text-base whitespace-nowrap">{projectInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-3 md:gap-6 lg:gap-8 mt-2 lg:mt-4 ml-1 sm:ml-4 md:ml-6 mr-1.5 sm:mr-4 md:mr-6 lg:mr-10">
                        <span className="font-medium sm:font-semibold text-xs  md:text-sm lg:text-base text-slate-400">Release</span>

                        <select defaultValue={value} className="w-full text-xs lg:text-base py-0.5 sm:px-1 sm:py-1 md:px-2 md:py-1.5 border border-slate-300 focus:border-cyan-400 rounded text-slate-400" onChange={(e)=>setValue(e.target.value)}>
                            <option value='' selected disabled hidden>{value=='' ? 'Select' : value}</option>
                            {
                                option.map((element, index)=>(
                                    <option value={element.id} key={index}>{element.label}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className=" flex flex-col mt-4 overflow-auto h-96">
                        {
                            testCycle.map((testCycleElement, testCycleIndex)=>(
                                <div key={testCycleIndex}>
                                    <Hierarchy_Folder testCycle={testCycleElement} fileType={'folder'} icon={'test-Cycles'}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={`w-8/12 sm:w-2/3 ${sidebar.isSideMenuOpen===false && 'invisible sm:visible'}`}>
               <Outlet/>
            </div>
        </div>
                )
              }
              </>
                }
        </>
        
    )
}
export default Execute_Test_Run;