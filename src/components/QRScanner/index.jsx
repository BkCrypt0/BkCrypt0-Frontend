import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";
import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import CustomButton from "../CustomButton";
import { getChallenge } from "src/redux/proofSlice";
import { useDispatch } from "react-redux";
import qrCodeVideo from "src/assets/qr-code.mp4";

function QR({ isScanning, setIsScanning, setShowBackdrop, setOpenDialog }) {
  const [scanner, setScanner] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [cameraIndex, setCameraIndex] = useState(0);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const dp = useDispatch();

  function exitQRReader() {
    setShowBackdrop(true);
  }

  useEffect(() => {
    const html5QR = new Html5Qrcode("zk-elite-qr-reader");
    setScanner(html5QR);
    Html5Qrcode.getCameras().then((devices) => {
      if (devices.length >= 2) {
        setCameraIndex(1);
      }
      setCameras(devices?.map((item) => item.id) || []);
    });
  }, []);

  useEffect(() => {
    if (cameras.length > 0 && scanner && isScanning) {
      scanner?.start(
        { deviceId: cameras[cameraIndex] },
        {
          fps: 2,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText, decodedResult) => {
          scanner?.stop();
          setOpenDialog(true);
          dp(getChallenge(decodedText));
          exitQRReader();
        },
        () => {}
      );
    }
    return () => {
      if (scanner?.isScanning) {
        scanner?.stop();
      }
    };
  }, [scanner, isScanning, cameras, cameraIndex]);
  return (
    <Box
      sx={{
        maxWidth: mobile ? "100%" : "500px",
        position: "relative",
        marginInline: "auto",
      }}
    >
      <div
        id="zk-elite-qr-reader"
        width="300px"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          src={qrCodeVideo}
          width="200px"
          height="200px"
          autoPlay
          loop
          id="QRVideo"
        >
          Your browser does not support the video tag.
        </video>
        <CustomButton onClick={() => setIsScanning(true)}>
          Quét mã để xác minh
        </CustomButton>
      </div>
    </Box>
  );
}

export default QR;
