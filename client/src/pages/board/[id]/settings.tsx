import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChangeColor } from "../../../modules/board/BoardSettings/ChangeColor";
import { ChangeName } from "../../../modules/board/BoardSettings/ChangeName";
import { $deleteBoard } from "../../../modules/board/state";
import { BoardCRUD } from "../../../services/API/board";
const Settings = () => {
  const router = useRouter();
  const id = +router.query.id;

  const [board, setBoard] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      BoardCRUD.get(id)
        .then((response) => {
          setBoard(response.data);
          setLoading(false);
        })
        .catch(() => {
          router.push("/");
        });
    }
  }, [id]);

  const deleteBoard = () => {
    BoardCRUD.delete(id)
      .then(() => {
        router.push("/");
        $deleteBoard(id);
      })
      .catch(() => {
        router.push("/");
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container>
      <Box display="flex" mb={1}>
        <Link href={`/board/${id}`}>
          <a>
            <IconButton style={{ alignSelf: "flex-start", marginRight: 10 }}>
              <Icon>arrow_back</Icon>
            </IconButton>
          </a>
        </Link>
        <Typography gutterBottom variant="h4">
          Настройка доски
        </Typography>
      </Box>

      <ChangeName name={board.name} />
      <ChangeColor color={board.color} use_color={board.use_color} />
      <Grid item xs={12}>
        <h3>Действия</h3>
        {/* <Button
          style={{ marginRight: 10, marginBottom: 10 }}
          variant="contained"
          color="primary"
        >
          Поделиться
        </Button> */}
        <Button
          onClick={() => deleteBoard()}
          style={{ marginBottom: 10 }}
          variant="contained"
          color="secondary"
        >
          Удалить доску
        </Button>
      </Grid>
    </Grid>
  );
};

export default Settings;
