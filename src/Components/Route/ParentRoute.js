import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import UATNext from "../Pages/UAT-Next/UATNext";
import Review_UAT_Test_Cases from "../Pages/Review-SIT-Test-Cases/Review_SIT_Test_Cases";
import Author_UAT_Test_Cases from "../Pages/Author-UAT-Test-Cases/Author_UAT_Test_Cases";
import Triage_UAT_Defects from "../Pages/Triage-UAT-Defects/Triage_UAT_Defects";
import Execute_Test_Run_Sidebar from "../Pages/Execute-Test-Run/Execute_Test_Run_Sidebar";
import Execute_Test_Run from "../Pages/Execute-Test-Run/Execute_Test_Run";
import Context from "../../Context/Context";
import Cookies from "js-cookie";
import UAT_Test_Execution_Details from "../Pages/Execute-Test-Run/UAT_Test_Execution_Details";
import Defect from "../Pages/Execute-Test-Run/Defect";
const ParentRoute = () => {
    const {highlight}=useContext(Context);
    console.log(highlight)
    //console.log(Cookies.get('hello'))
    return (
        <div className="flex flex-col">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<UATNext />} />
                    <Route path="/review-SIT-Test" element={<Review_UAT_Test_Cases />} />
                    <Route path="/ExecuteTestRun" element={<Execute_Test_Run_Sidebar />}>
                        <Route path={`${highlight}`} element={<Execute_Test_Run />} />
                    </Route>
                    <Route path={`/TestExecutionDetails`} element={<UAT_Test_Execution_Details/>}/>
                    <Route path="/defect" element={<Defect/>} />
                    <Route path="/author-UAT-Test" element={<Author_UAT_Test_Cases />} />
                    <Route path="/triage-UAT-Defects" element={<Triage_UAT_Defects />} />
                </Routes>
            </Router>
        </div>
    )
}
export default ParentRoute;