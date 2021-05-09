import {
  Checkbox,
  Icon,
  IconButton
} from "@material-ui/core";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useStyles } from "./useStyles";
import { TodoCRUD } from "../../../services/API/todo";
import {
  $deleteTodo,


  $updateTodo
} from "../todo-state";


export const ToggleTask: React.FunctionComponent<any> = ({
  card_id,
  id,
  name,
  completed,
}) => {
  const classes = useStyles();
  const editableRef = useRef(null);
  const [editableText, setEditableText] = useState(name);

  const handleBlur = () => {
    TodoCRUD.patch(id, { name: editableRef.current.innerHTML }).then(
      (response) => {
        $updateTodo({ card_id, todo: response.data });
      }
    );
  };

  const deleteTodo = (id) => {
    TodoCRUD.delete(id).then(() => {
      $deleteTodo({ card_id, todo_id: id });
    });
  };

  const handleComplete = (e) => {
    TodoCRUD.patch(id, { completed: e.target.checked }).then((response) => {
      $updateTodo({ card_id, todo: response.data });
    });
  };

  return (
    <>
      <Checkbox
        onChange={handleComplete}
        checked={completed}
        style={{ padding: 0, marginRight: 4 }}
        size="small"
        color="default" />
      <div
        style={{ flexGrow: 1, wordBreak: "break-all" }}
        contentEditable
        className={clsx("none-outline placeholder")}
        spellCheck={false}
        ref={editableRef}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: name }}
      ></div>
      <IconButton onClick={() => deleteTodo(id)} size="small">
        <Icon style={{ fontSize: "16px" }}>close</Icon>
      </IconButton>
    </>
  );
};
