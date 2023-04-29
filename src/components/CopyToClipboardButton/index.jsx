import { Tooltip, IconButton, useTheme } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

export default function CopyToClipboardButton({
  title,
  targetText,
  copy,
  setCopy,
}) {
  const theme = useTheme();

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
                color: theme.colors.dark_3,
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
                color: theme.colors.dark_3,
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
