import { Icon, IconButton } from "@material-ui/core";
import clsx from "clsx";
import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { $drawer, $toggleDrawer } from "../../../../components/TheDrawer/state";
import { useStyles } from "./useStyles";
interface IBoardTypeItem {
  name: string;
  icon: React.ReactNode;
  to: string;
}

export const BoardTypeItem: React.FunctionComponent<IBoardTypeItem> = ({
  icon,
  to,
}) => {
  const classes = useStyles({});
  const drawer = useStore($drawer);
  const closeDrawer = () => {
    if (drawer) {
      $toggleDrawer();
    }
  };
  return (
    <Link href={to}>
      <a onClick={closeDrawer}>
        <IconButton className={clsx(classes.listItemIcon)}>
          <Icon>{icon}</Icon>
        </IconButton>
      </a>
    </Link>
  );
};
