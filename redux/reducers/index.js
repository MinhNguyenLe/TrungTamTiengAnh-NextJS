import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { reducerUser } from "./user.js";
import { reducerCourse } from "./course.js";
import { reducerClass } from "./class.js";
import { reducerClassroom } from "./classroom.js";
import { reducerNotiType } from "./notiType.js";
import { reducerNoti } from "./noti.js";
import { reducerCmt } from "./comment.js";
import { reducerQuizzes } from "./quizzes.js";

const userPersist = {
  key: "account",
  storage: storage,
  whitelist: ["account"],
};

const reducers = combineReducers({
  user: persistReducer(userPersist, reducerUser),
  course: reducerCourse,
  class: reducerClass,
  classroom: reducerClassroom,
  notiType: reducerNotiType,
  noti: reducerNoti,
  comment: reducerCmt,
  quizzes: reducerQuizzes
});

export default reducers;
