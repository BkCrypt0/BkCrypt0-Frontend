import { Box, Link, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
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
          mx: 1.5,
        }}
        width={2}
        height={33}
      />
      <Link href="https://github.com/BkCrypt0" target="_blank">
        <i
          style={{
            color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
            fontSize: "30px",
            marginRight: "10px",
          }}
          className="fa-brands fa-github"
        />
      </Link>
      <Link href="https://www.facebook.com/BKCrypt0" target="_blank">
        <i
          className="fa-brands fa-facebook"
          style={{
            color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
            fontSize: "30px",
            marginRight: "10px",
          }}
        />
      </Link>
      <Link href="https://discord.gg/rVY4Yj6M" target="_blank">
        <i
          style={{
            color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
            fontSize: "30px",
            marginRight: "10px",
          }}
          className="fa-brands fa-discord"
        />
      </Link>
      <Link
        href="https://bkcrypt0s-organization.gitbook.io/self-sovereign-identity/?fbclid=IwAR0WWRz6hD6oa830X7bb0VnLEc6mEW82bxuXJGa88A7mw1hVXsv59W-oP0A"
        target="_blank"
      >
        <i
          style={{
            color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
            fontSize: "30px",
          }}
          className="fa-solid fa-book"
        />
      </Link>
    </Box>
  );
}
