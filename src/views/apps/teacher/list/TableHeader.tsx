// ** MUI Imports
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

// ** Icon Imports
import Icon from "src/@core/components/icon"

interface TableHeaderProps {
    value: string
    toggle: () => void
    handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
    // ** Props
    const { handleFilter, toggle, value } = props

    return (
        <Box sx={{ p: 5, pb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ mr: 4, mb: 2 }}></Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                <TextField size="small" value={value} sx={{ mr: 6, mb: 2 }} placeholder="Buscar profesor" onChange={(e) => handleFilter(e.target.value)} />

                <Button sx={{ mb: 2 }} onClick={toggle} variant="contained">
                    Nuevo profesor
                </Button>
            </Box>
        </Box>
    )
}

export default TableHeader
