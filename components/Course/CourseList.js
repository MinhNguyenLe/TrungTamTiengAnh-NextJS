import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
// components
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListCourse, setTargetCourse } from "redux/actions/course";

import Link from "next/link";

export default function CourseList({ setShowModalEdit, setShowModalAddClass }) {
  const t = use18n();

  const host = useHostAPI();

  const router = useRouter();

  const dispatch = useDispatch();
  const listCourse = useSelector((state) => state.course.list);

  useEffect(() => {
    console.log(router);
    Promise.all([axios.get(`${host}/api/courses`)])
      .then(([res]) => {
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCourse = (id) => {
    Promise.all([axios.delete(`${host}/api/courses/${id}`)])
      .then(([res]) => {
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotoEdit = (id) => {
    dispatch(setTargetCourse(id));
    setShowModalEdit(true);
  };

  const gotoAddClass = (id) => {
    console.log(id);
    setShowModalAddClass(true);
    dispatch(setTargetCourse(id));
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                {t["12"]}
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {t["13"]}
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["14"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["20"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["15"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["16"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["17"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["18"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["19"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["21"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["23"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["22"]}
                </th>
              </tr>
            </thead>
            <tbody>
              {listCourse?.map((course) => (
                <tr
                  className="cursor-pointer hover:bg-lightBlue-600"
                  key={`list-course-${course.id}`}
                >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {course.name}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {course.level}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {course.members}
                  </td>
                  <td
                    style={{ display: "flex", flexDirection: "column" }}
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {course?.classes?.length
                      ? course.classes.map((item) => (
                          <Link
                            key={`codeclass${item.id}`}
                            href={`/class/${item.code}`}
                          >
                            {item.code}
                          </Link>
                        ))
                      : null}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(course.tuition)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Date(course.timeBegin).toLocaleDateString()}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Date(course.timeEnd).toLocaleDateString()}
                  </td>
                  <th
                    onClick={() => gotoAddClass(course.id)}
                    className="text-lightBlue-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {t["24"]}
                  </th>
                  <th
                    onClick={() => gotoEdit(course.id)}
                    className="text-teal-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {t["23"]}
                  </th>
                  <th className="text-red-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="outline-none focus:outline-none"
                      onClick={() => deleteCourse(course.id)}
                    >
                      {t["22"]}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
