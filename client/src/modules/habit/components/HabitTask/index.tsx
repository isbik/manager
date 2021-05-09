import { Backdrop, Box, CardContent, CircularProgress, Typography } from "@material-ui/core";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { formatDate, weekDatesFromMonday } from "../../../../lib/date";
import { IHabitTask } from "../../../../types/tasks";
import { createHabitApi } from "../../habit-day-store";
import { useStyles } from "./useStyles";
import { WeekDay } from "./WeekDay";
import { WeekSlider } from "./WeekSlider";

export const HabitTask: React.FunctionComponent<IHabitTask> = ({
  id,
  name,
}) => {
  const classes = useStyles();
  const habitModel = React.useMemo(() => createHabitApi(), []);
  const sliderDay: Date = useStore(habitModel?.$sliderDay);
  const { loading } = useStore(habitModel.$habitDayLoading)
  const shortSliderDay: string = useStore(habitModel?.$shortSliderDay);
  const all_dates = useStore(habitModel.$dates);

  useEffect(() => {
    if (all_dates[shortSliderDay]) return;
    const params = {
      habit_card_id: id,
      start_week: formatDate(sliderDay),
    };

    habitModel.$fetchHabitDays(params);

  }, [sliderDay]);

  const weekDays = React.useMemo(() => {
    return weekDatesFromMonday(sliderDay);
  }, [sliderDay]);

  const today = React.useMemo(() => new Date(), []);

  return (
    <>
      <CardContent
        style={{
          padding: 10,
        }}
      >
        <Typography>{name}</Typography>
      </CardContent>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <WeekSlider
            lastWeekDay={weekDays[0]}
            firstWeekDay={weekDays[weekDays.length - 1]}
            model={habitModel}
          />
          <Box flexGrow={1} />
        </Box>
        <Box
          className={classes.days}
          marginTop={1}
          display="flex"
          alignItems="center"
          style={{ position: 'relative' }}
        >
          <Backdrop style={{ position: 'absolute', zIndex: 10 }} open={loading} >
            <CircularProgress color="inherit" />
          </Backdrop>
          {weekDays.map((day, index) => (
            <WeekDay
              card_id={id}
              today={today}
              model={habitModel}
              index={index}
              day={day}
              key={day.toString()}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
