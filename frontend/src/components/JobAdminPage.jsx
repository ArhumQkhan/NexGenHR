import React from "react";
import CreateJobPost from "../pages/CreateJobPost";
import AdminJobPostList from "../pages/AdminJobPostList";

const JobAdminPage = () => {
  return (
    <div className="container">
      <h2 className="mt-4">Admin Job Post Panel</h2>
      <CreateJobPost />
      <hr className="my-4" />
      <AdminJobPostList />
    </div>
  );
};

export default JobAdminPage;  