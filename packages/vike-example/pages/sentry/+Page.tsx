import React, { useCallback, useEffect, useState, type ComponentType } from "react";
import { getClient } from "@sentry/react";

function _ReactSentryErrorPage(): React.JSX.Element {
  const [sentryClientStatus, setSentryClientStatus] = useState({
    client_not_loaded: false,
    enabled: true,
    dsn_missing: false,
  });

  useEffect(() => {
    const options = getClient()?.getOptions();

    setSentryClientStatus({
      client_not_loaded: !options,
      dsn_missing: (options?.dsn?.length ?? 0) < 2,
      enabled: (options?.enabled ?? true) !== false,
    });
  }, []);

  const onClick = useCallback(() => {
    throw new Error(`This is a React SENTRY Browser Test! [${import.meta.env.DEV ? "DEV Mode" : "PROD Mode"}]`);
  }, []);

  return (
    <>
      <h1>Sentry Test Page</h1>

      {sentryClientStatus.client_not_loaded || sentryClientStatus.dsn_missing || !sentryClientStatus.enabled ? (
        <p style={{ color: "red" }}>
          <b>Sentry Config Error:</b>
          {sentryClientStatus.client_not_loaded ? "Client not loaded!" : ""}{" "}
          {!sentryClientStatus.client_not_loaded && sentryClientStatus.dsn_missing ? "DSN is missing! " : ""}
          {!sentryClientStatus.client_not_loaded && !sentryClientStatus.enabled ? "Client is not enabled! " : ""} Vite
          Mode: {import.meta.env.PROD ? "PROD" : "DEV"}
        </p>
      ) : null}

      <div>
        <button onClick={onClick}>Throw Javascript Error</button>
      </div>
    </>
  );
}

const ReactSentryErrorPage: ComponentType = React.memo(_ReactSentryErrorPage);

export default ReactSentryErrorPage;
