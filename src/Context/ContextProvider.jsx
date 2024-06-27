import { useState } from "react";
import Context from "./Context";
const ContextProvider =({children})=>{
    const [sidebar, setSidebar]=useState({isSideMenuOpen:true})
    const [highlight, setHighlight]=useState('')
    const [testCycleId_Or_testSuiteId]=useState('')
    return(
        <Context.Provider value={{
            sidebar, setSidebar,
            highlight, setHighlight,
            testCycleId_Or_testSuiteId,
            }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider;