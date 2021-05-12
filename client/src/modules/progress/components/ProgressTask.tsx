import {
  Box,
  CardContent,
  Chip,
  Divider,
  Icon,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useEffectExceptOnMount } from "../../../hooks/useEffectExceptOnMount";
import { ProgressCRUD } from "../../../services/API/progress";
import { IProgressTask } from "../../../types/tasks";
import { $updateProgress } from "../state";
export interface StyleProps {
  procent: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    padding: theme.spacing(1),
    height: 32,
    width: 32,
    borderRadius: theme.shape.borderRadius,
  },
  iconButtonSuccess: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    color: theme.palette.success.main,
  },
  iconButtonError: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    color: theme.palette.error.main,
  },
  divider: {
    height: 32,
  },
  progress: (props) => ({
    height: "100%",
    width: "100%",
    zIndex: -1,
    background: theme.palette.divider,
    transition: "all 0.5s",
    "&:before": {
      transition: "all 0.5s",
      content: "''",
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      height: "100%",
      background: theme.palette.background.default,
      width: props.procent + "%",
      maxWidth: "100%",
    },
    "&:after": {
      opacity: 0.5,
      zIndex: 0,
      color: theme.palette.info.main,
      content: `'${props.procent}%'`,
      fontSize: "3rem",
      display: "block",
      position: "absolute",
      right: "5%",
      top: "50%",
      transform: "translateY(-50%)",
    },
  }),
  chip: {
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  counterValue: {
    width: 40,
    "& input": {
      textAlign: "center",
    },
  },
}));

export const ProgressTask: React.FunctionComponent<IProgressTask> = ({
  id,
  name,
  current,
  total,
  has_limit,
}) => {
  const [currentValue, setCurrentValue] = useState(current);
  const [inputValue, setInputValue] = useState<number>(1);
  const procent = Math.round(((currentValue * 100) / total) % 100);
  const classes = useStyles({ procent });
  const debouncedChangeValue = useDebounce(currentValue, 1000);

  useEffectExceptOnMount(() => {
    ProgressCRUD.patch(id, {
      current: currentValue,
    }).then((response) => {
      $updateProgress({ id, data: response.data });
    });
  }, [debouncedChangeValue]);

  const progressLabel = React.useMemo(() => {
    return has_limit ? `${currentValue} из ${total}` : currentValue;
  }, [has_limit, currentValue]);

  const handleChange = (value) => {
    const newValue = parseInt(value) ? parseInt(value) : 0;

    setInputValue(1);
    setCurrentValue((prevValue) => prevValue + +newValue);
  };

  return (
    <>
      <div className={clsx({ [classes.progress]: has_limit })}></div>
      <Box position="relative" zIndex={1}>
        <CardContent style={{ padding: 15 }}>
          <Chip className={classes.chip} label={progressLabel}></Chip>
          {name}
          <Box mt={1} display="flex" alignItems="center">
            <Paper variant="outlined" className={classes.root}>
              <IconButton
                type="submit"
                className={clsx(classes.iconButton, classes.iconButtonError)}
                aria-label="search"
                onClick={() => handleChange(-inputValue)}
              >
                <Icon>remove</Icon>
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <InputBase
                value={inputValue}
                onChange={(e) => setInputValue(+e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleChange(inputValue);
                  }
                }}
                className={classes.counterValue}
              ></InputBase>
              <Divider className={classes.divider} orientation="vertical" />

              <IconButton
                type="submit"
                className={clsx(classes.iconButton, classes.iconButtonSuccess)}
                aria-label="search"
                onClick={() => handleChange(inputValue)}
              >
                <Icon>add</Icon>
              </IconButton>
            </Paper>
          </Box>
        </CardContent>
      </Box>
    </>
  );
};
