import { Box, Link, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";

export default function Footer() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="63px"
    >
      <CustomTypography variant={mobile ? undefined : "h6"} mr={1}>
        2022
      </CustomTypography>
      <CustomTypography variant={mobile ? undefined : "h6"} fontWeight="bold">
        BKCrypt0
      </CustomTypography>
      <Box
        sx={{
          background: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
          borderRadius: "10px",
          mx: 1,
        }}
        width={2}
        height={33}
      />
      <Link href="https://github.com/BkCrypt0" target="_blank">
        <GitHubIcon
          fontSize="large"
          sx={{ color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8" }}
        />
      </Link>
    </Box>
  );
}
