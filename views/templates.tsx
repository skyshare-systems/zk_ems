import ContainerMain from '@/components/container-main'
import ContainerSidebar from '@/components/container-sidebar'
import LayoutContainer from '@/components/layout-container'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const Templates = () => {
  return (
    <LayoutContainer>
      <ContainerSidebar>
        <p className="ty-subheading">Create new email</p>
        <Input placeholder="Search for a template" className="w-full" />
        <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-340px)] lg:h-[calc(100vh-300px)] w-full">
          <div className="flex flex-col items-start gap-2 flex-1 self-stretch rounded-lg">
          {/*   {templates?.data.templates.map((template) => (
              <TemplateSelection template={template} key={template.id} />
            ))}

            {templates?.data.templates.length === 0 && (
              <p className="ty-descriptions text-white/50">
                No templates found. Please contact the administrators first.
              </p>
            )} */}

          </div>
        </ScrollArea>
      </ContainerSidebar>

      <ContainerMain>test</ContainerMain>
    </LayoutContainer>
  );

}

export default Templates
