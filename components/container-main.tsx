import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

const ContainerMain = ({children}:PropsWithChildren) => {
  return (
      <div
            className={cn(
              "flex w-full flex-col items-center gap-[18px] flex-1 self-stretch",
            )}
          >
            {children}
          </div>
  )
}

export default ContainerMain