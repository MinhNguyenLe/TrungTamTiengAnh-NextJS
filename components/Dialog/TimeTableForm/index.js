import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListCourse } from "redux/actions/course";
import { setListClassroom } from "redux/actions/classroom";

import router from "next/router";
export default function TimeTableForm({ page, setShowModal, showModal }) {
  const t = use18n();

  const dispatch = useDispatch();
  const target = useSelector((state) => state.classroom.target);

  const host = useHostAPI();

  const classID = useVali({ require: [1] });
  const TimeBegin = useVali({ require: [1] });
  const TimeEnd = useVali({ require: [1] });
  useEffect(() => {
    // if (page === "edit") {
    //   Promise.all([axios.get(`${host}/api/classrooms/${target}`)])
    //     .then(([res]) => {
    //       name.ref.current.value = res.data.name;
    //       address.ref.current.value = res.data.address;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }, []);

  const createClassRoom = () => {
    // check error for each field
    TimeBegin.checkErr();
    TimeEnd.checkErr();
    classID.checkErr();
    if (classID.success && TimeBegin.success && TimeEnd.success) {
      Promise.all([
        axios.post(`${host}/api/classrooms/create-timetable`, {
          content: {
            idRoom: target,
            idClass: parseInt(classID.ref.current.value),
            timetable:[{
              begin:parseInt(TimeBegin.ref.current.value) ,
              end: parseInt(TimeEnd.ref.current.value),
            }], 
          },
        }),
      ])
        .then(([res]) => {
          dispatch(setListClassroom(res.data));
          setShowModal(false);
          classID.ref.current.value = "";
          TimeBegin.ref.current.value = "";
          TimeEnd.ref.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const editClassRoom = () => {
  //   // check error for each field
  //   name.checkErr();
  //   address.checkErr();
  //   console.log(
  //     name.success,
  //     "---------------",
  //     target,
  //     name.ref.current.value,
  //     address.ref.current.value
  //   );
  //   if (name.success && address.success) {
  //     Promise.all([
  //       axios.post(`${host}/api/classrooms/edit`, {
  //         content: {
  //           id: target,
  //           name: name.ref.current.value,
  //           address: address.ref.current.value,
  //         },
  //       }),
  //     ])
  //       .then(([res]) => {
  //         dispatch(setListClassroom(res.data));
  //         setShowModal(false);
  //         name.ref.current.value = "";
  //         address.ref.current.value = "";
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // debounce when fill input
  const debTimeEnd = debounce(() => {
    TimeEnd.checkErr();
  }, 500);
  const debTimeBegin = debounce(() => {
    TimeBegin.checkErr();
  }, 500);
  const debClassID = debounce(() => {
    classID.checkErr();
  }, 500);

  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-1200 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {t["125"]}
              </h6>
              <div>
                <button
                  onClick={createClassRoom}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["48"]}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["59"]}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {t["125"]} information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Time Begin
                    </label>
                    <input
                      onInput={() => debTimeBegin()}
                      ref={TimeBegin.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {TimeBegin.error && (
                      <span className="text-red-500">{TimeBegin.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Time End
                    </label>
                    <input
                      onInput={() => debTimeEnd()}
                      ref={TimeEnd.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {TimeEnd.error && (
                      <span className="text-red-500">{TimeEnd.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      ClassID
                    </label>
                    <input
                      onInput={() => debClassID()}
                      ref={classID.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {classID.error && (
                      <span className="text-red-500">{classID.error}</span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

TimeTableForm.defaultProps = {
  page: "create",
};
