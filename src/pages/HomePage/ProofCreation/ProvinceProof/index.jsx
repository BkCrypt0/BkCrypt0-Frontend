import { Box, useMediaQuery, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import provinceCode from "src/documents/provinces_code.json";
import CustomCollapse from "src/components/CustomCollapse";
import { useState } from "react";
import SignMessageDialog from "src/components/SignMessageDialog";

export default function ProvinceProof() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const provinceNames = Object.keys(provinceCode);

  return (
    <>
      <SignMessageDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
      />
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          background: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
          width: mobile ? "100%" : tablet ? "90%" : "45%",
          borderRadius: "10px",
          boxShadow: `5px 5px 15px 3px ${
            themeMode === THEME_MODE.DARK
              ? "rgba(0, 0, 0, 0.7)"
              : "rgba(53, 53, 53, 0.4)"
          }`,
          paddingY: 3,
          mb: 3,
        }}
      >
        <Box width="90%">
          <Box width="100%">
            <Box
              width="100%"
              display="flex"
              flexDirection={mobile ? "column" : "row"}
            >
              <CustomTypography fontWeight="bold" mr={1}>
                Home:
              </CustomTypography>
              <CustomTypography>
                Prove that your home town belongs to one of these following
                provinces
              </CustomTypography>
            </Box>
            <Box
              width="100%"
              display="flex"
              flexWrap="wrap"
              mt={2}
              alignItems="center"
            >
              {provinceList.length > 0 &&
                provinceList.map((e, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    px={2}
                    mr={1}
                    mb={1}
                    sx={{
                      minWidth: "50px",
                      minHeight: "30px",
                      maxHeight: "35px",
                      borderRadius: "10px",
                      background:
                        themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
                    }}
                  >
                    <CustomTypography buttonText={true}>{e}</CustomTypography>
                  </Box>
                ))}
              <IconButton onClick={() => setOpen(true)}>
                <AddIcon
                  sx={{
                    color:
                      themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
                  }}
                />
              </IconButton>
              <CustomCollapse
                open={open}
                data={provinceNames}
                targetFormId="bp"
                setOpen={setOpen}
                select={true}
                setProvinceList={setProvinceList}
                provinceList={provinceList}
              />
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            sx={{ mt: 5 }}
          >
            <CustomButton width={mobile ? "100%" : undefined} minHeight="50px">
              <CustomTypography buttonText={true}>
                Create Proof
              </CustomTypography>
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
