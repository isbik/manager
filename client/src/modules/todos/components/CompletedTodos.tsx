import {
  Box,
  CardActionArea,

  Collapse,
  Divider,
  Icon,

  Typography
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useStyles } from "./useStyles";
import { ToggleTask } from "./ToggleTodo";

export const CompletedTodos: React.FC<any> = ({ card_id, todos }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <>
      {!!todos.length && (
        <CardActionArea onClick={() => setOpen(!open)}>
          <Divider />
          <Box display="flex" alignItems="center">
            <Icon
              className={clsx(classes.toggle, { [classes.toggleOpen]: open })}
              fontSize="small"
            >
              chevron_right
            </Icon>
            <Typography>{todos.length} выполнено</Typography>
          </Box>
        </CardActionArea>
      )}
      <Collapse in={open}>
        {todos.map((todo) => (
          <Box
            className={classes.todo}
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: 4,
            }}
            key={todo.id}
          >
            <ToggleTask card_id={card_id} {...todo} />
          </Box>
        ))}
      </Collapse>
    </>
  );
};
