import React from "react";
import { useNavigate } from "react-router-dom";
import CreateJobPost from "../pages/CreateJobPost";
import AdminJobPostList from "../pages/AdminJobPostList";

const JobAdminPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard"); // update path if needed
  };

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-2">
        <div className="col-4 text-start ">
          <button className="btn btn-primary"
            style={{ width: "100px" }}   onClick={handleGoHome}>
            ← Home
          </button>
        </div>
        <div className="col-4 text-center">
          <h2 className="text-primary m-0">Admin Job Post Panel</h2>
        </div>
        <div className="col-4">{/* Right side empty for spacing */}</div>
      </div>

      <CreateJobPost />
      <hr className="my-4" />
      <AdminJobPostList />
    </div>
  );
};

export default JobAdminPage;
