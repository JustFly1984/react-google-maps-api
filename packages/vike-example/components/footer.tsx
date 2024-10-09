import React, { memo } from "react";

function Footer(): React.JSX.Element {
  return (
    <footer className="footer">
      <div className="text-secondary small">2019 React Google Maps API</div>
    </footer>
  );
}

export default memo(Footer);
