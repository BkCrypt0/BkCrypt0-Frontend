import IdentityCardUploader from "./IdentityCardUploader";
import KYCVue from "./index.vue";
import { applyPureVueInReact } from "veaury";
import { useSelector } from "react-redux";

export default function KYC() {
  const KYCConsole = applyPureVueInReact(KYCVue);
  const imageIDBase64 = useSelector(
    (state) => state.imageIDSlice.imageIDBase64
  );
  return (
    <div>
      <IdentityCardUploader />
      <KYCConsole imageIDBase64={imageIDBase64} />
    </div>
  );
}
