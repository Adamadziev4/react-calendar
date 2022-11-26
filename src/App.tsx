import React from "react";

import { createDate, formateDate } from "./utils/helpers/date";

import "./static/css/global.css";
import { createMonth } from "./utils/helpers/date/createMonth";
import { createYear } from "./utils/helpers/date/createYear";
import { Calendar } from "./components/Calendar/Calendar";
import { getMonthesNames } from "./utils/helpers/date";

console.log("createDate", getMonthesNames());

export const App: React.FC = () => {
  const [selectedDate, selectDate] = React.useState(new Date());
  return (
    <div className="app__container">
      <div className="date__container">
        {formateDate(selectedDate, "DD MM YYYY")}
      </div>
      <Calendar selectedDate={selectedDate} selectDate={selectDate} />
    </div>
  );
};
