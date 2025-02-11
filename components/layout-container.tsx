import React, { PropsWithChildren } from 'react'

const LayoutContainer = ({children}:PropsWithChildren) => {
  return (
    <div className="flex p-2 items-start gap-8 ">
      {children}
    </div>
  );
}

export default LayoutContainer