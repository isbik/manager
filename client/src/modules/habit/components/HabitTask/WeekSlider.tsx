import { Icon, IconButton } from "@material-ui/core";
import { useStore } from "effector-react";
import React from "react";
import { addDays, clossetMonday, months, subDays } from "../../../../lib/date";

export const WeekSlider: React.FC<any> = React.memo(
  ({ model, lastWeekDay, firstWeekDay }) => {
    const sliderDay = useStore<Date>(model.$sliderDay);

    const isActiveNext = React.useMemo(() => {
      return sliderDay.getTime() > new Date().getTime();
    }, [sliderDay]);

    const monthText = React.useMemo(() => {
      const minMonth = months[firstWeekDay.getMonth()];
      const maxMonth = months[lastWeekDay.getMonth()];
      return minMonth === maxMonth ? minMonth : `${minMonth} - ${maxMonth}`;
    }, [sliderDay]);

    return (
      <>
        <IconButton
          onClick={() => model.$setSliderDay(subDays(sliderDay, 14))}
          style={{ padding: 5 }}
        >
          <Icon>navigate_before</Icon>
        </IconButton>
        <IconButton
          onClick={() =>
            model.$setSliderDay(clossetMonday(addDays(sliderDay, 1)))
          }
          style={{ marginRight: 10, padding: 5 }}
          disabled={isActiveNext}
        >
          <Icon>navigate_next</Icon>
        </IconButton>
        {monthText} {sliderDay.getFullYear()}
      </>
    );
  }
);
