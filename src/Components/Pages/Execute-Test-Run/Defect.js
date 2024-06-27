import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '../../../utils';
import axios from 'axios';
const Defect = () => {
    const [summry, setSummry] = useState('')
    const [submitter, setSubmitter] = useState({ value: 478563, label: 'Rakesh Shaw' })
    const [severityOptions, setSeverityOption] = useState([])
    const [severityValue, setSeverityValue] = useState({ value: '', label: '' })
    const [submittedDate, setSubmittedDate] = useState('')
    const [priorityOption, setPriorityOption] = useState([])
    const [priorityValue, setPriorityValue] = useState({ value: '', label: '' })
    const [rootCauseOptions, setRootCauseOption] = useState([])
    const [rootCauseValue, setRootCauseValue] = useState({ value: '', label: '' })
    const [moduleOption, setModuleOption] = useState([])
    const [moduleValue, setModuleValue] = useState({ value: '', label: '' })
    const [assignToOption, setAssignToOption] = useState([])
    const [assignToValue, setAssignToValue] = useState({ value: '', label: '' })
    const [statusOption, setStatusOption] = useState([])
    const [statusValue, setStatusValue] = useState({ value: '', label: '' })
    const [typeOption, setTypeOption] = useState([])
    const [typeValue, setTypeValue] = useState({ value: '', label: '' })
    const [reasonOption, setReasonOption] = useState([])
    const [reasonValue, setReasonValue] = useState({ value: '', label: '' })
    const [categoryOption, setCategoryOPtion] = useState([])
    const [categoryValue, setCategoryValue] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [closeDate, setCloseDate] = useState('')
    const [linkedId, setLinkedId] = useState('')
    const [environmentOption, setEnvironmentOption] = useState([])
    const [environmentValue, setEnvironmentValue] = useState({ value: '', label: '' })
    const [linkedSystem, setLinkedSystem] = useState('Azure Boards')
    const [applicationOption, setApplicationOption] = useState([])
    const [applicationValue, setApplicationValue] = useState({ value: '', label: '' })
    const [affectedReleaseOption, setAffectedReleaseOption] = useState([])
    const [affectedReleaseValue, setAffectedReleaseValue] = useState({ value: '', label: '' })
    const [fixedReleaseOption, setFixedReleaseOption] = useState([])
    const [fixedReleaseValue, setFixedReleaseValue] = useState({ value: '', label: '' })
    const [targetReleaseOption, setTargetReleaseOption] = useState([])
    const [targetReleaseValue, setTargetReleaseValue] = useState({ value: '', label: '' })
    const [createdBy_UATnext_Only, setCreatedBy_UATnext_Only] = useState('')
    const [nonQaUserOption, setNonQaUserOption] = useState([])
    const [non_QA_User_UATnext_OnlyValue, setNon_QA_User_UATnext_OnlyValue] = useState({ value: '', label: '' })
    const [description, setDescription] = useState('')

    const [defectInfo, setDefectInfo] = useState(Cookies.get('defectInfo') != undefined ? JSON.parse(Cookies.get('defectInfo')) : '')

    const handelFetchSubmittedDate = () => {
        const date = new Date()
        const currentDateTime = `${date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`;
        Cookies.get('submittedDate')==undefined ? setSubmittedDate(currentDateTime) : setSubmittedDate(Cookies.get('submittedDate'))
        defectInfo !== '' && handelGetDefectInfo()
    }
    const handelGetDefectInfo = () => {
        setSummry(defectInfo[0].field_value)
        setDescription(defectInfo[1].field_value)
        setSubmitter({ value: defectInfo[2].field_value, label: defectInfo[2].field_value_name })
        setTargetDate(defectInfo[16].field_value.split('T')[0])
        setCloseDate(defectInfo[17].field_value.split(':')[0] + ':' + defectInfo[17].field_value.split(':')[1])
        setLinkedId(defectInfo[18].field_value)
        setLinkedSystem(defectInfo[20].field_value)
        setCreatedBy_UATnext_Only(defectInfo[22].field_value)
    }
    const handelAffectedReleaseBuild = async () => {
        try {
            const affectedResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127554/allowed-values`)
            const newOptions = affectedResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            setAffectedReleaseOption(newOptions)
            defectInfo != '' && setAffectedReleaseValue({ value: defectInfo[3].field_value, label: defectInfo[3].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    const handelPriority = async () => {
        try {
            const priorityResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127551/allowed-values`)
            const newOptions = priorityResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => {
                    defectInfo != '' ? setPriorityValue({ value: defectInfo[7].field_value, label: defectInfo[7].field_value_name }) : e.label == '1 - Critical' && setPriorityValue({ value: e.value, label: e.label })
                    return { value: e.value, label: e.label }
                });
            setPriorityOption(newOptions)
        } catch (err) {
            console.log(err)
        }
    }
    const handelSeverity = async () => {
        try {
            const severityResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127549/allowed-values`)
            const newOptions = severityResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => {
                    defectInfo != '' ? setSeverityValue({ value: defectInfo[4].field_value, label: defectInfo[4].field_value_name }) : e.label == '2 - High' && setSeverityValue({ value: e.value, label: e.label })
                    return { value: e.value, label: e.label }
                });
            setSeverityOption(newOptions)
        } catch (err) {
            console.log(err)
        }
    }
    const handelFixedReleaseBuild = async () => {
        try {
            const fixedReleaseResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127555/allowed-values`)
            const newOptions = fixedReleaseResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            setFixedReleaseOption(newOptions)
            defectInfo != '' && setFixedReleaseValue({ value: defectInfo[5].field_value, label: defectInfo[5].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    const handelRootCause = async () => {
        try {
            const rootCauseResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127556/allowed-values`)
            const newOptions = rootCauseResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => {
                    defectInfo != '' ? setRootCauseValue({ value: defectInfo[8].field_value, label: defectInfo[8].field_value_name }) : e.label == 'Other' && setRootCauseValue({ value: e.value, label: e.label })
                    return { value: e.value, label: e.label }
                });
            setRootCauseOption(newOptions)
        } catch (err) {
            console.log(err)
        }
    }
    const handelModule = async () => {
        try {
            const rootCauseResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127550/allowed-values`)
            const newOptions = rootCauseResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            setModuleOption(newOptions)
            defectInfo != '' && setModuleValue({ value: defectInfo[9].field_value, label: defectInfo[9].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    const handelAssignTo = async () => {
        try {
            const assignToResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127546/allowed-values`)
            const newOptions = assignToResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            setAssignToOption(newOptions)
            defectInfo != '' && setAssignToValue({ value: defectInfo[10].field_value, label: defectInfo[10].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    const handelStatus = async () => {
        try {
            const statusResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127557/allowed-values`)
            const newOptions = statusResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => {
                    defectInfo != '' ? setStatusValue({ value: defectInfo[11].field_value, label: defectInfo[11].field_value_name }) : e.label == 'New' && setStatusValue({ value: e.value, label: e.label })
                    return { value: e.value, label: e.label }
                });
            setStatusOption(newOptions)
        } catch (err) {
            console.log(err)
        }
    }
    const handelType = async () => {
        try {
            const typeResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127558/allowed-values`)
            const newOptions = typeResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => {
                    defectInfo != '' ? setTypeValue({ value: defectInfo[12].field_value, label: defectInfo[12].field_value_name }) : e.label == 'Bug' && setTypeValue({ value: e.value, label: e.label })
                    return { value: e.value, label: e.label }
                });
            setTypeOption(newOptions)
        } catch (err) {
            console.log(err)
        }
    }
    const handelTargetReleaseBuild = async () => {
        try {
            const targetReleaseResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127559/allowed-values`)
            const newOptions = targetReleaseResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            setTargetReleaseOption(newOptions)
            defectInfo != '' && setTargetReleaseValue({ value: defectInfo[13].field_value, label: defectInfo[13].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    const handelReason = async () => {
        try {
            const reasonResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127560/allowed-values`)
            const newOptions = reasonResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => {
                    defectInfo != '' ? setReasonValue({ value: defectInfo[14].field_value, label: defectInfo[14].field_value_name }) : e.label == 'Additional Info Needed' && setReasonValue({ value: e.value, label: e.label })
                    return { value: e.value, label: e.label }
                });
            setReasonOption(newOptions)
        } catch (err) {
            console.log(err)
        }
    }
    const handelCategory = async () => {
        try {
            const categoryResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127561/allowed-values`)
            const newOptions = categoryResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => {
                    defectInfo != '' ? setCategoryValue({ value: defectInfo[15].field_value, label: defectInfo[15].field_value_name }) : e.label == 'Other ' && setCategoryValue({ value: e.value, label: e.label })
                    return { value: e.value, label: e.label }
                });
            setCategoryOPtion(newOptions)
        } catch (err) {
            console.log(err)
        }
    }
    const handelEnviornment = async () => {
        try {
            const environmentResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13127564/allowed-values`)
            console.log('235==>', environmentResponse.data)
            const newOptions = environmentResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            console.log(newOptions);
            setEnvironmentOption(newOptions)
            defectInfo != '' && setEnvironmentValue({ value: defectInfo[19].field_value, label: defectInfo[19].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    const handelApplication = async () => {
        try {
            const applicationResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13592322/allowed-values`)
            const newOptions = applicationResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            setApplicationOption(newOptions)
            defectInfo != '' && setApplicationValue({ value: defectInfo[21].field_value, label: defectInfo[21].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    const handelNonQaUser = async () => {
        try {
            const nonQaUserResponse = await axiosInstance.get(`/project/130015/settings/defects/fields/13741220/allowed-values`)
            const newOptions = nonQaUserResponse.data
                .filter((e) => e.is_active == true)
                .map((e) => ({ value: e.value, label: e.label }));
            setNonQaUserOption(newOptions)
            defectInfo != '' && setNon_QA_User_UATnext_OnlyValue({ value: defectInfo[23].field_value, label: defectInfo[23].field_value_name })
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        handelFetchSubmittedDate()
        handelAffectedReleaseBuild()
        handelPriority()
        handelSeverity()
        handelFixedReleaseBuild()
        handelRootCause()
        handelModule()
        handelAssignTo()
        handelRootCause()
        handelStatus()
        handelType()
        handelTargetReleaseBuild()
        handelReason()
        handelCategory()
        handelApplication()
        handelEnviornment()
        handelNonQaUser()
    }, [])
    const handelTargetDate = (date) => {
        let targetIsoDate;
        if (date != '') {
            const [year, month, day] = date.split('-').map(Number);
            targetIsoDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)).toISOString();
        } else {
            targetIsoDate = '';
        }
        return targetIsoDate;
    }
    const handelSaveDefect = async () => {
        const req = {
            "properties": [
                {
                    "field_id": 13127544,
                    "field_value": summry
                },
                {
                    "field_id": 13127547,
                    "field_value": description
                },
                {
                    "field_id": 13127554,
                    "field_value": `${affectedReleaseValue.value}`,
                },
                {
                    "field_id": 13127549,
                    "field_value": `${severityValue.value}`,
                },
                {
                    "field_id": 13127555,
                    "field_value": `${fixedReleaseValue.value}`,
                },
                {
                    "field_id": 13127551,
                    "field_value": `${priorityValue.value}`,
                },
                {
                    "field_id": 13127556,
                    "field_value": `${rootCauseValue.value}`,
                },
                {
                    "field_id": 13127550,
                    "field_value": `${moduleValue.value}`,
                },
                {
                    "field_id": 13127546,
                    "field_value": `${assignToValue.value}`,
                },
                {
                    "field_id": 13127557,
                    "field_value": `${statusValue.value}`,
                },
                {
                    "field_id": 13127558,
                    "field_value": `${typeValue.value}`,
                },
                {
                    "field_id": 13127559,
                    "field_value": `${targetReleaseValue.value}`,
                },
                {
                    "field_id": 13127560,
                    "field_value": `${reasonValue.value}`,
                },
                {
                    "field_id": 13127561,
                    "field_value": `${categoryValue.value}`,
                },
                {
                    "field_id": 13127562,
                    "field_value": `${handelTargetDate(targetDate)}`
                },
                {
                    "field_id": 13127563,
                    "field_value": closeDate != '' ? `${closeDate}:00.000Z` : ''
                },
                {
                    "field_id": 13209819,
                    "field_value": linkedId
                },
                {
                    "field_id": 13127564,
                    "field_value": environmentValue.value,
                },
                {
                    "field_id": 13209820,
                    "field_value": linkedSystem
                },
                {
                    "field_id": 13592322,
                    "field_value": `${applicationValue.value}`,
                },
                {
                    "field_id": 13738436,
                    "field_value": createdBy_UATnext_Only
                },
                {
                    "field_id": 13741220,
                    "field_value": `${non_QA_User_UATnext_OnlyValue.value}`,
                }
            ].filter(property => property && property.field_value !== '')
        }
        console.log(req)
        try {
            if (defectInfo == '') {
               const defectResponse= await axiosInstance.post('/project/130015/addDefect', req)
               const newDefect={
                id:defectResponse.data.id,
                pid:defectResponse.data.pid,
                summary:defectResponse.data.properties[0].field_value,
                status:defectResponse.data.properties[11].field_value_name,
                description:defectResponse.data.properties[1].field_value
            }
           // Cookies.set('defectDataId', JSON.stringify([...JSON.parse(Cookies.get('defectDataId')),defectResponse.data.id]))
            Cookies.set('defectData', JSON.stringify([...JSON.parse(Cookies.get('defectData')), newDefect]))
               console.log(defectResponse.data)
            } else {
               const defectInfoResponse= await axiosInstance.put(`/project/130015/updateDefect/${Cookies.get('defectId')}`, req)
               console.log(defectInfoResponse.data)
               Cookies.set('defectInfo', JSON.stringify(defectInfoResponse.data.properties))
            }
        } catch (err) {
            alert(err.response.data.error)
        }
    }
    return (
        <div className='bg-slate-100'>
            <div className='flex flex-col gap-6 mt-4 mx-6 overflow-auto'>
                <span className='text-2xl font-normal'>New Defect</span>
                <div className='flex gap-4 justify-center items-center mt-2'>
                    <span>Summary</span>
                    <input type="text" className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" value={summry} onChange={(e) => setSummry(e.target.value)} />
                </div>
                <div className='grid grid-cols-4 gap-8'>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Submitter</span>
                        <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" readOnly={true} value={submitter.label} />
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Affected Release/Build</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full relative" onChange={(e) => setAffectedReleaseValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={affectedReleaseValue.value} selected disabled hidden>{affectedReleaseValue.label}</option>
                            {
                                affectedReleaseOption.map((element, index) => (
                                    <option value={element.value}>{element.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Severity</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setSeverityValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={severityValue.value} selected disabled hidden>{severityValue.label}</option>
                            {
                                severityOptions.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Fixed Release/Build</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setFixedReleaseValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={fixedReleaseValue.value} selected disabled hidden>{fixedReleaseValue.label}</option>
                            {
                                fixedReleaseOption.map((element, index) => (
                                    <option value={element.value}>{element.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Submitted Date</span>
                        <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" readOnly={true} value={submittedDate} />
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Priority</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setPriorityValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={priorityValue.value} selected disabled hidden>{priorityValue.label}</option>
                            {
                                priorityOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Root Cause</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setRootCauseValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={rootCauseValue.value} selected disabled hidden>{rootCauseValue.label}</option>
                            {
                                rootCauseOptions.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Module</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setModuleValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={moduleValue.value} selected disabled hidden>{moduleValue.label}</option>
                            {
                                moduleOption.map((element, index) => (
                                    <option value={element.value}>{element.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Assigned To</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setAssignToValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={assignToValue.value} selected disabled hidden>{assignToValue.label}</option>
                            {
                                assignToOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Status</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setStatusValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={statusValue.value} selected disabled hidden>{statusValue.label}</option>
                            {
                                statusOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Type</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setTypeValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={typeValue.value} selected disabled hidden>{typeValue.label}</option>
                            {
                                typeOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Target Release/Build</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setTargetReleaseValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={targetReleaseValue.value} selected disabled hidden>{targetReleaseValue.label}</option>
                            {
                                targetReleaseOption.map((element, index) => (
                                    <option value={element.value}>{element.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Reason</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setReasonValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={reasonValue.value} selected disabled hidden>{reasonValue.label}</option>
                            {
                                reasonOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Category</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setCategoryValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={categoryValue.value} selected disabled hidden>{categoryValue.label}</option>
                            {
                                categoryOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Target Date</span>
                        <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" type='date' value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
                    </div>
                    <div className='flex gap-3  items-center'>
                        <span className='text-sm font-normal'>Closed Date</span>
                        <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" type='datetime-local' value={closeDate} onChange={(e) => setCloseDate(e.target.value)} />
                        {/* <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" type='time' onChange={(e)=>setCloseDateTimeVAlue(e.target.value)}/> */}
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Link ID</span>
                        <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" onChange={(e) => setLinkedId(e.target.value)} />
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Environment</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setEnvironmentValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={environmentValue.value} selected disabled hidden>{environmentValue.label}</option>
                            {
                                environmentOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Linked System</span>
                        <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" value={linkedSystem} onChange={(e) => setLinkedSystem(e.target.value)} />
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Application</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setApplicationValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={applicationValue.value} selected disabled hidden>{applicationValue.label}</option>
                            {
                                applicationOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Created By (UATNext Only)</span>
                        <input className="border text-xs lg:text-sm px-1 py-2.5 lg:py-1 rounded outline-none ring-0 border-gray-600 focus:border-gray-700 focus:border-2 sm:w-11/12 lg:w-full" onChange={(e) => setCreatedBy_UATnext_Only(e.target.value)} />
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <span className='text-sm font-normal'>Non-QA User (UATNext Only)</span>
                        <select className="text-xs lg:text-sm border border-1 border-slate-400 rounded px-1 lg:px-2 lg:py-1 w-full" onChange={(e) => setNon_QA_User_UATnext_OnlyValue({ value: e.target.value, label: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text })}>
                            <option value={non_QA_User_UATnext_OnlyValue.value} selected disabled hidden>{non_QA_User_UATnext_OnlyValue.label}</option>
                            {
                                nonQaUserOption.map((e, i) => (
                                    <option value={e.value}>{e.label}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <span>Description</span>
                    <textarea rows={8} className='block p-2 w-full resize-y text-xs text-gray-900 bg-gray-50 rounded border border-slate-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 whitespace-nowrap' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex gap-2 justify-end mt-4 mb-4">
                    <button type="button" className="text-white bg-cyan-500 focus:ring-4 focus:ring-blue-300 font-normal lg:font-medium text-xs lg:text-sm px-2 py-1 lg:px-8 lg:py-2 sm:me-1 lg:me-2 " onClick={handelSaveDefect}>SAVE</button>
                </div>
            </div>
        </div>
    )
}
export default Defect;