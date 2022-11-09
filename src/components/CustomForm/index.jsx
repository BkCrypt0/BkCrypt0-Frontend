import CustomTypography from "../CustomTypography";
import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export default function CustomForm({
  type,
  id,
  name,
  label,
  width,
  height,
  margin,
  padding,
  error,
  errorText,
  placeHolder,
  onChange,
  defaultValue,
  ...props
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);

  return (
    <Box width="100%">
      <form style={{ width: "100%" }}>
        <label htmlFor={id}>
          <CustomTypography>{label}</CustomTypography>
        </label>
        <input
          defaultValue={defaultValue ? defaultValue : undefined}
          type={type}
          id={id}
          name={name}
          placeholder={placeHolder}
          onChange={onChange}
          style={{
            color: themeMode === THEME_MODE.DARK ? "#D8D8D8" : "#353535",
            background: themeMode === THEME_MODE.LIGHT ? "white" : "#353535",
            width: !width ? "100%" : width,
            height: !height ? "50px" : height,
            padding: !padding ? "12px 20px" : padding,
            margin: !margin ? "8px 0" : margin,
            display: "inline-block",
            border:
              themeMode === THEME_MODE.DARK
                ? "2px solid #D8D8D8"
                : "2px solid #353535",
            borderRadius: "4px",
            boxSizing: "border-box",
            ...props,
          }}
        />
      </form>
      {error && (
        <CustomTypography color="#FF3C30">{errorText}</CustomTypography>
      )}
    </Box>
  );
}
