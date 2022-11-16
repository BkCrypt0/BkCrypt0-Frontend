import { useSelector } from "react-redux";
import { Tooltip, IconButton } from "@mui/material";
import { THEME_MODE } from "src/constants";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

export default function CopyToClipboardButton({
  title,
  targetText,
  copy,
  setCopy,
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  return (
    <>
      {copy === false && (
        <Tooltip title={title} placement="top" arrow={true}>
          <IconButton
            sx={{
              ml: 0.5,
            }}
            onClick={() => {
              setCopy(true);
              navigator.clipboard.writeText(targetText);
            }}
          >
            <ContentCopyIcon
              sx={{
                color:
                  themeMode === THEME_MODE.DARK
                    ? "rgba(216, 216, 216, 0.6)"
                    : "rgba(53, 53, 53, 0.6)",
              }}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      )}
      {copy === true && (
        <Tooltip title="Copied" placement="top" arrow={true}>
          <IconButton
            sx={{
              ml: 0.5,
            }}
            onClick={() => navigator.clipboard.writeText(targetText)}
          >
            <DoneIcon
              fontSize="small"
              sx={{
                color:
                  themeMode === THEME_MODE.DARK
                    ? "rgba(216, 216, 216, 0.6)"
                    : "rgba(53, 53, 53, 0.6)",
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
