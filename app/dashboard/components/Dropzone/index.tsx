"use client";

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";

interface Props {
  onAnalyze: (file: File) => Promise<void>;
  onLoading: boolean;
  isInvalidFormat: boolean;
  setIsInvalidFormat: Dispatch<SetStateAction<boolean>>;
}

const acceptedFileExtension = ["xls", "xlsx", "xlsb"];

export default function FileDropzone({
  onAnalyze,
  onLoading,
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
      onAnalyze(acceptedFiles[0]);
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
    disabled: onLoading,
  });

  return (
    <div
      {...getRootProps({
        className: `text-center cursor-pointer bg-secondary h-80 flex flex-col justify-center items-center ${
          onDrag ? "border-accent" : "border-greyLight"
        }  border-4 border-dashed`,
      })}
    >
      <input disabled {...getInputProps()} />
      <span className="italic font-montserratBold">
        {onLoading
          ? "Uploading... please wait a moment"
          : "Drag and drop your file or click here to upload"}
      </span>
      {isInvalidFormat && (
        <p className="text-red-500">
          Please use valid file format, you can use our template by clicking
          <span className="font-montserratBold"> "Download Template" </span>
          button above
        </p>
      )}
      <span className="text-accent">{fileName}</span>
    </div>
  );
}
