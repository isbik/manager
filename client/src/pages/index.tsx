import { Box, Button, Chip, Grid, Link, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useStore } from "effector-react";
import React from "react";
import { $boards } from "../modules/board/state";
const useStyles = makeStyles((theme) => ({}));

const Blog = () => {
  const classes = useStyles();

  const boards = useStore($boards);
  console.log(boards);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h4">
          Ваши доски
        </Typography>
        <Grid container spacing={1}>
          {boards.map((board) => (
            <Grid key={board.id} item xs={12} sm={4} md={3}>
              <Card style={{ backgroundColor: board.color }}>
                <CardContent>
                  <Box display="flex" width="100%" mb={1}>
                    <Typography component="h3" variant="h5">
                      {board.name}
                    </Typography>
                    <Chip
                      style={{ alignSelf: "flex-start", marginLeft: "auto" }}
                      label={board.cards_count}
                    />
                  </Box>
                  <Link href={`/board/${board.id}`}>
                    <a>
                      <Button variant="outlined">Перейти</Button>
                    </a>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Blog;
