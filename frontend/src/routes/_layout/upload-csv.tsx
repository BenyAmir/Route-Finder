import { uploadFile } from "@/api/uploadFile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToken } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_layout/upload-csv")({
  component: UploadCsvPage,
});

function UploadCsvPage() {
  const token = useToken();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { isSuccess, isPending, mutate, error, isError } = useMutation({
    mutationFn: (file: File) => {
      if (!file) throw new Error("No file selected");
      return uploadFile(file, token);
    },
    onSuccess: (data) => {
      navigate({ to: "/departures" });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      mutate(selectedFile);
    }
  };

  return (
    <div className="w-full min-w-sm max-w-md p-8 bg-card rounded-lg shadow h-[20rem] flex flex-col justify-between items-center">
      <h1 className="text-2xl font-bold mb-6">Upload CSV</h1>
      <div className="grid gap-2">
        <Input
          type="file"
          id="file"
          autoFocus
          onChange={handleFileSelect}
          disabled={isPending}
        />

        {isError && (
          <div className="text-destructive text-sm">{error.message}</div>
        )}

        {isSuccess && <p>Upload successful!</p>}

        <Button
          className="w-full"
          onClick={handleUpload}
          disabled={!selectedFile || isPending}
        >
          {isPending ? (
            <div className="flex items-center">
              <LoaderCircle
                size={16}
                className="animate-spin cursor-pointer text-red-500 hover:text-red-700 text-sm"
              />
            </div>
          ) : (
            "upload"
          )}
        </Button>
      </div>
    </div>
  );
}
