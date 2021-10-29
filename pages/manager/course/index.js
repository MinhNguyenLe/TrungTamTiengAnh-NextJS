import React from "react";

// components

import ContactCourse from "components/Forms/ContactCourse.js";
import ClassList from "components/Course/CourseList.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Courses() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <ContactCourse page="create" />
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ClassList />
        </div>
      </div>
    </>
  );
}

Courses.layout = Admin;
