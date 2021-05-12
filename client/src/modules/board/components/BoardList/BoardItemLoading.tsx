import { ListItem, ListItemIcon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useStore } from "effector-react";
import React from "react";
import { $drawer } from "../../../../components/TheDrawer/state";
import { useStyles } from "./useStyles";
export const BoardItemLoading: React.FC = ({}) => {
  const classes = useStyles({ color: "grey" });
  const drawer = useStore($drawer);
  return (
    <>
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Skeleton
            style={{ marginLeft: 15 }}
            variant="circle"
            height="30px"
            width="30px"
          ></Skeleton>
        </ListItemIcon>
        <p
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            margin: 0,
            marginRight: 20,
            flexGrow: 1,
          }}
        >
          <Skeleton height="20px" />
        </p>
        {drawer && (
          <Skeleton
            variant="rect"
            height="30px"
            width="30px"
            style={{ marginRight: 10, borderRadius: 5 }}
          ></Skeleton>
        )}
      </ListItem>
    </>
  );
};
