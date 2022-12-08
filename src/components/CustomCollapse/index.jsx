import { Box, Collapse } from "@mui/material";
import CustomTypography from "../CustomTypography";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import { useState } from "react";
import CustomForm from "../CustomForm";

export default function CustomCollapse({
  open,
  handleClose,
  data,
  targetFormId,
  setOpen,
  select = false,
  setProvinceList = undefined,
  provinceList = undefined,
  displaySearch = true,
  ...props
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const [provinceInput, setProvinceInput] = useState("");

  return (
    <Collapse
      in={open}
      sx={{
        zIndex: 100,
        position: "fixed",
        paddingX: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 220,
        maxHeight: 220,
        overflowY: "auto",
        background: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
        borderRadius: "10px",
        boxShadow: `5px 5px 15px 3px ${
          themeMode === THEME_MODE.DARK
            ? "rgba(0, 0, 0, 0.7)"
            : "rgba(53, 53, 53, 0.4)"
        }`,
        ...props,
      }}
    >
      {displaySearch === true && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            background: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
            zIndex: 1000,
            paddingTop: 1,
          }}
        >
          <CustomForm
            type="text"
            placeHolder="Search province..."
            onChange={() =>
              setProvinceInput(document.getElementById("bp").value)
            }
          />
        </Box>
      )}
      {data
        .filter((e) => e.includes(provinceInput))
        .map((e, index) => (
          <Box
            width="80%"
            px={2}
            py={1}
            key={index}
            sx={{
              borderRadius: "10px",
              cursor: "pointer",
              "&:hover": {
                background:
                  themeMode === THEME_MODE.DARK
                    ? "rgba(216, 216, 216, 0.1)"
                    : "rgba(53, 53, 53, 0.1)",
                cursor: "pointer",
              },
            }}
            onClick={
              select === false
                ? () => {
                    document.getElementById(targetFormId).value = e.toString();
                    setOpen(false);
                  }
                : () => {
                    if (!provinceList.includes(e.toString())) {
                      const newList = [e, ...provinceList];
                      setProvinceList(newList);
                    }
                    setOpen(false);
                  }
            }
          >
            <CustomTypography>{e}</CustomTypography>
          </Box>
        ))}
    </Collapse>
  );
}
