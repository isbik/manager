import React, { useRef } from "react";
import { NoteCRUD } from "../../services/API/note";
import { INoteTask } from "../../types/tasks";
import { $updateNote } from "./state";
import { useStyles } from "./useStyles";

export const NoteTask: React.FunctionComponent<INoteTask> = ({
  id,
  name,
}) => {
  const classes = useStyles();
  const editableRef = useRef<HTMLDivElement>();

  const handleBlur = () => {
    NoteCRUD.update(id, { name: editableRef.current.innerHTML }).then(
      (response) => {
        $updateNote({ id, data: response.data });
      }
    );
  };

  return (
    <div
      contentEditable
      className={classes.textEditor}
      spellCheck={false}
      ref={editableRef}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: name }}
    ></div>
  );
};
