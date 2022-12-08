import React from "react";
import { LayoutOptions } from "../layouts";

const routeConfig = [
  {
    path: "/login",
    exact: true,
    component: React.lazy(() => import("../pages/Login")),
    layout: LayoutOptions.BLANK,
  },
  {
    path: "/import-mnemonic",
    exact: true,
    component: React.lazy(() => import("../pages/ImportAccount")),
    layout: LayoutOptions.BLANK,
  },
  {
    path: "/import-private-key",
    exact: true,
    component: React.lazy(() => import("../pages/ImportPrivateKey")),
    layout: LayoutOptions.BLANK,
  },
  {
    path: "/register",
    exact: true,
    component: React.lazy(() => import("../pages/Register")),
    layout: LayoutOptions.BLANK,
  },
  {
    path: "/welcome",
    exact: true,
    component: React.lazy(() => import("../pages/LandingPage")),
    layout: LayoutOptions.BLANK,
  },
  {
    path: "/home/identity",
    exact: true,
    component: React.lazy(() => import("../pages/HomePage/Identity")),
    layout: LayoutOptions.MAIN,
  },
  {
    path: "/home/identity-manager",
    exact: true,
    component: React.lazy(() => import("../pages/HomePage/IdentityManager")),
    layout: LayoutOptions.MAIN,
  },
  {
    path: "/home/issue-identity",
    exact: true,
    component: React.lazy(() => import("../pages/HomePage/IssueNewIdentity")),
    layout: LayoutOptions.MAIN,
  },
  {
    path: "/home/proofs",
    exact: true,
    component: React.lazy(() => import("../pages/HomePage/Proofs")),
    layout: LayoutOptions.MAIN,
  },

  {
    path: "/home/proof-creation",
    exact: true,
    component: React.lazy(() => import("../pages/HomePage/ProofCreation")),
    layout: LayoutOptions.MAIN,
  },
  {
    path: "/home/proof-test",
    exact: true,
    component: React.lazy(() => import("../pages/HomePage/ProofTest")),
    layout: LayoutOptions.MAIN,
  },
  {
    path: "/home/my-account",
    exact: true,
    component: React.lazy(() => import("../pages/HomePage/MyAccount")),
    layout: LayoutOptions.MAIN,
  },
];

export default routeConfig;
