import { ReactNode } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

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
      heading: "IDENTITÉ",
      items: [
        {
          name: "Agendamentos",
          link: "/identite/queryscheduling",
          icon: SearchOutlinedIcon,
        },
        {
          name: "Dashboards",
          link: "/identite/dashboards",
          icon: SpeedIcon,
        },
        {
          name: "Parceiros",
          link: "/partners",
          icon: PeopleOutlineIcon,
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
        {
          name: "Clientes",
          link: "/customers",
          icon: PersonOutlinedIcon,
        },
      ],
    },
  ];
  const ItemsAV: MenuItems[] = [
    {
      heading: "Agente de vídeo",
      items: [
        {
          name: "Agendar atendimento",
          link: "/agentregister/toschedule",
          icon: ShoppingBagOutlinedIcon,
        },
        {
          name: "Clientes",
          link: "/customers",
          icon: PersonOutlinedIcon,
        },
      ],
    },
  ];

  const ItemsGE: MenuItems[] = [
    {
      heading: "Gestor",
      items: [
        {
          name: "Usuários",
          link: "/users",
          icon: PersonOutlinedIcon,
        },
        {
          name: "Agendas",
          link: "/schedules",
          icon: EventNoteOutlinedIcon,
        },
      ],
    },
  ];

  const ItemsPA: MenuItems[] = [
    {
      heading: "PARCEIRO",
      items: [
        {
          name: "Vendas",
          link: "/sales",
          icon: ShoppingBagOutlinedIcon,
        },
      ],
    },
  ];

  switch (type) {
    case "AR":
      return ItemsAR.concat(ItemsComum);
    case "AV":
      return ItemsAV.concat(ItemsComum);
    case "GE":
      return ItemsAR.concat(ItemsComum).concat(ItemsGE);
    case "PA":
      return ItemsPA;
  }
};

export default menuItems;
