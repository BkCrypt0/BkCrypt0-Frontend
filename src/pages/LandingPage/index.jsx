import { Box, useMediaQuery, Typography } from "@mui/material";
import { THEME_MODE } from "../../constants";
import { useSelector } from "react-redux";
import TeamLogo from "../../components/TeamLogo";
import { SCREEN_SIZE } from "../../constants";
import EnterAppButton from "src/components/EnterAppButton";

export default function LandingPage() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

  return (
    <Box width="100%">
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TeamLogo
          style={{
            width: mobile ? "100%" : tablet ? "80%" : "50%",
            height: "auto",
          }}
        />
        <Typography
          variant={mobile ? "h6" : tablet ? "h5" : "h3"}
          fontFamily="Ubuntu"
          sx={{
            ml: mobile ? 5 : tablet ? 15 : 20,
            mr: mobile ? 5 : tablet ? 15 : 20,
            color: themeMode === THEME_MODE.DARK ? "#D8D8D8" : "#353535",
            letterSpacing: "7px",
            lineHeight: 2,
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          The digital platform providing Zero-Knowledge Proof Verification
        </Typography>

        {mobile && <EnterAppButton />}
      </Box>
    </Box>
  );
}
