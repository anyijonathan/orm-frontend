import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "../Icons";

import styles from "../../Assets/Styles/Component/datepicker.module.scss";
import { Input } from "../Input/input";

/**
  * <summary>
  * creates Datepicker used by App
  * </summary>
  * <param name="defaultSelectedStartDate, defaultSelectedEndDate, isRange">
  * </param> 
  * <returns>
  * customised Datepicker UI
  * </returns> 
  */
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const DatePicker = ({
  isRange = true,
  defaultSelectedStartDate,
  defaultSelectedEndDate,
  onChange,
}: {
  isRange?: boolean;
  defaultSelectedStartDate?: Date;
  defaultSelectedEndDate?: Date;
  onChange?: (dates: (Date | null)[]) => void;
}) => {
  let today = startOfToday();
  let [selectedStartDay, setSelectedStartDay] = useState(
    defaultSelectedStartDate ?? today
  );
  let [selectedEndDay, setSelectedEndDay] = useState<Date | null>(
    defaultSelectedEndDate ?? null
  );
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  useEffect(() => {
    if (isRange) {
      setSelectedStartDay(defaultSelectedStartDate ?? today);
      setSelectedEndDay(defaultSelectedEndDate ?? null);
    }
  }, [defaultSelectedStartDate, defaultSelectedEndDate]);

  useEffect(() => {
    if (isRange) {
      onChange!([selectedStartDay, selectedEndDay]);
    }
  }, [selectedStartDay, selectedEndDay]);

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const handleSelectDay = (day: Date) => {
    if (isRange) {
      // if day is less than selectedStartDay, that day becomes selectedStartDay and selectedEndDay set to null
      //otherwise, day becomes selectedEndDay

      if (isBefore(day, selectedStartDay)) {
        setSelectedStartDay(day);
        setSelectedEndDay(null);
      }
      if (selectedStartDay && selectedEndDay && isBefore(day, selectedEndDay)) {
        setSelectedStartDay(day);
      } else {
        setSelectedEndDay(day);
      }
    } else {
      setSelectedDay(day);
    }
  };

  const isDayEqualSelected = (day: Date) => {
    return (
      (!isRange && isSameDay(day, selectedDay)) ||
      (isRange && isSameDay(day, selectedStartDay)) ||
      (isRange && selectedEndDay && isSameDay(day, selectedEndDay))
    );
  };

  const isWithinRange = (day: Date) => {
    return (
      isWithinInterval(day, {
        start: selectedStartDay,
        end: selectedEndDay ?? selectedStartDay,
      }) &&
      !isSameDay(day, selectedStartDay) &&
      !isSameDay(day, selectedEndDay ?? selectedStartDay)
    );
  };
 
  return (
    <div className={styles?.datePickerContainer}>
      <div className={styles?.monthSelectorContainer}>
        <button
          type="button"
          onClick={previousMonth}
          className={styles?.prevButton}
        >
          <span className={styles?.srOnly}>Previous month</span>
          <ChevronLeft className={styles?.navIcons} aria-hidden="true" />
        </button>
        <h2 className={styles?.title}>
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} type="button" className={styles?.nextButton}>
          <span className={styles?.srOnly}>Next month</span>
          <ChevronRight className={styles?.navIcons} aria-hidden="true" />
        </button>
      </div>
      <div className={styles?.datesContainer}>
        <Input
          placeholder="Start Date"
          readOnly
          style={{ width: "160px" }}
          value={format(selectedStartDay, "MMM dd, yyyy")}
        />
        -
        <Input
          placeholder="End Date"
          readOnly
          style={{ width: "160px" }}
          value={selectedEndDay ? format(selectedEndDay, "MMM dd, yyyy") : ""}
        />
      </div>
      <div className={styles?.daysOfWeekContainer}>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sat</div>
        <div>Su</div>
      </div>
      <div className={styles?.daysContainer}>
        {days.map((day, dayIdx) => {
          return (
            <div
              key={day.toString()}
              className={classNames(
                styles?.dayContainer,
                dayIdx === 0 && colStartClasses[getDay(day) - 1],
                selectedStartDay &&
                  selectedEndDay &&
                  isSameDay(day, selectedStartDay) &&
                  day.getDate() != 0 &&
                  styles?.padStartDate,
                selectedStartDay &&
                  selectedEndDay &&
                  isSameDay(day, selectedEndDay) &&
                  day.getDate() != 0 &&
                  styles?.padEndDate
              )}
            >
              <button
                type="button"
                onClick={() => handleSelectDay(day)}
                className={classNames(
                  styles?.dayItem,
                  isDayEqualSelected(day) && styles?.isSelected,
                  !isDayEqualSelected(day) &&
                    isToday(day) &&
                    styles?.isNotSelectedAndIsToday,
                  !isDayEqualSelected(day) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    styles?.isNotSelectedAndIsNotTodayAndIsSameMonth,
                  !isDayEqualSelected(day) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    styles?.isNotSelectedAndIsNotTodayAndIsNotSameMonth,
                  isDayEqualSelected(day) &&
                    isToday(day) &&
                    styles?.isSelectedAndIsToday,
                  isDayEqualSelected(day) &&
                    !isToday(day) &&
                    styles?.isSelectedAndIsNotToday,
                  !isDayEqualSelected(day) && styles?.isNotSelected,
                  (isDayEqualSelected(day) || isToday(day)) &&
                    styles?.isSelectedOrIsToday,
                  isWithinRange(day) && styles?.withinInterval,
                  isWithinRange(day) &&
                    day.getDay() == 1 &&
                    styles?.withinIntervalLeft,
                  isWithinRange(day) &&
                    day.getDay() == 0 &&
                    styles?.withinIntervalRight
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

let colStartClasses = [
  "",
  styles?.col2,
  styles?.col3,
  styles?.col4,
  styles?.col5,
  styles?.col6,
  styles?.col7,
];


