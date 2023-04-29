import { Box, Link, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import { useTheme } from "@mui/material";

import { SCREEN_SIZE } from "src/constants";

export default function Footer() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "0px",
        paddingY: 2,
        width: "100%",
      }}
    >
      <CustomTypography variant={mobile ? undefined : "h6"} mr={1}>
        2023
      </CustomTypography>
      <CustomTypography variant={mobile ? undefined : "h6"} fontWeight="bold">
        Zk:Elite
      </CustomTypography>
      <Box
        sx={{
          background: theme.colors.dark_3,
          borderRadius: "5px",
          mx: 1.5,
        }}
        width={2}
        height={33}
      />
      <Link href="https://github.com/BkCrypt0" target="_blank">
        <i
          style={{
            color: theme.colors.dark_2,
            fontSize: "30px",
            marginRight: "10px",
          }}
          className="fa-brands fa-github"
        />
      </Link>
    </Box>
  );
}
