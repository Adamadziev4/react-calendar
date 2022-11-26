import React from "react";
import { useCalendar } from "./hooks/useCalendar";

import "./Calendar.css";
import { checkDateIsEqual, checkIsToday } from "../../utils/helpers/date";

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = "default",
  firstWeekDay = 2,
  selectDate,
  selectedDate,
}) => {
  const { state, functions } = useCalendar({
    firstWeekDay,
    locale,
    selectedDate,
  });

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div
          aria-hidden
          className="calendar__header_arrow__left"
          onClick={() => functions.onClickArrow("left")}
        />
        {state.mode === "days" && (
          <div aria-hidden onClick={() => functions.setMode("monthes")}>
            {state.monthesNames[state.selectedMonth.monthIndex].month}{" "}
            {state.selectedYear}
          </div>
        )}
        {state.mode === "monthes" && (
          <div aria-hidden onClick={() => functions.setMode("years")}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === "years" && (
          <div onClick={() => functions.setMode("days")}>
            {state.selectedYearInterval[0]} -{" "}
            {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className="calendar__header_arrow__right"
          onClick={() => functions.onClickArrow("right")}
        />
      </div>
      <div className="calendar__body">
        {state.mode === "days" && (
          <>
            <div className="calendar__week__names">
              {state.weekDaysNames.map((day) => (
                <div key={day.dayShort}>{day.dayShort}</div>
              ))}
            </div>
            <div className="calendar__days">
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(
                  day.date,
                  state.selectedDate.date
                );
                const isAdditionalDay =
                  day.monthIndex !== state.selectedMonth.monthIndex;

                return (
                  <div
                    aria-hidden
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDate(day);
                      selectDate(day.date);
                    }}
                    className={[
                      "calendar__day",
                      isToday ? "calendar__today__item" : "",
                      isSelectedDay ? "calendar__selected__item" : "",
                      isAdditionalDay ? "calendar__additional__day" : "",
                    ].join(" ")}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}
        {state.mode === "monthes" && (
          <div className="calendar__pick__item__container">
            {state.monthesNames.map((month) => {
              const isCurrentMonth =
                new Date().getMonth() === month.monthIndex &&
                new Date().getFullYear() === state.selectedYear;
              const isSelectedMonth =
                month.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(month.monthIndex);
                    functions.setMode("days");
                  }}
                  className={[
                    "calendar__pick__item",
                    isCurrentMonth ? "calendar__today__item" : "",
                    isSelectedMonth ? "calendar__selected__item" : "",
                  ].join(" ")}
                >
                  {month.monthShort}
                </div>
              );
            })}
          </div>
        )}
        {state.mode === "years" && (
          <div className="calendar__pick__item__container">
            <div className="calendar__unchoosable__year">
              {state.selectedYearInterval[0] - 1}
            </div>
            {state.selectedYearInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode("monthes");
                  }}
                  className={[
                    "calendar__pick__item",
                    isCurrentYear ? "calendar__today__item" : "",
                    isSelectedYear ? "calendar__selected__item" : "",
                  ].join(" ")}
                >
                  {year}
                </div>
              );
            })}
            <div className="calendar__unchoosable__year">
              {state.selectedYearInterval[
                state.selectedYearInterval.length - 1
              ] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
