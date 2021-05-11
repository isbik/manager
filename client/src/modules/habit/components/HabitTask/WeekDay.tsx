import { Box, Icon, IconButton, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useStore } from "effector-react";
import React from "react";
import { formatDate, isSameDay, shortWeekDays } from "../../../../lib/date";
import { HabitDayCRUD } from "../../../../services/API/habit";
import { useStyles } from "./useStyles";
interface IWeekDays {
  card_id: number;
  index: number;
  day: Date;
  model: any;
  today: Date;
}

export const WeekDay: React.FC<IWeekDays> = React.memo(
  ({ day, index, model, today, card_id }) => {
    const dates: number[] = useStore<number[]>(model.$sliderDays);
    const all_dates = useStore(model.$dates);
    const shortSliderDay: string = useStore(model.$shortSliderDay);

    const isChecked = React.useMemo(() => {
      return dates.some((d) => d === index);
    }, [dates, index]);

    const classes = useStyles();

    const sliderDay: Date = useStore(model.$sliderDay);
    const handleClickDay = () => {
      const habit_day_id = all_dates[shortSliderDay]?.habit_day_id;

      if (habit_day_id) {
        const newDays = dates.includes(index)
          ? dates.filter((d) => d !== index)
          : [index, ...dates];

        HabitDayCRUD.patch(habit_day_id, {
          start_week: formatDate(sliderDay),
          days: newDays.join(""),
        }).then(() => {
          isChecked
            ? model.$deleteDay({ day: index })
            : model.$addDay({ day: index });
        });
      } else {
        HabitDayCRUD.create({
          start_week: formatDate(sliderDay),
          days: index,
          habit_card_id: card_id,
        }).then((response) => {
          model.$setDays({ result: [response.data] });
        });
      }
    };

    return (
      <Box className={classes.day} onClick={() => handleClickDay()}>
        <Typography variant="body2">{shortWeekDays[index]}</Typography>
        <Typography style={{ fontSize: "1.3rem" }}>{day.getDate()}</Typography>
        <IconButton
          className={clsx(
            classes.dayChecker,
            isChecked && classes.dayActive,
            isSameDay(day, today) && classes.today
            // day.getTime() > today.getTime() && classes.dayDisabled
          )}
          color="inherit"
          style={{ padding: 5 }}
        >
          <Icon>{isChecked ? "check_circle" : ""}</Icon>
        </IconButton>
        <IconButton color="inherit" style={{ padding: 1 }}></IconButton>
      </Box>
    );
  }
);
