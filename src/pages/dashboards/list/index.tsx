// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import ImageLoader from "src/pages/components/imageLoader";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Actions Imports
import { fetchData, deleteUser } from "src/store/apps/user";

// ** Third Party Components
import { useApolloClient } from "@apollo/client";
import toast from "react-hot-toast";
import moment from "moment-timezone";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { Employee } from "src/services/graphql/types";
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Table Components Imports
import TableHeader from "src/views/dashboards/list/TableHeader";
import { useAuth } from "src/hooks/useAuth";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import uris from "src/configs/uris";

interface ConsultaFichaParams {
  cedula: string;
}

const consultaFicha = async (params: ConsultaFichaParams): Promise<Empleado[]> => {
  const url = `${uris.query_sisap}/fichas/consulta/${params.cedula}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface UserRoleType {
  [key: string]: { icon: string; color: string };
}

interface UserStatusType {
  [key: string]: ThemeColor;
}

// ** Vars
const userRoleObj: UserRoleType = {
  administrator: { icon: "mdi:laptop", color: "error.main" },
  author: { icon: "mdi:cog-outline", color: "warning.main" },
  editor: { icon: "mdi:pencil-outline", color: "info.main" },
  maintainer: { icon: "mdi:chart-donut", color: "success.main" },
  subscriber: { icon: "mdi:account-outline", color: "primary.main" },
};

interface Empleado {
  id: number;
  cedula_identidad: number;
  nombre: string;
  cod_dep: number;
  dependencia: string;
  cod_tipo_nomina: number;
  denominacion: string;
  cod_cargo: number;
  cod_ficha: number;
  condicion_actividad: number;
  cod_puesto: number;
  fecha_ingreso: string; // formato "YYYY-MM-DD"
  fecha_movimiento: string; // formato "YYYY-MM-DD"
  demonimacion_puesto: string;
}

interface CellType {
  row: Empleado;
}
const getCondicion = (condicion: number) => {
  switch (condicion) {
    case 1:
      return "Activo";
    case 2:
      return "Permiso no remunerado";
    case 3:
      return "Comisión de servicio";
    case 4:
      return "Vacaciones";
    case 5:
      return "Suspendido";
    case 6:
      return "Retirado";
    case 7:
      return "Ascenso";
    case 8:
      return "Reposo";
  }
};

const getStatus = (condicion: number) => {
  switch (condicion) {
    case 2:
      return "permisoNoRemunerado";
    case 3:
      return "comisionDeServicio";
    case 4:
      return "vacaciones";
    case 5:
      return "suspendido";
    case 6:
      return "retirado";
    case 7:
      return "ascenso";
    case 8:
      return "reposo";
    default:
      return "activo";
  }
};

const userStatusObj: UserStatusType = {
  activo: "success",
  permisoNoRemunerado: "warning",
  comisionDeServicio: "info",
  vacaciones: "primary",
  suspendido: "error",
  retirado: "secondary",
  ascenso: "success",
  reposo: "info",
};

// ** renders client column
const renderClient = (row: Empleado) => {
  const { cedula_identidad } = row;
  return <ImageLoader src={`${uris.query_sisap}/hoja_vida/consulta_foto/${cedula_identidad}`} alt={getInitials(row.nombre)} />;
};

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: "nombre",
    headerName: "Nombre",
    renderCell: ({ row }: CellType) => {
      const { nombre } = row;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row)}
          <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
            <Tooltip title={nombre}>
              <Typography>{`${nombre}`}</Typography>
            </Tooltip>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: "dependencia",
    headerName: "Dependencia",
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title={row.dependencia}>
          <Typography noWrap variant="body2">
            {row.dependencia}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    flex: 0.15,
    field: "denominacion",
    minWidth: 150,
    headerName: "Nomina",
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title={row.denominacion}>
          <Typography noWrap variant="body2">
            {row.denominacion}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    flex: 0.15,
    field: "demonimacion_puesto",
    minWidth: 150,
    headerName: "Cargo",
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title={row.demonimacion_puesto}>
          <Typography noWrap variant="body2">
            {row.demonimacion_puesto}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    flex: 0.15,
    field: "fecha_ingreso",
    minWidth: 150,
    headerName: "Fecha ingreso",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2">
          {row.fecha_ingreso ? moment(row.fecha_ingreso).format("DD/MM/YYYY") : "-"}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    field: "fecha_movimiento",
    minWidth: 150,
    headerName: "Fecha movimiento",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2">
          {row.fecha_movimiento ? moment(row.fecha_movimiento).format("DD/MM/YYYY") : "-"}
        </Typography>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: "condicion_actividad",
    headerName: "Estatus",
    renderCell: ({ row }: CellType) => {
      const label = getCondicion(row.condicion_actividad);

      return (
        <CustomChip
          skin="light"
          size="small"
          label={label}
          color={userStatusObj[getStatus(row.condicion_actividad)]}
          sx={{ textTransform: "capitalize", "& .MuiChip-label": { lineHeight: "18px" } }}
        />
      );
    },
    valueGetter: (params) => {
      const row = params.row;
      const condicionActividad = row.condicion_actividad;
      const label = getCondicion(condicionActividad);
      return label;
    },
  },
];

const UserList = () => {
  // ** State
  const [isLoading, setIsLoading] = useState(false);

  // ** Hooks
  const [store, setStore] = useState<Empleado[]>([]);

  const toggleFindPersonal = async (cedula: string) => {
    setIsLoading(true);
    const ficha = await consultaFicha({ cedula });

    const listData = ficha.map((ficha: Empleado, index: number) => {
      return {
        ...ficha,
        id: index + 1,
      };
    });
    setStore(listData);
    setIsLoading(false);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Fichas de personal" sx={{ pb: 4, "& .MuiCardHeader-title": { letterSpacing: ".15px" } }} />
          <TableHeader toggle={toggleFindPersonal} />
          <DataGrid
            autoHeight
            rows={store}
            loading={isLoading}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterPagination={true}
            localeText={{
              noRowsLabel: "No hay registros disponibles",
            }}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 }, "& .MuiDataGrid-cell": { maxHeight: "75px !important" } }}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserList;
