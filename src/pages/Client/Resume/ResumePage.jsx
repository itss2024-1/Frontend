import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { callFetchResumeById } from "../../../services/api";
import ResumeDetail from "../../../components/Resume/ResumeDetail";

const ResumePage = () => {
    const [dataBook, setDataResume] = useState()
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id");

    useEffect(() => {
        fetResume(id);
    }, [id]);

    const fetResume = async (id) => {
        const res = await callFetchResumeById(id);
        if (res && res.data) {
            setDataResume(res.data.data);
        }
    }

    return (
        <div>
            <h1>Resume Detail Page</h1>
            <ResumeDetail dataResume={dataBook} />
        </div>
    );
}

export default ResumePage;