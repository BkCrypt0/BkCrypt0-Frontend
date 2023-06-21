import { useDispatch, useSelector } from "react-redux";
import { uploadImageID } from "src/redux/imageIDSlice";
import { createNewIdentity } from "src/redux/identitySlice";
import QrScanner from "qr-scanner";
import { useMediaQuery, Box, useTheme } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import CustomButton from "src/components/CustomButton";

function IdentityCardUploader({ activeStep, setActiveStep }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const theme = useTheme();

  const imageIDBase64 = useSelector(
    (state) => state.imageIDSlice.imageIDBase64
  );
  const dp = useDispatch();

  const handleExtractInformation = (textScan) => {
    const data = textScan.split("|");
    console.log(data);
    return {
      CCCD: data[0],
      name: data[2],
      dob: data[3],
      sex: data[4],
      birthPlace: data[5],
      expireDate: data[6],
    };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      var img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        QrScanner.scanImage(event.target.result)
          .then((result) => {
            console.log(result);
            const identity = handleExtractInformation(result);
            dp(
              createNewIdentity(
                accounts[activeAccount].publicKey,
                identity?.CCCD,
                identity?.name,
                identity?.sex,
                identity?.dob,
                identity?.birthPlace,
              )
            );
          })
          .catch((error) => console.log(error || "No QR code found."));
      };

      dp(uploadImageID(event.target.result));
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        display: activeStep === 0 ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!imageIDBase64 && (
        <>
          <input
            name="imageID"
            style={{
              opacity: 0,
              width: 0,
              height: 0,
              overflow: "hidden",
              position: "absolute",
              zIndex: -1,
            }}
            type="file"
            id="imageID"
            onChange={handleImageUpload}
          />
          <CustomButton>
            <label htmlFor="imageID">Tải ảnh lên</label>
          </CustomButton>
        </>
      )}
      {imageIDBase64 && (
        <Box
          sx={{
            padding: "7px",
            border: `2.5px dashed ${theme.colors.dark_2}`,
            borderRadius: "10px",
            boxSizing: "border-box",
            backgroundColor: theme.colors.light_1,
            marginBottom: 5,
          }}
        >
          <img
            src={imageIDBase64}
            alt="identity-card"
            width={mobile ? "100%" : "500px"}
            style={{
              aspectRatio: "16/9",
              borderRadius: "10px",
            }}
            height="auto"
          />
        </Box>
      )}
      {imageIDBase64 && (
        <CustomButton onClick={() => setActiveStep(activeStep + 1)}>
          Bước tiếp theo
        </CustomButton>
      )}
    </Box>
  );
}

export default IdentityCardUploader;
