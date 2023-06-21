import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { SCREEN_SIZE, FS } from "src/constants";
import SignMessageDialog from "src/components/SignMessageDialog";
import { getAgeInput } from "src/service/utils";
import { handleCalculateAgeProof } from "src/redux/proofSlice";
import { useSnackbar } from "notistack";
import QRScanner from "src/components/QRScanner";
import VerifyResultDialog from "../../ProofTest/VerifyResultDialog";
import { verifyProof } from "src/contract";

export default function AgeProof({ proof }) {
  const identity = useSelector((state) => state.identitySlice.identity);
  const [openDialog, setOpenDialog] = useState(false);
  const [res, setRes] = useState(false);
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);

  const [click, setClick] = useState(false);
  const challenge = useSelector((state) => state.proofSlice.challenge);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const generateAgeProofStatus = useSelector(
    (state) => state.proofSlice.generateAgeProofStatus
  );
  const ageProof = useSelector((state) => state.proofSlice.ageProof);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (generateAgeProofStatus === FS.SUCCESS && click === true) {
      enqueueSnackbar("Create proof successfully!", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      setOpenDialog(false);
      // history.push("/home/proofs");
    } else if (generateAgeProofStatus === FS.FAILED) {
      enqueueSnackbar("Create proof failed", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateAgeProofStatus]);

  const date = () => {
    var timestamp = Math.floor(Date.now() / 1000);
    var currentDate = new Date();
    var date = {
      currentYear: currentDate.getUTCFullYear(),
      currentMonth: currentDate.getUTCMonth() + 1,
      currentDay: currentDate.getUTCDate(),
      expireTime: timestamp + 600,
    };
    return date;
  };

  const serverInfo = { ...proof, ...{ challenge: 100 } };

  const startVerifyProof = async () => {
    console.log(ageProof);
    const res = await verifyProof({
      optionName: "VERIFIER_AGE",
      pi_a: [
        JSON.parse(ageProof?.proof).pi_a[0],
        JSON.parse(ageProof?.proof).pi_a[1],
      ],
      pi_b: [
        [
          JSON.parse(ageProof?.proof).pi_b[0][1],
          JSON.parse(ageProof?.proof).pi_b[0][0],
        ],
        [
          JSON.parse(ageProof?.proof).pi_b[1][1],
          JSON.parse(ageProof?.proof).pi_b[1][0],
        ],
      ],
      pi_c: [
        JSON.parse(ageProof?.proof).pi_c[0],
        JSON.parse(ageProof?.proof).pi_c[1],
      ],
      input: JSON.parse(ageProof?.input),
    });
    if (res === -1) {
      enqueueSnackbar("Verification failed due to some errors", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
    } else {
      console.log(res);
      setRes(res);
      setOpenVerifyDialog(true);
    }
  };

  useEffect(() => {
    if (ageProof !== undefined) {
      console.log(ageProof);
      startVerifyProof();
    }
  }, [ageProof]);

  return (
    <>
      <VerifyResultDialog
        open={openVerifyDialog}
        res={res}
        onClose={() => setOpenVerifyDialog(false)}
      />
      <SignMessageDialog
        loading={generateAgeProofStatus === FS.FETCHING}
        setClick={setClick}
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
        handler={async () => {
          if (identity !== undefined) {
            const input = getAgeInput({
              serverInfo: serverInfo,
              currentYear: date().currentYear,
              currentMonth: date().currentMonth,
              currentDay: date().currentDay,
              minAge: Number(challenge?.minAge),
              maxAge:
                challenge?.maxAge !== "" ? Number(challenge?.maxAge) : 100,
              expireTime: date().expireTime,
              infoObject: identity,
              privateKey: accounts[activeAccount]?.privateKey,
            });
            dp(handleCalculateAgeProof(input));
          }
        }}
      />
      <QRScanner
        setOpenDialog={setOpenDialog}
        isScanning={isScanning}
        setIsScanning={setIsScanning}
      />
    </>
  );
}
