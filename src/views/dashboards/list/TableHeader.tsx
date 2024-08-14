// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

// ** Icon Imports
import Icon from "src/@core/components/icon";

interface TableHeaderProps {
  toggle: (cedula: string) => void;
}

const TableHeader = (props: TableHeaderProps) => {
  const [value, setValue] = useState("");
  // ** Props
  const { toggle } = props;

  return (
    <Box sx={{ p: 5, pb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ mr: 4, mb: 2 }}></Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField size="small" value={value} onChange={(e) => setValue(e.target.value)} sx={{ mr: 6, mb: 2 }} placeholder="Buscar personal" onKeyDown={(e) => e.key === "Enter" && toggle(value)} />

        <Button sx={{ mb: 2 }} onClick={() => toggle(value)} variant="contained">
          Buscar
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
