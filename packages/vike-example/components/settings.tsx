import React, { memo } from "react";

import Card from "./card";
import InputBoxApiKey from "./input-box-api-key";
import SectionLanguage from "./section-language";
import ButtonLoadScript from "./button-load-script";

function Settings(): React.JSX.Element {
  return (
    <Card>
      <InputBoxApiKey />

      <p className="small">
        You can create new Google API key here:{" "}
        <a
          href="https://console.cloud.google.com/apis/credentials/key"
          // alt="google api key"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://console.cloud.google.com/apis/credentials/key
        </a>
      </p>

      <hr className="mt-0 mb-3" />

      <SectionLanguage />

      <hr className="mt-0 mb-3" />

      <ButtonLoadScript />
    </Card>
  );
}

export default memo(Settings);
