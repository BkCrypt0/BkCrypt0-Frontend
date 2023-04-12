import { Box, useMediaQuery, Typography } from "@mui/material";
import TeamLogo from "../../components/TeamLogo";
import { SCREEN_SIZE } from "../../constants";
import EnterAppButton from "src/components/EnterAppButton";
import { useTheme } from "@mui/material";

export default function LandingPage() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const theme = useTheme();

  return (
    <Box
      margin="auto"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <TeamLogo
        style={{
          width: mobile ? "70%" : tablet ? "50%" : "35%",
          height: "auto",
        }}
      />
      <Typography
        variant={mobile ? "h6" : tablet ? "h5" : "h3"}
        sx={{
          ml: mobile ? 5 : tablet ? 15 : 50,
          mr: mobile ? 5 : tablet ? 15 : 50,
          color: theme.colors.dark_2,
          letterSpacing: "3px",
          fontWeight: 500,
          lineHeight: 2,
          textAlign: "center",
          mt: 5,
          mb: 5,
        }}
      >
        Nền tảng cung cấp giải pháp về tính riêng tư cho định danh số
      </Typography>

      {mobile && <EnterAppButton />}
    </Box>
  );
}
