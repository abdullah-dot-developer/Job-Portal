import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `https://job-portal-mu3d.onrender.com/api/v1/job/get?keyword=${searchedQuery}`,
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
        toast.error(error.response.data.message);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
