import { TeamLogoDark, TeamLogoLight } from "../../logos";

export default function TeamLogo({ style, type = "dark" }) {
  return type === "light" ? (
    <TeamLogoLight style={style} />
  ) : (
    <TeamLogoDark style={style} />
  );
}
