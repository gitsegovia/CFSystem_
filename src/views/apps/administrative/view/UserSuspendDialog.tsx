// ** React Imports
import { useState } from "react"

// ** MUI Imports
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Typography from "@mui/material/Typography"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"

// ** Next Import
import { useRouter } from "next/router"

// ** Icon Imports
import Icon from "src/@core/components/icon"
import { useApolloClient } from "@apollo/client"
import { useDispatch } from "react-redux"
import { disableUser } from "src/store/apps/administrative"
import { AppDispatch } from "src/store"

type Props = {
    open: boolean
    setOpen: (val: boolean) => void
    id: string
}

const UserSuspendDialog = (props: Props) => {
    // ** Props
    const { open, setOpen, id } = props
    const { query, mutate } = useApolloClient()
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    // ** States
    const [userInput, setUserInput] = useState<string>("yes")
    const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

    const handleClose = () => setOpen(false)

    const handleSecondDialogClose = () => setSecondDialogOpen(false)

    const handleConfirmation = async (value: string) => {
        if (value === "yes") {
            dispatch(
                disableUser({
                    query,
                    mutate,
                    data: { id },
                    callback: () => {
                        handleClose()
                        setUserInput(value)
                        setSecondDialogOpen(true)
                        router.replace("/apps/administrative/list/")
                    },
                })
            )
        } else {
            handleClose()
            setUserInput(value)
            setSecondDialogOpen(true)
        }
    }

    return (
        <>
            <Dialog fullWidth open={open} onClose={handleClose} sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 512 } }}>
                <DialogContent
                    sx={{
                        px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            textAlign: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                            "& svg": { mb: 8, color: "warning.main" },
                        }}
                    >
                        <Icon icon="mdi:alert-circle-outline" fontSize="5.5rem" />
                        <Typography variant="h4" sx={{ mb: 5, color: "text.secondary" }}>
                            ¿Seguro quiere suspender el usuario?
                        </Typography>
                        <Typography>No podrás revertir el usuario!</Typography>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: "center",
                        px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
                    }}
                >
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => handleConfirmation("yes")}>
                        Si, Suspender usuario!
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleConfirmation("cancel")}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth open={secondDialogOpen} onClose={handleSecondDialogClose} sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 512 } }}>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            "& svg": {
                                mb: 14,
                                color: userInput === "yes" ? "success.main" : "error.main",
                            },
                        }}
                    >
                        <Icon fontSize="5.5rem" icon={userInput === "yes" ? "mdi:check-circle-outline" : "mdi:close-circle-outline"} />
                        <Typography variant="h4" sx={{ mb: 8 }}>
                            {userInput === "yes" ? "Suspendido!" : "Cancelado"}
                        </Typography>
                        <Typography>{userInput === "yes" ? "Usuario ha sido suspendido." : "Cancelado!"}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" color="success" onClick={handleSecondDialogClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserSuspendDialog
