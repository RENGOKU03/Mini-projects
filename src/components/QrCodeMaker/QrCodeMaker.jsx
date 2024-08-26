import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";

const QrCodeMaker = () => {
  const [qrCode, setQrCode] = useState("Chetan");
  const inputTag = useRef();

  const handelGenerateQR = () => {
    setQrCode(inputTag.current.value);
    inputTag.current.value = "";
  };
  return (
    <div className="snap-start h-screen bg-violet-600 flex flex-col gap-10 items-center overflow-hidden">
      <h1 className="text-5xl font-semibold text-center px-10 pt-3">
        QRCode Generator
      </h1>
      <div className="mt-10 h-16 text-2xl w-1/2 flex justify-center gap-5 ">
        <input
          type="text"
          ref={inputTag}
          className="h-full min-w-96 rounded-3xl px-5 hover:border-black active:border-black outline-none border-white border-2"
          placeholder="Set Value..."
        />
        <button
          onClick={handelGenerateQR}
          className="h-full px-5 bg-purple-900  rounded-full text-white hover:-translate-y-2 "
        >
          Generate
        </button>
      </div>

      <div>
        <QRCode value={qrCode} size={350} bgColor="white" />
      </div>
    </div>
  );
};

export default QrCodeMaker;
