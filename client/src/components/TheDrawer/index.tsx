import { Box, Divider, Drawer, Icon, IconButton } from "@material-ui/core";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import clsx from "clsx";
import { useStore } from "effector-react";
import React from "react";
import { AddBoardItem } from "../../modules/board/components/AddBoardItem";
import { BoardList } from "../../modules/board/components/BoardList";
import { $setBoardName } from "../../modules/board/state";
import { $user } from "../../modules/user/state";
import { $drawer, $theme, $toggleDrawer, $toggleTheme } from "./state";
import { useStyles } from "./useStyles";
interface TheDrawerProps {}

export const drawerWidth = 260;

export const TheDrawer: React.FC<TheDrawerProps> = React.memo(({}) => {
  const classes = useStyles();
  const drawer = useStore($drawer);
  const theme = useStore($theme);
  const user = useStore($user);

  React.useEffect(() => {
    if (!drawer) {
      $setBoardName("");
    }
  }, [drawer]);

  const searchBoards = (name: string) => {
    $setBoardName(name);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawer,
        [classes.drawerClose]: !drawer,
      })}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: drawer,
          [classes.drawerClose]: !drawer,
        }),
      }}
    >
      <Box display="flex" alignItems="center" marginLeft={0.5}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => $toggleDrawer()}
          className={classes.menuIcon}
        >
          <Icon>menu</Icon>
        </IconButton>
        {drawer && (
          <Box style={{ marginRight: "auto", borderRadius: "none" }}>
            {/* <Link href="/profile">
              <a href="">{JSON.stringify(user, null, 4)}</a>
            </Link> */}
          </Box>
        )}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => $toggleTheme()}
        >
          {theme ? <Brightness7Icon /> : <Brightness2Icon />}
        </IconButton>
      </Box>
      <Divider />
      <Box paddingTop={2} style={{ overflowX: "hidden" }}>
        <AddBoardItem handleSearch={searchBoards} />
        <BoardList />
      </Box>
    </Drawer>
  );
});
