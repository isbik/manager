import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Icon,
  InputBase,
  Paper,
  Slide,
  Theme,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton/IconButton";
import React from "react";
import { TaskType } from "../../../types/tasks";
import { useStyles } from "./useStyles";
interface IAddNewTaskProps {
  handleAdd: (task: any) => void;
  only?: TaskType;
  nameRef?: React.RefObject<HTMLInputElement>;
}
const AddNewTask: React.FunctionComponent<IAddNewTaskProps> = ({
  handleAdd,
  only,
  nameRef,
}) => {
  const classes = useStyles();
  const [currentType, setCurrentType] = React.useState(only || TaskType.text);
  const [name, setName] = React.useState("");

  const [show, setShow] = React.useState(false);

  const [progress, setProgress] = React.useState({
    current: 1,
    total: 10,
    has_limit: true,
  });

  const taskIcons = [
    {
      type: TaskType.text,
      icon: "receipt",
    },
    {
      type: TaskType.progress,
      icon: "exposure-plus-1",
    },
    {
      type: TaskType.list,
      icon: "list",
    },
    {
      type: TaskType.habit,
      icon: "event-note",
    },
  ];

  const addTask = () => {
    if (!name.length) return;
    let task = {
      name,
      type: currentType,
    };

    switch (currentType) {
      case TaskType.progress: {
        Object.assign(task, progress);
      }
    }

    handleAdd(task);

    setName("");
  };

  const changeTaskType = (type) => {
    setShow(false);
    setCurrentType(type);
  };

  return (
    <Box mb={2}>
      <Paper
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        variant="outlined"
        component="form"
        className={classes.root}
      >
        <IconButton
          className={classes.iconButton}
          onClick={() => setShow(!show)}
          disabled={!!only}
        >
          <Icon>
            {taskIcons.find((task) => task.type === currentType).icon}
          </Icon>
        </IconButton>
        <Slide direction="down" in={show} mountOnEnter unmountOnExit>
          <Box>
            {taskIcons
              .filter(({ type }) => type !== currentType)
              .map((task) => (
                <IconButton
                  key={task.type}
                  onClick={() => changeTaskType(task.type)}
                  className={classes.iconButton}
                >
                  <Icon>{task.icon}</Icon>
                </IconButton>
              ))}
          </Box>
        </Slide>
        {show ? (
          <Box flex={1}></Box>
        ) : (
          <InputBase
            inputRef={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.input}
            placeholder="Название задачи"
            inputProps={{ "aria-label": "search google maps" }}
          />
        )}

        <ColorButton
          color="secondary"
          disabled={show || !name}
          className={classes.iconButton}
          onClick={addTask}
        >
          <Icon>add</Icon>
        </ColorButton>
      </Paper>
      <Collapse in={!show && (!only || !!name.length)}>
        {{
          [TaskType.progress]: (
            <ProgressTaskForm
              progress={progress}
              onChangeProgress={(value) => setProgress(value)}
            />
          ),
        }[currentType] || <></>}
      </Collapse>
    </Box>
  );
};

export default AddNewTask;

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.common.white,
    minWidth: "auto",
    padding: theme.spacing(0.25),
    backgroundColor: green[400],
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}))(Button);

const ProgressTaskForm = ({ progress, onChangeProgress }) => {
  const classes = useStyles();
  const onChange = (e) => {
    onChangeProgress({
      ...progress,
      [e.target.name]: parseInt(e.target.value) ? parseInt(e.target.value) : 0,
    });
  };
  const handleChange = (e) => {
    onChangeProgress({
      ...progress,
      has_limit: e.target.checked,
    });
  };

  return (
    <Box marginTop={2} display="flex">
      <Paper
        style={{ marginRight: 20, paddingLeft: 15, flexGrow: 1 }}
        variant="outlined"
        className={classes.root}
      >
        <InputBase
          placeholder="Выполнено"
          name="current"
          value={progress.current}
          onChange={onChange}
        />
      </Paper>
      <Paper
        variant="outlined"
        className={classes.root}
        style={{ flexGrow: 1 }}
      >
        <Checkbox
          color="default"
          checked={progress.has_limit}
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
          size="small"
          style={{ height: 20, width: 20 }}
        />
        <InputBase
          value={progress.total}
          onChange={onChange}
          className={classes.input}
          placeholder="Цель"
          name="total"
          disabled={!progress.has_limit}
        />
      </Paper>
    </Box>
  );
};

// Check if clipboard has text

// React.useEffect(() => {
//   navigator.clipboard.readText().then((text) => {
//     setValue(text);
//     setOpen(true);
//   });
// }, []);
