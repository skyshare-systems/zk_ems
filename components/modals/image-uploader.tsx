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

const ImageUploader = () => {
  const insertImage = usePublisher(insertImage$);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { company } = useCompanyStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (
        !["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)
      ) {
        toast.error("Invalid file format. Use .jpg, .png, or .gif.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB.");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

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
      formData.append("companyId", company?.id);

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

  const handleUseImage = () => {
    if (uploadedUrl) {
      insertImage({
        src: uploadedUrl,
        altText: file?.name || "Uploaded image",
        title: file?.name || "Uploaded image",
      });
      // Clear the state to unfocus the image after it's used
      setFile(null);
      setPreviewUrl(null);
      setUploadedUrl(null);
      setOpenImageDialog(false);
    }
  };

  return (
    <>
      <Button
        className={cn(
          "bg-none shadow-none bg-transparent p-1 hover:bg-[#E0E1E6]",
        )}
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
          <h6 className="ty-h6 text-white">Upload Image</h6>
          <p className="ty-subtitle text-white/50">
            Upload an image first to attach to the document.
          </p>

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
                onChange={handleFileChange}
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

          {previewUrl && (
            <div className="w-full flex justify-center my-3">
              <Image
                src={previewUrl}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          )}

          <Button
            disabled={!uploadedUrl}
            className={cn(
              "w-full text-white",
              colorizeButton(company?.name as companies),
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
