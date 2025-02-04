import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DragDropUploader = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
      <input {...getInputProps()} />
      <p>Dosyanızı buraya sürükleyin veya tıklayarak seçin.</p>
    </div>
  );
};

export default DragDropUploader;
