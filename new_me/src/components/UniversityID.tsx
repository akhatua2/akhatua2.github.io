"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface UniversityIDProps {
  name: string;
  studentId: string;
  degree: string;
  department: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  statusBadges: string[];
  photo?: string;
  university: "Stanford" | "UIUC";
  gpa?: string;
}

export default function UniversityID({
  name,
  studentId,
  degree,
  department,
  location,
  startDate,
  endDate,
  highlights,
  statusBadges,
  photo,
  university,
  gpa,
}: UniversityIDProps) {
  const universityColors = {
    Stanford: {
      // Cardinal Red: #8C1515
      accent: "#8C1515",
      accentBorder: "#8C1515",
      accentText: "#8C1515",
      shadowColor: "rgb(140,21,21)",
      headerBg: "#FFF5F5", // Light red tint
      headerText: "#8C1515",
    },
    UIUC: {
      // Illini Orange: #FF5F05, Illini Blue: #13294B
      accent: "#FF5F05",
      accentBorder: "#FF5F05",
      accentText: "#FF5F05",
      shadowColor: "rgb(255,95,5)",
      headerBg: "#13294B", // Illini Blue background
      headerText: "#FFFFFF", // White text on blue
      blue: "#13294B", // Illini Blue
    },
  };

  const colors = universityColors[university];
  const barcodeRef = useRef<SVGSVGElement>(null);
  
  // URL to encode in barcode
  const barcodeUrl = "https://www.linkedin.com/in/arpandeepkhatua/";
  
  // Generate barcode on mount
  useEffect(() => {
    if (barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, barcodeUrl, {
          format: "CODE128",
          width: 2,
          height: 160,
          displayValue: false,
          background: "transparent",
          lineColor: colors.accent,
        });
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    }
  }, [colors.accent, barcodeUrl]);
  
  // Calculate expiration date (typically 4-5 years from start for undergrad, 2-3 for grad)
  const getExpirationDate = () => {
    if (endDate === "Present") {
      return "Valid Until Graduation";
    }
    // For completed degrees, show graduation year + 1
    const gradYear = endDate.includes("2022") ? "2023" : "2026";
    return `Expires: ${gradYear}`;
  };


  // Format date for "Issued" field
  const formatIssueDate = () => {
    if (startDate.includes("Sep")) return "09/01/" + startDate.split(" ")[1];
    if (startDate.includes("Aug")) return "08/15/" + startDate.split(" ")[1];
    return startDate;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-background w-full relative overflow-hidden"
      style={{ 
        borderRadius: '8px',
        border: '1px solid #e5e5e5',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      {/* Top Section: Stripe + University Name */}
      <div 
        className="flex items-center relative"
        style={university === "UIUC" ? { backgroundColor: colors.headerBg } : {}}
      >
        {/* Thin accent stripe on left */}
        <div 
          className="h-3 flex-shrink-0"
          style={{ 
            width: '12px',
            backgroundColor: colors.accent 
          }}
        ></div>
        {/* University name */}
        <div className="flex-1 px-3 py-2">
          <p 
            className="text-sm font-semibold"
            style={{ 
              color: university === "UIUC" ? colors.headerText : colors.accentText,
              fontFamily: 'Georgia, serif'
            }}
          >
            {university === "Stanford" ? "Stanford University" : "University of Illinois Urbana-Champaign"}
          </p>
        </div>
      </div>

      {/* Main Card Body - Horizontal Layout */}
      <div className="px-4 pb-4">
        {/* Row 1: Name/ID/Student and Logo */}
        <div className="flex gap-4 items-start">
          {/* Left: Name, ID, Student */}
          <div className="flex-1">
            <p className="text-base font-semibold mb-0.5 text-foreground">
              {name}
            </p>
            <p 
              className="text-2xl font-bold mb-0.5"
              style={{ color: colors.accentText }}
            >
              {studentId}
            </p>
            <p className="text-sm text-muted" style={{ marginBottom: 0, marginTop: 0, lineHeight: '1', paddingBottom: 0 }}>Student</p>
          </div>
          {/* Right: Logo */}
          <div className="flex-shrink-0 w-24 flex items-start justify-center">
            <div className="w-24 h-24 flex items-center justify-center">
              {university === "Stanford" ? (
                <img src="/stanford.png" alt="Stanford" className="w-full h-full object-contain" />
              ) : (
                <img src="/illinois.png" alt="UIUC" className="w-full h-full object-contain" />
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Photo and Barcode */}
        <div className="flex gap-4 items-end" style={{ marginTop: '-16px' }}>
          {/* Left: Photo */}
          <div className="w-24 h-28 bg-muted/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            {photo ? (
              <img src={photo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-2">
                <div className="w-16 h-20 bg-foreground/10 mx-auto mb-1"></div>
                <p className="text-[8px] text-muted">PHOTO</p>
              </div>
            )}
          </div>
          {/* Right: Barcode - bottom-right aligned */}
          <div className="flex-1 h-24 flex flex-col justify-end items-end">
            <svg ref={barcodeRef} className="h-12 w-64" />
          </div>
        </div>

        {/* Bottom Section: Issued Date and Degree */}
        <div className="mt-1 pt-2 border-t border-foreground/20">
          <div className="flex items-center justify-between gap-4">
            {/* Left Side: Issued Date */}
            <div>
              <span className="text-xs text-muted">Issued </span>
              <span className="text-xs font-semibold text-foreground">{formatIssueDate()}</span>
            </div>
            {/* Right Side: Degree */}
            <div className="text-xs text-muted">
              {degree}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

