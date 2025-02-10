import React, { PropsWithChildren } from 'react'

const ContainerSidebar = ({children}:PropsWithChildren) => {
  return (
      <div className="flex max-w-[320px] w-full min-w-[288px] flex-col items-start gap-4 self-stretch">
        {children}
      </div>

  )
}

export default ContainerSidebar