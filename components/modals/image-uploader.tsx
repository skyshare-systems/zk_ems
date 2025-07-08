import { companies } from "@/lib/constant";
import { cn, colorizeButton } from "@/lib/utils";
import { useCompanyStore } from "@/store/company";
import { insertImage$, usePublisher } from "@mdxeditor/editor";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { inter } from "@/public/fonts";
import CloudUpload from "../icons/cloud-upload";

const ImageUploader = () => {
  const insertImage = usePublisher(insertImage$);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { company } = useCompanyStore();

  // Validate + store file
  const handleFileChange = (selectedFile: File) => {
    if (!["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)) {
      toast.error("Invalid file format. Use .jpg, .png, or .gif.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB.");
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // Handle manual input selection
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFileChange(selectedFile);
  };

  // Handle drag & drop selection
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) handleFileChange(droppedFile);
  };

  // Upload to server
  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    if (!company) {
      toast.error("No company selected.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);
      formData.append("companyId", company.id);

      const response = await fetch("/api/attachments", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Upload failed.");

      const data = await response.json();
      setUploadedUrl(data.filepath);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Insert uploaded image into editor
  const handleUseImage = () => {
    if (uploadedUrl) {
      insertImage({
        src: uploadedUrl,
        altText: file?.name || "Uploaded image",
        title: file?.name || "Uploaded image",
      });
      // Reset state
      setFile(null);
      setPreviewUrl(null);
      setUploadedUrl(null);
      setOpenImageDialog(false);
    }
  };

  return (
    <>
      <Button
        className="bg-none shadow-none bg-transparent p-1 hover:bg-[#E0E1E6]"
        onClick={() => setOpenImageDialog(true)}
      >
        <ImageIcon size={20} />
      </Button>

      <Dialog
        open={openImageDialog}
        onOpenChange={() => setOpenImageDialog(false)}
      >
        <DialogTitle className="hidden">Upload an Image</DialogTitle>
        <DialogContent className="max-w-[420px] w-full flex flex-col items-start rounded-2xl bg-black border border-white/[.16]">
          <div className="flex flex-col gap-2 items-start">
            <h6
              className={cn(inter.className, "ty-subheading text-white_v2-100")}
            >
              Upload Image
            </h6>
            <p className="ty-descriptions text-white_v2-50">
              Upload an image first to attach to the document.
            </p>
          </div>

          {/* File input and upload */}
          <div className="flex flex-wrap items-center gap-2 self-stretch">
            <label
              title={file?.name}
              className="flex-1 break-all cursor-pointer bg-white/[.08] border border-white/[.08] rounded-lg px-3 py-2 text-white/50"
            >
              {file
                ? file.name.length > 40
                  ? `${file.name.substring(0, 23)}...`
                  : file.name
                : "Select an image"}
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleInputChange}
              />
            </label>
            <Button
              className="bg-white ty-title"
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>

          {/* Preview */}
          {previewUrl ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className="w-full flex justify-center items-center min-h-[212px]   border border-gray_v2-16 bg-gray_v2-4 py-[6px]"
            >
              <Image
                src={previewUrl}
                alt="Preview"
                width={200}
                height={200}
                unoptimized
                className="rounded-lg bg-white max-w-[250px] w-full"
              />
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                "w-full flex flex-col gap-1 items-center justify-center text-center  transition-colors  min-h-[212px] border border-gray_v2-16 bg-gray_v2-4 py-[6px] ",
                dragOver
                  ? "border-[#18365A] bg-[#18365A]/50"
                  : "border-[#f2f2f329] bg-[#f2f2f30A]",
              )}
            >
              <CloudUpload />
              <span
                className={cn(
                  inter.className,
                  "text-white_v2-50 ty-descriptions",
                )}
              >
                Upload photo here
                <br />
                Max Image Size: 5MB
                <br />
                Suggested Dimension: 128x128px
              </span>
            </div>
          )}

          {/* Use Image Button */}
          <Button
            disabled={!uploadedUrl}
            className={cn(
              "w-full text-white bg-[#18365A]",
              // colorizeButton(company?.name as companies),
            )}
            onClick={handleUseImage}
          >
            Use Image
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUploader;
