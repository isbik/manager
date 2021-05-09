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
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 200,
    marginLeft: "auto",
  },
  iconButton: {
    padding: 0,
    height: "100%",
  },
  divider: {
    height: 20,
    margin: 2,
  },
  progress: (props) => ({
    height: "100%",
    width: "100%",
    zIndex: -1,
    background: theme.palette.divider,
    "&:before": {
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
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
  }),
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
  const procent = Math.round((currentValue * 100) / total);
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
    return has_limit ? `${currentValue} | ${total}` : currentValue;
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
          {name}
          <Box mt={1} display="flex" alignItems="center">
            <Chip label={progressLabel}></Chip>
            <Paper variant="outlined" className={classes.root}>
              <IconButton
                type="submit"
                className={classes.iconButton}
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
                className={classes.iconButton}
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
