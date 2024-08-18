// ** Type import
import { HorizontalNavItemsType } from "src/@core/layouts/types";

const navigation = (): HorizontalNavItemsType => {
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
