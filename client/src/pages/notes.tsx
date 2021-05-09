import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { CardWrapper } from "../components/core/CardWrapper";
import AddNewTask from "../components/core/CreateNewTask";
import { NoteTask } from "../modules/note/NoteTask";
import {
  $addNote,
  $deleteNote,
  $fetchNotes,
  $notes
} from "../modules/note/state";
import { NoteCRUD } from "../services/API/note";
import { INoteTask, TaskType } from "../types/tasks";

const Notes = () => {
  const notesStore = useStore($notes);

  useEffect(() => {
    $fetchNotes({});
  }, []);

  const handleCreateNote = ({ name }) => {
    NoteCRUD.create({ name }).then((response) => {
      $addNote(response.data);
    });
  };

  const handleDeleteNote = (id) => {
    console.log(id);

    NoteCRUD.delete(id).then(() => {
      $deleteNote(id);
    });
  };

  return (
    <div>
      <AddNewTask handleAdd={handleCreateNote} only={TaskType.text} />
      {(notesStore.notes || []).map((note: INoteTask) => (
        <CardWrapper key={note.id} deleteCard={() => handleDeleteNote(note.id)}>
          <NoteTask key={note.id} {...note} />
        </CardWrapper>
      ))}
    </div>
  );
}

export default Notes;
