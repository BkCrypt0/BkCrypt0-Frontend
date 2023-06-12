import KYCVue from "./index.vue";
import { applyPureVueInReact } from "veaury";

export default function KYC() {
  const KYCConsole = applyPureVueInReact(KYCVue);

  return (
    <div>
      <KYCConsole />
    </div>
  );
}
