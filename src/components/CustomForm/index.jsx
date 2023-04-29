import CustomTypography from "../CustomTypography";
import { Box, useTheme } from "@mui/material";

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
  value = undefined,
  ...props
}) {
  const theme = useTheme();

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
          value={value}
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
            color: theme.colors.dark_3,
            width: !width ? "100%" : width,
            height: !height ? "50px" : height,
            padding: !padding ? "12px 20px" : padding,
            margin: !margin ? "8px 0" : margin,
            display: "inline-block",
            border: `1px solid ${theme.colors.medium_2}`,
            background: "#f2f2f2",
            borderRadius: "5px",
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
