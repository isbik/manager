import {
  Avatar,
  Button,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { $drawer } from "../../../../components/TheDrawer/state";
import { IBoardItemProps } from "../AddBoardItem";
import { useStyles } from "./useStyles";

export const BoardItem: React.FunctionComponent<IBoardItemProps> = ({
  board,
}) => {
  const classes = useStyles({ color: board.color });
  const drawer = useStore($drawer);
  return (
    <Link href={`/board/${board.id}`}>
      <a>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <Avatar variant="circle" className={classes.listItemCount}>
              {board.cards_count || 0}
            </Avatar>
          </ListItemIcon>
          <ListItemText>{board.name}</ListItemText>
          {drawer && (
            <Link href={`/board/${board.id}/settings`}>
              <a>
                <Button className={classes.settingButton} size="small">
                  <Icon style={{ fontSize: "1rem" }}>settings</Icon>
                </Button>
              </a>
            </Link>
          )}
        </ListItem>
      </a>
    </Link>
  );
};
