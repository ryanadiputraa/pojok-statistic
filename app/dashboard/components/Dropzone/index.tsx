"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onSubmit: (file: File) => Promise<void>;
  isLoading: boolean;
  isInvalidFormat: boolean;
  setIsInvalidFormat: (status: boolean) => void;
}

const acceptedFileExtension = ["xls", "xlsx", "xlsb"];

export default function FileDropzone({
  onSubmit,
  isLoading,
  isInvalidFormat,
  setIsInvalidFormat,
}: Props) {
  const [fileName, setFileName] = useState<string>("");
  const [onDrag, setOnDrag] = useState<boolean>(false);

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    const fileExt = acceptedFiles[0].name.split(".").pop() ?? "";
    setOnDrag(false);
    if (acceptedFileExtension.includes(fileExt)) {
      setFileName(acceptedFiles[0].name);
      setIsInvalidFormat(false);
      onSubmit(acceptedFiles[0]);
    } else {
      setFileName("");
      setIsInvalidFormat(true);
    }
  }, []);

  const onDragEnter = useCallback(() => setOnDrag(true), []);
  const onDragLeave = useCallback(() => setOnDrag(false), []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps({
        className: `text-center cursor-pointer bg-secondary h-80 flex flex-col justify-center items-center ${
          onDrag ? "border-accent" : "border-grey-light"
        }  border-4 border-dashed`,
      })}
    >
      <input disabled {...getInputProps()} />
      <span className="italic font-montserrat-bold">
        {isLoading
          ? "Analyzing... please wait a moment, this may take a while"
          : "Drag and drop your file or click here to upload"}
      </span>
      {isInvalidFormat && (
        <p className="text-red-500">
          Please use valid file format, you can use our template by clicking
          <span className="font-montserrat-bold"> "Download Template" </span>
          button above
        </p>
      )}
      <span className="text-accent">{fileName}</span>
    </div>
  );
}
