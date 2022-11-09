import { THEME_MODE } from "../../constants";
import { useSelector } from "react-redux";
import { TeamLogoDark, TeamLogoLight } from "../../logos";

export default function TeamLogo({ style }) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  return themeMode === THEME_MODE.DARK ? (
    <TeamLogoLight style={style} />
  ) : (
    <TeamLogoDark style={style} />
  );
}
