// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Home",
      icon: "mdi:home-outline",
      children: [
        {
          title: "Consultar empleado",
          path: "/dashboards/list",
        },
      ],
    },
    {
      sectionTitle: "Usuarios",
    },
    {
      title: "Personal",
      icon: "mdi:account-outline",
      children: [
        {
          title: "Administrador",
          path: "/apps/user/list",
        },
      ],
    },
  ];
};

export default navigation;
