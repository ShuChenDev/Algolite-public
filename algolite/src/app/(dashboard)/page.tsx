"use client"
import { useState, useEffect } from "react";

import MainMaster from "@/components/MainMaster";
import Popup from "@/components/Popup";


export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <>

      <MainMaster />

      <Popup show={showPopup} onClose={() => setShowPopup(false)} />

    </>
  );
}
