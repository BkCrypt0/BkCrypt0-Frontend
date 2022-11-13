import CustomForm from "src/components/CustomForm";
import CustomButton from "src/components/CustomButton";
import { Box, useMediaQuery } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";

export default function CreateIdentity({ clickCreate, setClickCreate }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  return (
    <Box width="100%" sx={{ display: clickCreate === true ? "block" : "none" }}>
      <CustomTypography variant="h5">Fill in your identity</CustomTypography>
      <Box
        width={mobile ? "100%" : tablet ? "70%" : "50%"}
        sx={{
          paddingY: 3,
        }}
      >
        <CustomForm
          label="Name"
          type="text"
          id="name"
          placeHolder="Your name..."
        />
        <CustomForm
          label="Gender"
          type="text"
          id="gender"
          placeHolder="Male / Female"
        />
        <CustomForm
          label="Date of birth"
          type="text"
          id="dob"
          placeHolder="DD/MM/YYYY..."
        />
        <CustomForm label="Birth place" />
      </Box>
      <Box width="100%" display="flex" alignItems="center">
        <CustomButton minHeight="50px" minWidth="150px" mr={3}>
          <CustomTypography buttonText={true}>Submit</CustomTypography>
        </CustomButton>
        <CustomButton
          minHeight="50px"
          minWidth="150px"
          onClick={() => setClickCreate(false)}
        >
          <CustomTypography buttonText={true}>Discard</CustomTypography>
        </CustomButton>
      </Box>
    </Box>
  );
}
