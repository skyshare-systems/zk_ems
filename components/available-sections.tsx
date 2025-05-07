"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { SectionType } from "@/emails/utils";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sectionLabels: Record<SectionType, string> = {
  fromThePeople: "From The People",
  articles: "Articles",
  upcomingPrograms: "Upcoming Programs",
  products: "Products",
  services: "Our Services",
  posts: "Recent Posts",
};

const AvailableSectionSelector = () => {
  const { sectionOrder, setSectionOrder } = useCreateEmailStore();

  const handleToggleSection = (section: SectionType) => {
    if (sectionOrder.includes(section)) {
      // Remove from sectionOrder
      setSectionOrder(sectionOrder.filter((s) => s !== section));
      // Add back to availableSections
    } else {
      // Add to sectionOrder
      setSectionOrder([...sectionOrder, section]);
      // Remove from availableSections
    }
  };

  // All possible sections
  const allSections = Object.keys(sectionLabels) as SectionType[];

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="ty-descriptions text-black/50">Available Sections</p>

      {allSections.length === 0 ? (
        <p className="text-sm text-gray-500">No sections available</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-3">
            {allSections.map((section) => {
              const isSelected = sectionOrder.includes(section);

              return (
                <button
                  key={section}
                  onClick={() => handleToggleSection(section)}
                  className={cn(
                    "relative group flex gap-2 items-center justify-between px-3 py-2 rounded-md  transition-all",
                    "bg-gray-50 hover:bg-gray-100 text-gray-800 ",
                    isSelected ? "ring-1 ring-offset-1" : "hover:scale-105",
                  )}
                >
                  <p className="ty-descriptions text-sm text-black/50">
                    {sectionLabels[section]}
                  </p>
                  {isSelected && (
                    <span className="flex items-center justify-center rounded-full bg  shadow-sm bg-white p-1">
                      <Check className="h-3 w-3" color="green" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableSectionSelector;
