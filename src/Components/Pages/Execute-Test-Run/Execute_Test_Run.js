import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Context from "../../../Context/Context";
import { RotatingLines } from 'react-loader-spinner';
import { colours } from "nodemon/lib/config/defaults";
const Execute_Test_Run = () => {
    console.log('rakesh')
    const { highlight, project } = useContext(Context);
    const nav = useNavigate();
    const [testCycleInfo_Or_TestSuite_Info, setTestCycleInfo_Or_TestSuite_Info] = useState([])
    const [filterTestCycleInfo_Or_TestSuite_Info, setFilterTestCycleInfo_Or_TestSuite_Info] = useState([])
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    console.log(highlight)
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
            //selector: row => row.id,
            selector: row => row.pid,
            width: "100px",
            maxWidth: 'auto',

        },
        {
            name: 'Test Case ID',
            selector: row => row.testCasePid,
            width: "100px",
            maxWidth: 'auto',

        },
        {
            name: 'Name',
            selector: row => row.name,
            width: "100px",
            maxWidth: 'auto',

        },
        {
            name: 'Assigned To',
            selector: row => row.properties[10].field_value_name,
            width: "100px",
            maxWidth: 'auto',
        },
        {
            name: 'Status',
            selector: row => row.properties[3].field_value,
            selector: row => row.properties[3].field_value_name,

            width: "100px",
            maxWidth: 'auto',
        },
        {
            name: 'Priority',
            selector: row => row.properties[11].field_value_name,
            grow: 0,
            width: "100px",
            maxWidth: 'auto',
        },
        {
            name: 'Planned Start Date',
            selector: row => row.properties[2].field_value,
            width: "100px",
            maxWidth: 'auto',
        },
        {
            name: 'Planned End Date',
            selector: row => row.properties[6].field_value,
            width: "100px",
            maxWidth: 'auto',
        },
        {
            name: 'Action',
            cell: (row) => (
                <button type="button" class=" btn focus:outline-none text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:ring-green-300  rounded  px-4 py-1 dark:bg-cyan-500 dark:hover:bg-gray-400 dark:focus:ring-green-800" onClick={() => handelRunTestCases(row)}>Run</button>
            ),
            // width:"3%",
            // maxWidth: 'auto',
        },

    ];
    const customStyle = {
        headRow: {
            style: {
                minHeight: '45px',
                backgroundColor: '#EFFFE8',
                color: "black",
               // maxWidth: "500px"
            }
        },
        headCells: {
            style: {
                fontSize: '12px',
                fontWeight: '600',
                TextTransform: 'uppercase',
                margin: "0px",
                //maxWidth: "500px"
            }
        },
        cells: {
            style: {
                fontSize: '12px',
                //padding: '8px',
            }
        },
        rows: {
            style: {
                zIndex: 2,
                minHeight: '40px !important', // override the row height
                fontSize: '14px',
                whiteSpace: 'pre',
                padding: '0px',
                //maxWidth: "500px"
            },
        },
        subHeader: {
            style: {
                minHeight: '40px',
            },
        },

    }

    const handelRunTestCases = async (row) => {
        Cookies.set('testRunId', row.id);
        Cookies.set('testRunInfo', JSON.stringify(
            {
                testRunId: row.pid,
                testCaseId: row.testCasePid,
                testCaseName: row.name,
                assignTo: row.properties[10].field_value_name,
                // Status:row.properties[3].field_value_name,
                // StatusId:row.properties[3].field_value
                Status: { name: row.properties[3].field_value_name, id: row.properties[3].field_value }

            }))
        console.log(project)
        console.log('TestRunId', row.id)
        nav(`/TestExecutionDetails`)
        Cookies.set('CookiesName', JSON.stringify([...JSON.parse(Cookies.get('CookiesName')), ...['testRunId', 'testRunInfo']]))
    }
    console.log(project)
    const handelFetch_TestCycleInfo_Or_TestSuite_Info = async (testSuiteId) => {
        try {
            setIsProcessing(true)
            const testCycleInfo_Or_testSuiteInfo_response = await axios.get(`https://qtestapi-9ho0.onrender.com/testsuite/${testSuiteId}`)
            console.log(testCycleInfo_Or_testSuiteInfo_response.data);
            setTestCycleInfo_Or_TestSuite_Info(testCycleInfo_Or_testSuiteInfo_response.data.items)
            setFilterTestCycleInfo_Or_TestSuite_Info(testCycleInfo_Or_testSuiteInfo_response.data.items)
        } catch (err) {
            setErrorText(err.message);
            setIsError(true)
            console.log(err);
        } finally {
            setIsProcessing(false)
        }
    }
    const handelFilterTestCases = (e) => {
        const newData = filterTestCycleInfo_Or_TestSuite_Info.filter(row => row.pid.toLowerCase().includes(e.target.value.toLowerCase()));
        setTestCycleInfo_Or_TestSuite_Info(newData)
    }
    const handelFilterAssignToMeTestRun = (e) => {
        const newData = filterTestCycleInfo_Or_TestSuite_Info.filter(row => row.properties[10].field_value_name.toLowerCase().includes(e.target.value.toLowerCase()));
        setTestCycleInfo_Or_TestSuite_Info(newData)
    }
    const handelViewAllTestRun = () => {
        setTestCycleInfo_Or_TestSuite_Info(filterTestCycleInfo_Or_TestSuite_Info)
    }
    useEffect(() => {
        Cookies.remove('defectData')
        Cookies.remove('defectDataId')
        // if(Cookies.get('TestCycleId_Or_TestSuiteId') !== undefined){
        //     setIsProcessing(true);
        //     console.log(highlight)
        //    highlight!=='' &&  handelFetch_TestCycleInfo_Or_TestSuite_Info(highlight);
        // }
        if (highlight !== '') {
            setIsProcessing(true);
            handelFetch_TestCycleInfo_Or_TestSuite_Info(highlight);
        } else {
            setFilterTestCycleInfo_Or_TestSuite_Info([])
        }
    }, [highlight])
    return (
        <>
            {
                isProcessing ?
                    <div className='flex justify-center items-center h-svh w-full'>
                        <RotatingLines strokeColor="#00ABF0" strokeWidth="3" height="96" width="96" />
                    </div> :
                    <>
                        {
                            isError ? (
                                <div className='flex justify-center items-center w-full py-20 mt-20'>
                                    <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>{errorText}</h2>
                                </div>
                            ) :
                                (

                                    <div className="flex h-9/12 flex-col mt-3 sm:mt-5 md:mt-2 lg:mt-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 lg:gap-4 sm:items-center mx-3 md:mx-8 ">
                                            <div className="flex gap-2">
                                                <div className="flex items-center gap-2">
                                                    <input type="radio" name="filterTestRun" value='Saheb Ojha' onClick={handelFilterAssignToMeTestRun} />
                                                    <span className="text-xs lg:text-sm whitespace-nowrap">Assigned To Me</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input type="radio" name="filterTestRun" onClick={handelViewAllTestRun} />
                                                    <span className="text-xs lg:text-sm whitespace-nowrap">View all</span>
                                                </div>
                                            </div>
                                            {/* <div className="flex  h-10 gap-2 overflow-none w-1/2"> */}
                                            <input type="text" placeholder="Search test case" className="border text-xs lg:text-sm px-1 py-2.5 lg:py-2 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-1 sm:w-11/12 lg:w-full" onChange={handelFilterTestCases} />
                                            <Select styles={selectStyle} className='text-xs lg:text-sm w-full border   rounded outline-none ring-0 border-gray-700 focus:border-gray-700 focus:border-2' options={options} isSearchable />
                                            {/* </div> */}
                                            <div className="sm:mt-2">
                                                <button type="button" className="text-white bg-indigo-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs lg:text-sm px-2 py-1 lg:px-3 lg:py-2 sm:me-1 lg:me-2 mb-2 ">Clear Search</button>
                                            </div>
                                        </div>
                                        
                                        <div className="px-3 h-36 py-1 sm:px-6 sm:py-2 w-12/12">

                                            {
                                                highlight !== '' ?

                                                    <DataTable
                                                        columns={columns}
                                                        data={testCycleInfo_Or_TestSuite_Info}
                                                        pagination
                                                        expandableInheritConditionalStyles
                                                        paginationPerPage={6}
                                                        fixedHeader
                                                        paginationRowsPerPageOptions={[4, 5, 6, 7, 10]}
                                                        highlightOnHover
                                                        customStyles={customStyle}
                                                    // paginationServer
                                                    // paginationTotalRows={}
                                                    // onChangeRowsPerPage={}
                                                    // onChangePage={}

                                                    />

                                                    :
                                                    <div className="w-full h-96 flex justify-center items-center">
                                                        <span>There are no record to display</span>
                                                    </div>
                                            }
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