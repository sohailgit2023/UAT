import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import axios from 'axios';
import { GoHomeFill } from "react-icons/go";
import { MdArrowDropUp } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { BiNotepad } from "react-icons/bi";
import Context from "../../../Context/Context";
import axiosInstance from "../../../utils";
import Cookies from "js-cookie";
const Review_UAT_Test_Cases = () => {
    const {sidebar}=useContext(Context);
    const [apiData, setApiData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isOpenProject, setIsOpenProject] = useState(false);
    const [releaseIndex, setReleaseIndex] = useState([])
    const [release, setRelease] = useState([])
    const [testSuit, setTestSuit] = useState([])
    const options = [
        { value: 'active', label: 'active' },
        { value: 'inactive', label: 'inactive' }
    ];
    const selectStyle = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'none' : 'none',
            backgroundColor: "white"
        }),
    }
    const columns = [
        {
            name: 'Test Run ID',
            selector: row => row.id,
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Test Case ID',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Assigned To',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Priority',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Planned Start Date',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Planned End Date',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.name,
            sortable: true,
        },

    ];
    const customStyle = {
        headRow: {
            style: {
                minHeight: '45px',
                backgroundColor: '#EFFFE8',
                color: "black"
            }
        },
        headCell: {
            style: {
                fontSize: '16px',
                fontWeight: '600',
                TextTransform: 'uppercase'
            }
        },
        cells: {
            style: {
                fontSize: '12px',

            }
        },
        rows: {
            style: {
                zIndex: 2,
                minHeight: '40px !important', // override the row height
                fontSize: '14px',
                whiteSpace: 'pre',
            },
        },
        subHeader: {
            style: {
                minHeight: '40px',
            },
        },

    }
    const handleDataFetch = () => {
        setIsProcessing(true)
        axios
            .get('https://timesheet-application-9xly.onrender.com/client')
            .then((res) => {
                console.log('Data Process Successfuly');
                console.log(res);
                console.log(res.data.data);
                console.log(res.data);
                setApiData(res.data.data)
            })
            .catch((err) => {
                console.log('Data Process Error');
                console.log(err)
                setErrorText(err.message);
                setIsError(true)
            })
            .finally(() => setIsProcessing(false))
    }
    useEffect(() => {
        setIsProcessing(true);
        handleDataFetch()
    }, [])
    const handelProjectClose = () => {
        setIsOpenProject(false)
        setRelease([])
    }
    const handelProjectOpen = () => {
        setIsOpenProject(true)
        setRelease(['Release-1', 'Release-2', 'Release-3', 'Release-4', 'Release-5', 'Release-6', 'Release-7', 'Release-8', 'Release-9', 'Release-10', 'Release-10'])
    }
    const handelReleaseOpen = (index) => {
        setTestSuit([...testSuit, { id: index, value: ['TestSuit-1', 'TestSuit-2', 'TestSuit-3', 'TestSuit-4', 'TestSuit-5', 'TestSuit-6', 'TestSuit-7', 'TestSuit-8', 'TestSuit-9', 'TestSuit-10', 'TestSuit-11'] }])
        setReleaseIndex([...releaseIndex, index])
    }
    const handelReleaseClose = (index) => {
        setTestSuit([])
        console.log(releaseIndex.indexOf(index))

        const filterIndex = releaseIndex.filter((e, i) => {
            if (index !== e) {
                return e;
            }
        })
        setReleaseIndex(filterIndex)
        const filterTestSuit = testSuit.filter((e, i) => {
            if (index !== e.id) {
                return e;
            }
        })
        setTestSuit(filterTestSuit)
    }
    console.log(releaseIndex)
    console.log(testSuit)
    const handelFetchProject = async() => {
        try {
          const response=await axiosInstance
                .get(`/api/v3/projects`)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        // const headers = { 'Authorization': 'Bearer fe453042-4eb3-463c-a2e2-06436acd57df' };
        // fetch('https://pursuitrnd.qtestnet.com/api/v3/projects', { headers })
        // //.then(response => response.json())
        //     .then(data => console.log('rakesg', data))
        //      .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        handelFetchProject()
    },[])
    return (
                <div className="flex h-screen">
            <div className={`w-5/12 sm:w-1/3 bg-emerald-50 ${sidebar.isSideMenuOpen===false && 'invisible'}`}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row md:items-center lg:items-center gap-1 md:gap-6 lg:gap-8 mt-4 md:mt-6 ml-2 sm:ml-6 mr-2 sm:mr-6 lg:mr-10">
                        <span className="font-semibold text-xs sm:text-sm lg:text-base">Project</span>
                        <Select styles={selectStyle} className='text-xs lg:text-sm w-full lg:-p-2' options={options} isSearchable />
                    </div>
                    <div className="flex items-center gap-1 bg-cyan-300 mt-2 lg:mt-4 ml-1 sm:ml-6 mr-1 sm:mr-6 md:mr-6 lg:mr-10">
                        {isOpenProject ? <MdOutlineArrowDropDown className="text-base sm:text-lg md:text-xl " onClick={handelProjectClose} /> : <MdArrowDropUp className="text-base sm:text-lg md:text-xl" onClick={handelProjectOpen} />}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 lg:gap-2">
                                <GoHomeFill className="mt-0.5 text-sm sm:text-base lg:text-lg bg-orange-500 text-white" />
                                <span className="text-xs sm:text-sm lg:text-base">Project-1</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-auto h-96">
                        {
                            release.map((element, index) => (
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-0.5 sm:gap-1 sm:mt-1 ml-4 sm:ml-8 lg:ml-12 mr-0 sm:mr-4 md:mr-6 lg:mr-3" key={index}>
                                        {releaseIndex.includes(index) === true ? <MdOutlineArrowDropDown className="text-base sm:text-lg md:text-xl" onClick={() => handelReleaseClose(index)} /> : <MdArrowDropUp className="text-base sm:text-lg md:text-xl" onClick={() => handelReleaseOpen(index)} />}
                                        <PiDotsThreeCircleFill className="text-sm mt-1 sm:mt-0" />
                                        <span className="text-xs font-normal ">{element}</span>
                                    </div>
                                    {
                                        (releaseIndex.includes(index) === true) && testSuit.map((testSuitValue, i) => (
                                            testSuitValue.id === index && <div key={i}>
                                                {
                                                    testSuitValue.value.map((suit, suitIndex) => (
                                                        <div className="flex items-center gap-1 mt-0.5 sm:mt-1 ml-10 sm:ml-16 lg:ml-20 mr-0.5 sm:mr-1 md:mr-6 lg:mr-0" key={suitIndex}>
                                                            <BiNotepad className="text-xs sm:text-sm text-yellow-600" />

                                                            <span className="text-xs font-normal ">{suit}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                    {/* <div className="ml-2 sm:ml-6 mt-1 sm:mt-2 md:mt-2 lg:mt-4">
                        <span className="text-xs lg:text-sm">No test suite are available</span>
                    </div> */}
                </div>
            </div>
            <div className={`w-7/12 sm:w-2/3 ${sidebar.isSideMenuOpen===false && 'invisible sm:visible'}`}>
                <div className="flex flex-col mt-3 sm:mt-5 md:mt-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mx-2 sm:mx-8">
                            <span className="font-semibold text-xs md:text-sm">Requirement</span>
                            <span className="text-xs md:text-sm truncate">RQ-4642</span>
                            <span className="font-semibold text-xs md:text-sm">Module</span>
                            <span className="text-xs md:text-sm truncate">UAT Next DEV</span>
                            <span className="font-semibold text-xs md:text-sm">Title</span>
                            <span className="text-xs md:text-sm truncate">D365 failed to recive Po modification</span>
                            <span className="font-semibold text-xs md:text-sm">Description</span>
                            <span className="text-xs md:text-sm truncate">This senario will validate how TMNA</span>
                            <span className="font-semibold text-xs md:text-sm whitespace-nowrap">Linkned System</span>
                            <span className="text-xs md:text-sm truncate">Azure Bords</span>
                            <span className="font-semibold text-xs md:text-sm">Link Id</span>
                            <span className="text-xs md:text-sm truncate">12324</span>
                    </div>
                    <div className="mt-2 md:mt-5 mx-2 sm:mx-8">
                        <span className="font-semibold text-xs md:text-sm">Existing Test Cases</span>
                    </div>
                    <div className="px-1 sm:py-1 sm:px-6 sm:py-2 mt-2 lg:mt-0 overflow-auto">
                        {
                            isProcessing ?
                                <div className='flex justify-center items-center w-full py-20 mt-20'>
                                    <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20 whitespace-nowrap'>Loading data.....</h2>
                                </div> :
                                <>
                                    {
                                        isError ? (
                                            <div className='flex justify-center items-center w-full py-20 mt-20'>
                                                <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>{errorText}</h2>
                                            </div>
                                        ) :
                                            (
                                                <>
                                                    <DataTable
                                                        columns={columns}
                                                        data={apiData}
                                                        pagination
                                                        paginationPerPage={5}
                                                        paginationRowsPerPageOptions={[4, 5, 6, 7, 10]}
                                                        highlightOnHover
                                                        customStyles={customStyle}

                                                    />
                                                </>
                                            )
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Review_UAT_Test_Cases;