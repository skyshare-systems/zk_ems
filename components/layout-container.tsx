import React, { PropsWithChildren } from 'react'

const LayoutContainer = ({children}:PropsWithChildren) => {
  return (
    <div className="flex p-2 items-start gap-8 flex-1 self-stretch w-full overflow-hidden">
      {children}
    </div>
  );
}

export default LayoutContainer