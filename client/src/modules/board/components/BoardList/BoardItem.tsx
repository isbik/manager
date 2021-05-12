import {
  Avatar,
  Button,
  Icon,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { $drawer, $toggleDrawer } from "../../../../components/TheDrawer/state";
import { IBoardItemProps } from "../AddBoardItem";
import { useStyles } from "./useStyles";
export const BoardItem: React.FunctionComponent<IBoardItemProps> = ({
  board,
}) => {
  const classes = useStyles({ color: board.color });
  const drawer = useStore($drawer);
  return (
    <>
      <Link href={`/board/${board.id}`}>
        <a>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <Avatar variant="circle" className={classes.listItemCount}>
                {board.cards_count || 0}
              </Avatar>
            </ListItemIcon>
            <p
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                margin: 0,
                flexGrow: 1,
              }}
            >
              {board.name}
            </p>
            {drawer && (
              <Link href={`/board/${board.id}/settings`}>
                <a>
                  <Button
                    onClick={() => $toggleDrawer()}
                    className={classes.settingButton}
                    size="small"
                  >
                    <Icon style={{ fontSize: "1rem" }}>settings</Icon>
                  </Button>
                </a>
              </Link>
            )}
          </ListItem>
        </a>
      </Link>
    </>
  );
};
