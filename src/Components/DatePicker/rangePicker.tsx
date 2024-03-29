import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  sub,
  subMonths,
  subYears,
} from "date-fns";
import { useState } from "react";
import {DatePicker} from ".";
import styles from "../../Assets/Styles/Component/datepicker.module.scss";
import { IconButton } from "../Buttons";
import { Divider } from "../PageShared";

/**
  * <summary>
  * called by Datepicker Index page, creates the range based on selected dates
  * </summary>
  * <param name="label, value">
  * </param> 
  * <returns>
  * creates custom range picker UI with selected date range
  * </returns> 
  */
export const DateRangePicker = ({
  close,
  onApply,
}: {
  close: () => void;
  onApply: (selectedDates: Date[]) => void;
}) => {
  let today = startOfToday();
  const [selectedDates, setSelectedDates] = useState<(Date | null)[]>([]);
  const [selectedPick, setSelectedPick] = useState("");

  const quickPicks = [
    { label: "Today", value: [today, today] },
    {
      label: "Yesterday",
      value: [sub(today, { days: 1 }), sub(today, { days: 1 })],
    },
    {
      label: "This week",
      value: [startOfWeek(today, { weekStartsOn: 1 }), today],
    },
    {
      label: "Last week",
      value: [
        startOfWeek(sub(today, { days: 7 }), { weekStartsOn: 1 }),
        endOfWeek(sub(today, { days: 7 }), { weekStartsOn: 1 }),
      ],
    },
    {
      label: "This month",
      value: [startOfMonth(today), endOfMonth(today)],
    },
    {
      label: "Last month",
      value: [
        startOfMonth(subMonths(today, 1)),
        endOfMonth(subMonths(today, 1)),
      ],
    },
    {
      label: "This year",
      value: [startOfYear(today), endOfYear(today)],
    },
    {
      label: "Last year",
      value: [startOfYear(subYears(today, 1)), endOfYear(subYears(today, 1))],
    },
    {
      label: "All time",
      value: [new Date('01-01-1970'),new Date('01-01-9999')],
    },
  ];

  return (
    <div className={styles?.dateRangePickerContainer}>
      <div className={styles?.quickPicksContainer}>
        {quickPicks.map((pick, index) => {
          return (
            <div
              key={index}
              className={`${styles?.quickPick} ${
                selectedPick === pick.label && styles?.active
              }`}
              onClick={() => {
                setSelectedDates(pick.value);
                setSelectedPick(pick.label);
              }}
            >
              {pick.label}
            </div>
          );
        })}
      </div>
      <div className={styles?.calendarsContainer}>
        <DatePicker
          isRange={true}
          //@ts-ignore
          defaultSelectedStartDate={selectedDates[0]}
          //@ts-ignore
          defaultSelectedEndDate={selectedDates[1]}
          onChange={(dates) => {
            setSelectedDates(dates);
          }}
        />
        <Divider />
        <div className={styles?.footer}>
          <div className={styles?.actions}>
            <IconButton
              variant="outlined"
              color="neutral"
              buttonTitle="Cancel"
              icon={<></>}
              style={{ width: "114px", justifyContent: "center" }}
              onClick={() =>
                close()
              }
            />
            <IconButton
              variant="contained"
              color="primary"
              buttonTitle="Apply"
              icon={<></>}
              disabled={selectedDates[1] == null}
              style={{ width: "114px", justifyContent: "center" }}
              onClick={() =>
                onApply(
                  selectedDates as Date[]
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
