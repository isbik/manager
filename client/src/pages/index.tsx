import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import React from "react";

const Blog = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Typography>Что нибудь нормальное и что нибудь позитивное</Typography>
        </main>
      </Container>
    </>
  );
};

export default Blog;
