import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import axiosInstance from '../../../utils';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Model = ({defects, addNewDefect ,onClose, children }) => {
    const modelRef = useRef();
    const nav=useNavigate();
    const [defectPid, setDefectPid]=useState('')
    const [errorMessage, setErrorMessage]=useState('')
    const onCloseModel = (e) => {
        if (modelRef.current === e.target) {
            onClose()
        }
    }
    console.log(defects)
    const handelGetDefectFromPid=async()=>{
        try{
            const defectResponse=await axiosInstance.post(`/singleDefect/project/130015/search`, {defectId:defectPid})
            //console.log(defectResponse)
            if(defectResponse.data.items.length==0){
                setErrorMessage('Invalid defect Id')
            }else{
                for(var i=0; i<defects.length; i++){
                    if(defects[i].id==defectResponse.data.items[0].id){
                        setErrorMessage('Defect is already exist')
                        console.log('rakesh')
                        break;
                    }
                }
                if(i==defects.length){
                    console.log(defectResponse);
                    const newDefect={
                        id:defectResponse.data.items[0].id,
                        pid:defectResponse.data.items[0].pid,
                        summary:defectResponse.data.items[0].properties[0].field_value,
                        status:defectResponse.data.items[0].properties[11].field_value_name,
                        description:defectResponse.data.items[0].properties[1].field_value
                    }
                    console.log(newDefect)
                    addNewDefect(newDefect)
                    setErrorMessage('defect Added sunccessefully')
                }
            }
        }catch(err){
            console.log(err)
            setErrorMessage(err.response.data)
        }
    }
    const handelGetDefectInfoFromId=async(defectId)=>{
        console.log(defectId)
        try{
            const defectResponse=await axiosInstance.get(`/defect/project/130015/defect/${defectId}`)
            console.log(defectResponse);
            Cookies.set('defectInfo',JSON.stringify(defectResponse.data.properties))
            Cookies.set('submittedDate',defectResponse.data.submitted_date)
            Cookies.set('defectId',defectResponse.data.id)
            Cookies.set('CookiesName',JSON.stringify([...JSON.parse(Cookies.get('CookiesName')),['defectInfo','submittedDate']]))
            nav('/defect')
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        defectPid=='' && setErrorMessage('')
    },[defectPid])
    return (
        <div ref={modelRef} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center' onClick={onCloseModel}>
            <div className='flex flex-col gap-4 bg-white text-black rounded-lg px-4 py-2 w-2/5'>
                <div className='flex gap-5 justify-between items-center'>
                    <span className='text-lg font-semibold whitespace-nowrap'>Link Defect</span>
                    <div className='flex justify-center items-center h-5 w-5 rounded-full bg-gray-200 hover:bg-gray-100 cursor-pointer' title='Cancel' onClick={onClose}>
                        <RxCross2 className='text-xs' />
                    </div>
                </div>
                {/* {children} */}
                <div className='flex gap-4 mr-28'>
                    <div className='flex gap-1 flex-col'>
                    <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" placeholder='Enter Defect Id' value={defectPid} onChange={(e)=>{setDefectPid(e.target.value); defectPid!='' && setErrorMessage('')}}/>
                    <label className={`${errorMessage=='Invalid defect Id' ?'text-red-500' : 'text-green-500' } text-xs font-semibold h-1`}>{errorMessage}</label>
                    </div>
                    <div>
                    <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-base font-semibold px-2 py-0.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={()=>defectPid=='' ? setErrorMessage('Please Enter defect Id') : handelGetDefectFromPid()}>Search</button>
                    </div>
                </div>
                <span className='text-sm font-semibold whitespace-nowrap'>Test Log's Defect</span>
                <div className='overflow-auto rounded-lg shadow h-32'>
                    <tabel>
                        <thead className='bg-cyan-100 border-2 border-gray-200'>
                            <tr>
                                <th className='w-1/6 p-2 text-sm font-semibold traking-wide text-left'>ID</th>
                                <th className='w-7/12 p-2 text-sm font-semibold traking-wide text-left'>SUMMARY</th>
                                <th className='w-1/6 p-2 text-sm font-semibold traking-wide text-left'>STATUS</th>
                                <th className='p-2 text-sm font-semibold traking-wide text-left'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {
                                defects.map((e,i)=>(
                                    <tr className='hover:bg-gray-100' key={i}>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
                                    <p className='font-bold text-blue-500 hover:underline' onClick={()=>handelGetDefectInfoFromId(e.id)}>{e.pid}</p>
                                </td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{e.summary}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{e.status}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
                                    <div className='flex justify-center items-center h-4 w-4 rounded-full bg-red-500 cursor-pointer' title='Delete'>
                                        <RxCross2 className='text-white text-xs' />
                                    </div>
                                </td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </tabel>
                </div>
            </div>
        </div>
    )
}
export default Model;