import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button, Badge, Collapse, ListItem } from "@mui/material";

import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { useReduceMenu } from "@/presentation/hooks";

interface SidebarMenuItemProps {
  children?: ReactNode;
  link?: string;
  icon?: any;
  badge?: string;
  open?: boolean;
  active?: boolean;
  name: string;
  operation?: number;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  link,
  icon: Icon,
  badge,
  open: openParent,
  active,
  name,
  operation,
  ...rest
}) => {
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent);

  const navigate = useNavigate();

  const toggleMenu = (): void => {
    setMenuToggle((Open) => !Open);
  };

  const { minimized } = useReduceMenu();

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          className={clsx({ "Mui-active": menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={
            menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />
          }
          onClick={toggleMenu}
        >
          {name}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button
        className={active ? "Mui-active" : ""}
        onClick={() => navigate(link, { state: { page: link } })}
        startIcon={Icon && <Icon />}
      >
        {!minimized && name}

        {badge && !minimized && <Badge badgeContent={badge} />}
      </Button>
    </ListItem>
  );
};

SidebarMenuItem.defaultProps = {
  open: false,
  active: false,
};

export default SidebarMenuItem;
