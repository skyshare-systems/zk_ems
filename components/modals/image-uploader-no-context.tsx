"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { cn, colorizeButton } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useCompanyStore } from "@/store/company";
import { companyConfig } from "@/config/company";
import slugify from "slugify";

type Props = {
  onUploadComplete: (url: string) => void;
};

const ImageUploader = ({ onUploadComplete }: Props) => {
  const { company } = useCompanyStore();
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!["image/jpeg", "image/png", "image/gif"].includes(selected.type)) {
      toast.error("Only JPG, PNG, or GIF files are allowed.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file || !company) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "filename",
        slugify(file.name, { lower: true, replacement: "_" }),
      );
      formData.append("companyId", company.id);

      const res = await fetch("/api/attachments", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUploadedUrl(data.filepath);
      toast.success("Upload successful");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUseImage = () => {
    if (!uploadedUrl) return;
    onUploadComplete(uploadedUrl);
    setOpenImageDialog(false);
    setFile(null);
    setPreviewUrl(null);
    setUploadedUrl(null);
  };

  if (!company) return null;

  return (
    <>
      <Button
        className={cn(
          colorizeButton(company.name),
          "shadow-none  px-3 py-2 hover:bg-opacity-90",
        )}
        onClick={() => setOpenImageDialog(true)}
      >
        <ImageIcon size={20} color="white" />
        <p className="text-white">Upload Photo</p>
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
            className={cn("w-full text-white", colorizeButton(company.name))}
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
