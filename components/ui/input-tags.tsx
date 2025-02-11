"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XIcon, Upload } from "lucide-react";
import { InputProps } from "./icon-input";
import { cn } from "@/lib/utils";

type InputTagsProps = Omit<InputProps, "value" | "onChange"> & {
  value: string[];
  onChange: (value: string[]) => void;
};

const MAX_VISIBLE_TAGS = 5;

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState("");
    const [showAll, setShowAll] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    };

    const processEmails = (input: string) => {
      const emails = input
        .split(/[\s,;]+/) // Split on spaces, commas, and semicolons
        .map((email) => email.trim())
        .filter((email) => email.length > 0 && isValidEmail(email));

      if (emails.length > 0) {
        // Create a new Set with new emails first, then add existing ones
        const newDataPoints = new Set([...emails, ...value]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        processEmails(text);
      };
      reader.readAsText(file);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        processEmails(pendingDataPoint);
      } else if (
        e.key === "Backspace" &&
        pendingDataPoint.length === 0 &&
        value.length > 0
      ) {
        e.preventDefault();
        // Remove the first item when backspace is pressed
        onChange(value.slice(1));
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("Text");
      processEmails(pastedData);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          processEmails(text);
        };
        reader.readAsText(file);
      }
    };

    const visibleTags = showAll ? value : value.slice(0, MAX_VISIBLE_TAGS);
    const hiddenCount = value.length - MAX_VISIBLE_TAGS;

    const handleRemoveEmail = (emailToRemove: string) => {
      onChange(value.filter((email) => email !== emailToRemove));
    };

    return (
      <div
        className={cn(
          "relative has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neutral-950 has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-neutral-300 min-h-10 flex w-full flex-wrap gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-[#26282b] dark:ring-offset-neutral-950",
          className
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-2 w-full">
          <input
            className="bg-transparent flex-1 min-w-[150px] outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
            placeholder="Enter or paste emails..."
            value={pendingDataPoint}
            onChange={(e) => {
              setPendingDataPoint(e.target.value);
              if (e.target.value.includes(",")) {
                processEmails(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            {...props}
            ref={ref}
          />

          <input
            type="file"
            accept=".csv,.txt"
            className="hidden"
            ref={fileInputRef}
            onChange={handleCSVUpload}
          />

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => fileInputRef.current?.click()}
            title="Upload CSV or TXT file"
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleTags.map((item) => (
            <Badge key={item} variant="secondary">
              {item}
              <Button
                variant="outline"
                size="icon"
                className="ml-2 h-3 w-3"
                onClick={() => handleRemoveEmail(item)}
              >
                <XIcon className="w-3" />
              </Button>
            </Badge>
          ))}

          {hiddenCount > 0 && !showAll && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => setShowAll(true)}
            >
              +{hiddenCount} more
            </Badge>
          )}
        </div>
      </div>
    );
  }
);

InputTags.displayName = "InputTags";

export { InputTags };
