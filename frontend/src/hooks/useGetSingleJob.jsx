import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (jobId) => {
  console.log("job Id goes here", jobId);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `https://job-portal-mu3d.onrender.com/api/v1/job/get/${jobId}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res);
        if (res.data.success) {
          dispatch(setAllJobs(res?.data?.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, []);
};

export default useGetSingleJob;
