import { ReactNode } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems = (type: string) => {
  const ItemsComum: MenuItems[] = [
    {
      heading: "CERTIFICATE SYSTEM",
      items: [
        {
          name: "Agendamentos",
          link: "/agentregister/queryscheduling",
          icon: SearchOutlinedIcon,
        },
      ],
    },
  ];
  const ItemsAR: MenuItems[] = [
    {
      heading: "Agente de registro",
      items: [
        {
          name: "Agendar atendimento",
          link: "/agentregister/toschedule",
          icon: ShoppingBagOutlinedIcon,
        },
      ],
    },
  ];
  const ItemsAV: MenuItems[] = [];

  const ItemsGE: MenuItems[] = [];

  switch (type) {
    case "AR":
      return ItemsAR.concat(ItemsComum);
    case "AV":
      return ItemsAV.concat(ItemsComum);
    case "GE":
      return ItemsGE.concat(ItemsAR).concat(ItemsAV).concat(ItemsComum);
  }
};

export default menuItems;
