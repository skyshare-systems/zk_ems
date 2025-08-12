import CancelIcon from "@/components/icons/cancel";
import DoneIcon from "@/components/icons/done";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import { useModalCreateGroup } from "@/store/modal-create-group";
import React from "react";
import InputColor from "react-input-color";

const CreateGroupModal = () => {
  const { isOpen, onOpen, onClose } = useModalCreateGroup((store) => store);
  const [color, setColor] = React.useState<{ hex: string } | null>(null);

  const presets = [
    "#F4C430",
    "#F28C28",
    "#E94B3C",
    "#E91E63",
    "#9C27B0",
    "#2196F3",
    "#26C6DA",
    "#2ECC71",
  ];

  const currentHex = color?.hex?.toLowerCase() ?? "";

  // Conditional rendering for the modal, but hooks are always called above.
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-black_v2-32 backdrop-blur w-full h-full z-[3]">
      <div className="flex flex-col items-start justify-start p-8 gap-4 max-w-[500px] w-full grow rounded-lg border border-white_v2-16 bg-black_v2-100">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-start w-full">
            <h3
              className={cn(inter.className, "text-white_v2-100 ty-subheading")}
            >
              Create a Group
            </h3>
            <button onClick={onClose}>
              <CancelIcon />
            </button>
          </div>
          <p
            className={cn(geist.className, "ty-descriptions text-white_v2-50")}
          >
            Organize subscribers into a new mailing group.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full">
          <p
            className={cn(
              geist.className,
              "ty-descriptions text-white_v2-32 whitespace-nowrap min-w-[96px]",
            )}
          >
            Group Name
          </p>
          <Input
            placeholder="Enter your group name here.."
            className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
          />
        </div>

        <div className="flex items-center gap-2 w-full">
          <p
            className={cn(
              geist.className,
              "ty-descriptions text-white_v2-32 whitespace-nowrap min-w-[96px]",
            )}
          >
            Group Tag
          </p>
          <div className="relative grow">
            <div className="flex items-center gap-2 absolute top-1/2 left-3 transform -translate-y-1/2">
              <p
                className={cn(
                  geist.className,
                  "text-white_v2-72 ty-descriptions",
                )}
              >
                @
              </p>
              <div className="bg-white_v2-16 w-[1px] h-[29.068px]"></div>
            </div>
            <Input
              placeholder="Tag name here."
              className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow py-3 pr-3 pl-11"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <p
            className={cn(
              geist.className,
              "ty-descriptions text-white_v2-32 whitespace-nowrap min-w-[96px]",
            )}
          >
            Group Tag
          </p>
          <div className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              {presets.map((hex) => {
                const preset = hex.toLowerCase();
                const isActive = currentHex === preset;
                return (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => setColor({ hex: preset })}
                    className={cn(
                      "w-[34.5px] h-[34.5px] rounded flex items-center justify-center transition",
                    )}
                    style={{ backgroundColor: preset }}
                    aria-label={`Pick ${hex}`}
                  >
                    {isActive && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="14"
                        viewBox="0 0 17 14"
                        fill="none"
                      >
                        <path
                          d="M1.25 9.16284L4.75 12.6628L15.25 1.66284"
                          stroke="#000205"
                          stroke-width="1.5"
                          stroke-linecap="square"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1">
              <InputColor
                initialValue={color?.hex.toString() ?? ""}
                onChange={(v: any) => setColor({ hex: v?.hex || "#F4C430" })}
                placement="right"
              />
              <p
                className={cn(
                  geist.className,
                  "text-white_v2-50 ty-descriptions",
                )}
              >
                {color?.hex.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <p
            className={cn(
              geist.className,
              "ty-descriptions text-white_v2-32 whitespace-nowrap min-w-[96px]",
            )}
          >
            Recipients
          </p>
          <Input
            placeholder="Add a recipient here.."
            className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
          />
        </div>

        <div className="flex justify-end w-full gap-2">
          <button
            type="submit"
            className={cn(
              geist.className,
              "text-gold_v2-100 flex items-center gap-2  py-3 px-4 ty-descriptions rounded border border-gold_v2-16 bg-gold_v2-4 ease-out duration-300 hover:bg-gold_v2-100 hover:text-black_v2-100",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M6 7.82965L6 1.38965M4 3.16313L6 1.16298L8 3.16313"
                stroke="currentColor"
              />
              <path
                d="M11.3333 9.16309L10.6666 11.1631H1.33329L0.666626 9.16309"
                stroke="currentColor"
              />
            </svg>
            Done
          </button>
          <button
            type="submit"
            className={cn(
              geist.className,
              "bg-gold_v2-100 text-black_v2-100 flex items-center gap-2 rounded py-3 px-4 ty-descriptions ease-out duration-300 hover:opacity-50",
            )}
          >
            <DoneIcon />
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
