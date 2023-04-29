import { Box, Collapse } from "@mui/material";
import CustomTypography from "../CustomTypography";
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
  const [provinceInput, setProvinceInput] = useState("");

  return (
    <Collapse
      in={open}
      sx={{
        zIndex: 100,
        paddingX: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 220,
        maxHeight: 220,
        overflowY: "auto",
        background: "white",
        borderRadius: "10px",
        boxShadow: `5px 5px 15px 3px rgba(53, 53, 53, 0.4)"
        }`,
        ...props,
      }}
    >
      {displaySearch === true && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            background: "white",
            zIndex: 1000,
            paddingTop: 1,
          }}
        >
          <CustomForm
            type="text"
            id="find-province"
            placeHolder="Search province..."
            onChange={() =>
              setProvinceInput(document.getElementById("find-province").value)
            }
          />
        </Box>
      )}
      {data
        .filter((e) => e.toLowerCase().includes(provinceInput.toLowerCase()))
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
                background: "rgba(53, 53, 53, 0.1)",
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
