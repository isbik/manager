import { combine, createEffect, createEvent, createStore } from "effector";
import { clossetMonday, formatDate } from "../../lib/date";
import { HabitDayCRUD } from "../../services/API/habit";

export const createHabitApi = () => {
  const $setSliderDay = createEvent<Date>();
  const $deleteDay = createEvent<any>();
  const $addDay = createEvent<any>();
  const $setDays = createEvent<any>();
  const $fetchHabitDays = createEffect();

  const $sliderDay = createStore<Date>(clossetMonday(new Date())).on(
    $setSliderDay,
    (_, newDate) => {
      return newDate;
    }
  );
  const $dates = createStore<any>({});

  const $shortSliderDay = $sliderDay.map((day) => formatDate(day));

  const $sliderDays = combine($dates, $shortSliderDay, (dates, sliderDay) => {
    return dates[sliderDay]?.days || [];
  });

  const deleteDay = (state: Date[], { day }) => {
    const slider = $shortSliderDay.getState();
    const newState = { ...state };
    newState[slider].days = newState[slider].days.filter((d) => d !== day);
    return newState;
  };

  const setDays = (state: object, response) => {
    const [habit_day] = response.result;

    const newState = { ...state };
    const slider = $shortSliderDay.getState();

    if (habit_day) {
      const days = ((habit_day || {}).days || "").split("").map(Number);

      if (!newState[slider]) {
        newState[slider] = {};
        newState[slider].habit_day_id = habit_day.id;
        newState[slider].days = [];
      }
      newState[slider].days = days;
    }

    return newState;
  };

  const addDay = (state: object, { day, habit_day_id }) => {
    const slider = $shortSliderDay.getState();

    const newState = { ...state };

    if (!newState[slider]) {
      newState[slider] = {};
      newState[slider].habit_day_id = habit_day_id;
      newState[slider].days = [];
    }

    const days = new Set([day, ...(newState[slider]?.days || [])]);
    newState[slider].days = Array.from(days);
    return newState;
  };

  $dates.on($deleteDay, deleteDay);
  $dates.on($addDay, addDay);
  $dates
    .on($setDays, setDays)
    .on($fetchHabitDays.done, setDays)
    .watch(() => {
      $fetchHabitDays.use(async (params) => {
        const response = await HabitDayCRUD.getAll(params);
        return response.data;
      });
    });

  const $habitDayLoading = combine({
    loading: $fetchHabitDays.pending,
  });

  return {
    $dates,
    $sliderDays,
    $shortSliderDay,
    $deleteDay,
    $addDay,
    $habitDayLoading,
    $fetchHabitDays,
    $setDays,
    $setSliderDay,
    $sliderDay,
  };
};
