import { Dialog, Box, useMediaQuery} from "@mui/material";
import { useSelector } from "react-redux";
import CustomTypography from "../CustomTypography";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";
import CustomButton from "../CustomButton";

export default function DetailInformationDialog({
  open,
  onClose,
  setOpen,
  information,
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

  return (
    <Dialog
      display="flex"
      flexdirection="column"
      alignitems="center"
      open={open}
      onClose={onClose}
      sx={{ backdropFilter: "blur(5px)" }}
      PaperProps={{
        sx: {
          padding: 3,
          background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
          width: mobile ? "99%" : tablet ? "50%" : "40%",
          borderRadius: "10px",
        },
      }}
    >
      <CustomTypography variant="h5" mb={2}>
        Detail information
      </CustomTypography>
      {information !== undefined && (
        <Box width="100%">
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              First name:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.firstName}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Last name:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.lastName}
            </CustomTypography>
          </Box>

          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Identity number:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.CCCD}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Gender:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.sex === 1 ? "Male" : "Female"}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Date Of Birth:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.DoBdate?.toString().slice(0, 4) +
                "/" +
                information?.DoBdate?.toString().slice(4, 6) +
                "/" +
                information?.DoBdate?.toString().slice(6)}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Birth Place:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.BirthPlace}
            </CustomTypography>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          mt: 2,
          mb: 2,
          background:
            themeMode === THEME_MODE.DARK
              ? "rgba(216, 216, 216, 0.3)"
              : "rgba(53, 53, 53, 0.3)",
          borderRadius: "20px",
        }}
        width="100%"
        height="2px"
      />
      <Box
        width="100%"
        display="flex"
        flexDirection={mobile ? "column" : "row"}
        justifyContent={mobile ? undefined : "flex-end"}
        alignItems="center"
      >
        <CustomButton
          minHeight="50px"
          minWidth={!mobile ? "150px" : undefined}
          fullWidth={mobile}
          onClick={() => {
            setOpen(false);
          }}
        >
          <CustomTypography buttonText>Close</CustomTypography>
        </CustomButton>
      </Box>
    </Dialog>
  );
}
