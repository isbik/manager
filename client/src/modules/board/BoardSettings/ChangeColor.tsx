import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useEffectExceptOnMount } from "../../../hooks/useEffectExceptOnMount";
import { BoardCRUD } from "../../../services/API/board";
import { $updateBoard } from "../state";

const colors = [
  "#ff4a4a",
  "#fcbe4a",
  "#7cefbd",
  "#3ec0fd",
  "#a658ff",
  "#fa52bd",
  "#3577da",
  "#6019ee",
  "#fd27c1",
  "#d3d61b",
];

const useStyles = makeStyles((theme: Theme) => ({
  pickerColor: {
    position: "relative",
    "& button": {
      margin: 0,
      height: 50,
      width: 50,
      "& span": {
        display: "none",
      },
    },
  },
  settingsIcon: {
    zIndex: 3,
    right: "50%",
    left: "50%",
    transform: "translate(-50%, 50%)",
    position: "absolute",
  },
}));

interface IChangeColor {
  color: string;
  use_color: boolean;
}

export const ChangeColor: React.FC<IChangeColor> = React.memo(
  ({ color: defaultColor, use_color: defaultUseColor }) => {
    const router = useRouter();
    const id = +router.query.id;

    const [selectedColor, setSelectedColor] = React.useState(defaultColor);
    const [use_color, setUseColor] = React.useState(defaultUseColor);
    const [color, setColor] = React.useState(null);

    const debounceColor = useDebounce(selectedColor || `#${color.hex}`, 1000);

    useEffectExceptOnMount(() => {
      BoardCRUD.patch(id, { color: debounceColor });
    }, [debounceColor]);

    useEffectExceptOnMount(() => {
      $updateBoard({
        board_id: id,
        data: { color: selectedColor || `#${color.hex}` },
      });
    }, [color, selectedColor]);

    const changeUseColor = (e) => {
      const checked = e.target.checked;
      $updateBoard({ board_id: id, data: { use_color: checked } });
      BoardCRUD.patch(id, { use_color: checked });
      setUseColor(checked);
    };

    return (
      <Grid item xs={12}>
        <h3>Выбор цвета</h3>

        <Box mt={2} display="flex" flexWrap="wrap">
          {colors.map((color) => (
            <Avatar
              style={{
                backgroundColor: color,
                marginRight: 10,
                marginBottom: 10,
                width: 50,
                height: 50,
                cursor: "pointer",
              }}
              key={color}
              variant="rounded"
              onClick={() => setSelectedColor(color)}
            >
              {selectedColor === color ? (
                <Icon color="action">check</Icon>
              ) : (
                <>&nbsp;</>
              )}
            </Avatar>
          ))}
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={use_color}
              onChange={changeUseColor}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          label="Использовать выбранный цвет в качестве фона"
        />
      </Grid>
    );
  }
);
