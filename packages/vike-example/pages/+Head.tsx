// https://vike.dev/Head

import React from "react";
import logoUrl from "../assets/logo.svg";

export default function HeadDefault(): React.JSX.Element {
  return (
    <>
      <link rel="icon" href={logoUrl} />
    </>
  );
}
