import { Grid, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useEffectExceptOnMount } from "../../../hooks/useEffectExceptOnMount";
import { BoardCRUD } from "../../../services/API/board";
import { $updateBoard } from "../state";

interface IChangeName {
  name: string;
}
export const ChangeName: React.FC<IChangeName> = React.memo(
  ({ name: defaultName }) => {
    const router = useRouter();
    const id = +router.query.id;
    const [name, setName] = React.useState(defaultName);

    const debounceName = useDebounce(name, 500);

    useEffectExceptOnMount(() => {
      if (name) {
        BoardCRUD.patch(id, { name }).then((response) => {
          $updateBoard({ board_id: id, data: response.data });
        });
      }
    }, [debounceName]);

    return (
      <Grid item xs={12}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          fullWidth
          variant="outlined"
          placeholder="Название доски"
        ></TextField>
      </Grid>
    );
  }
);
