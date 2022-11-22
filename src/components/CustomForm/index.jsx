import CustomTypography from "../CustomTypography";
import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export default function CustomForm({
  onSubmit,
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
  autoComplete = "form",
  targetButtonId = undefined,
  onFocus = undefined,
  ...props
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);

  return (
    <Box width="100%">
      <form
        style={{ width: "100%" }}
        onSubmit={
          onSubmit
            ? onSubmit
            : (e) => {
                e.preventDefault();
                document.getElementById(targetButtonId).click();
              }
        }
      >
        <label htmlFor={id}>
          <CustomTypography>{label}</CustomTypography>
        </label>
        <input
          onFocus={onFocus}
          defaultValue={defaultValue ? defaultValue : undefined}
          type={type}
          id={id}
          name={name}
          placeholder={placeHolder}
          onChange={onChange}
          autoComplete={autoComplete}
          min={0}
          style={{
            fontSize: "17px",
            MozAppearance: "textfield",
            WebkitAppearance: "textfield",
            color: themeMode === THEME_MODE.DARK ? "#D8D8D8" : "#353535",
            width: !width ? "100%" : width,
            height: !height ? "50px" : height,
            padding: !padding ? "12px 20px" : padding,
            margin: !margin ? "8px 0" : margin,
            display: "inline-block",
            border:
              themeMode === THEME_MODE.DARK
                ? "1.5px solid rgba(216, 216, 216, 0.4)"
                : "1.5px solid rgba(53, 53, 53, 0.4)",
            background: themeMode === THEME_MODE.LIGHT ? "#f2f2f2" : "#434343",
            borderRadius: "10px",
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
