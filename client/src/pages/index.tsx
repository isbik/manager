import { Box, Button, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { $boards } from "../modules/board/state";

const Home = () => {
  const boards = useStore($boards);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h3">
          Ваши доски
        </Typography>
        <Grid container spacing={1} alignItems="stretch">
          {boards.map((board) => (
            <Grid key={board.id} item xs={12} sm={4} md={3}>
              <Card
                style={{
                  backgroundColor: board.color,
                  height: "100%",
                  position: "relative",
                  padding: 10,
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  mb={1}
                  flexGrow={1}
                >
                  <Typography component="h3" variant="h5">
                    {board.name}
                  </Typography>
                  <Typography component="h4" variant="caption">
                    {board.cards_count} задач
                  </Typography>
                </Box>
                <Link href={`/board/${board.id}`}>
                  <a>
                    <Button variant="outlined">Перейти</Button>
                  </a>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
