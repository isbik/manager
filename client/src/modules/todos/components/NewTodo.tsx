import {
  Icon,
  IconButton
} from "@material-ui/core";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";


export const NewTodo = ({ handleAdd }) => {
  const editableRef = useRef(null);
  const [editableText, setEditableText] = useState("");

  const handleChange = () => {
    setEditableText(editableRef.current.textContent);
  };

  const addTodo = () => {
    const name = editableRef?.current.textContent;
    if (name.length) {
      handleAdd({
        id: Math.random(),
        name: name,
        completed: false,
      });

      setEditableText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  return (
    <>
      <IconButton style={{ padding: 0 }} size="small">
        <Icon>add</Icon>
      </IconButton>
      <ContentEditable
        className={clsx(["none-outline placeholder"])}
        style={{ width: "90%", padding: "2px 0", workBreak: "break-all" }}
        spellCheck={false}
        innerRef={editableRef}
        html={editableText}
        onChange={handleChange}
        placeholder="Новая задача"
        onKeyPress={handleKeyDown}
        onBlur={() => addTodo()} />
    </>
  );
};
