import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `https://job-portal-mu3d.onrender.com/api/v1/application/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `https://job-portal-mu3d.onrender.com/api/v1/job/get/${jobId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  const isApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h2 className="border-b-2 border-b-gray-300 font-medium py-4 text-lg">
        Job Description
      </h2>
      <div className="space-y-4 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="font-bold text-lg">Role:</span>
          <span className="text-gray-800">{singleJob?.title}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="font-bold text-lg">Location:</span>
          <span className="text-gray-800">{singleJob?.location}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="font-bold text-lg">Description:</span>
          <span className="text-gray-800">{singleJob?.description}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="font-bold text-lg">Experience:</span>
          <span className="text-gray-800">
            {singleJob?.experienceLevel} yrs
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="font-bold text-lg">Salary:</span>
          <span className="text-gray-800">{singleJob?.salary} LPA</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="font-bold text-lg">Total Applicants:</span>
          <span className="text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="font-bold text-lg">Posted Date:</span>
          <span className="text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
