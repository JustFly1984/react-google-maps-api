import React, { memo, PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default memo<PropsWithChildren>(Card);
