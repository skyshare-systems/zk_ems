import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { geist, inter } from "@/public/fonts";

const AddPhoto = () => {
  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <h2
          className={cn(
            geist.className,
            "min-w-[96px] ty-descriptions text-white_v2-32",
          )}
        >
          Photo
        </h2>

        {/* File input and upload */}
        <div className="flex flex-wrap items-center gap-2 self-stretch w-full">
          <label
            // title={file?.name}
            className={cn(
              geist.className,
              "flex-1 break-all cursor-pointer bg-white/[.08] border border-white/[.08] rounded-lg px-3 py-4 text-white_v2-100 ty-descriptions",
            )}
          >
            Select an image
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
              //   onChange={handleInputChange}
            />
          </label>
          <button
            className={cn(
              geist.className,
              "text-black-100 py-2 px-5 rounded-lg bg-white_v2-100 border-white_v2-8 self-stretch ty-descriptions text-black_v2-100",
            )}
            // onClick={handleUpload}
            // disabled={!file || loading}
          >
            Upload Image
            {/* {loading ? "Uploading..." : "Upload Image"} */}
          </button>
        </div>

        {/* Preview */}
        {/* {previewUrl && ( */}
        {/* <div
          // onDragOver={(e) => {
          //   e.preventDefault();
          //   setDragOver(true);
          // }}
          // onDragLeave={() => setDragOver(false)}
          // onDrop={handleDrop}
          className="w-full flex justify-center items-center min-h-[212px]   border border-gray_v2-16 bg-gray_v2-4 py-[6px]"
        >
          <Image
            // src={previewUrl}
            src=""
            alt="Preview"
            width={200}
            height={200}
            unoptimized
            className="rounded-lg bg-white max-w-[250px] w-full"
          />
        </div> */}
        {/* )} */}
      </div>
    </>
  );
};

export default AddPhoto;
