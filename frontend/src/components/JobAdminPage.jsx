import React from "react";
import Topbar from "./Topbar";
import CreateJobPost from "../pages/CreateJobPost";
import AdminJobPostList from "../pages/AdminJobPostList";

const JobAdminPage = () => {
  return (
    <>
      <Topbar />
      <div className="container mt-4">
        <div className="row align-items-center mb-2">
        </div>
        <CreateJobPost />
        <hr className="my-4" />
        <AdminJobPostList />
      </div>
    </>
  );
};

export default JobAdminPage;
