"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  name: string;
  employeeId: string;
  title: string;
  department: string;
  location?: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  accessLevel: string[];
  photo?: string;
  company?: "Meta" | "Stanford" | "Google" | "NVIDIA";
}

export default function EmployeeBadge({
  name,
  employeeId,
  title,
  department,
  location,
  startDate,
  endDate,
  achievements,
  accessLevel,
  photo,
  company = "Meta",
}: BadgeProps) {
  const companyColors = {
    Meta: {
      accent: "bg-blue-600",
      accentBorder: "border-blue-600",
      accentText: "text-blue-600",
      shadowColor: "rgb(37,99,235)",
      rightBorder: "border-r-blue-600",
      bottomBorder: "border-b-blue-600",
    },
    Stanford: {
      accent: "bg-red-600",
      accentBorder: "border-red-600",
      accentText: "text-red-600",
      shadowColor: "rgb(220,38,38)",
      rightBorder: "border-r-red-600",
      bottomBorder: "border-b-red-600",
    },
    Google: {
      accent: "bg-green-600",
      accentBorder: "border-green-600",
      accentText: "text-green-600",
      shadowColor: "rgb(22,163,74)",
      rightBorder: "border-r-green-600",
      bottomBorder: "border-b-green-600",
    },
    NVIDIA: {
      accent: "bg-lime-500",
      accentBorder: "border-lime-500",
      accentText: "text-lime-500",
      shadowColor: "rgb(118,185,0)",
      rightBorder: "border-r-lime-500",
      bottomBorder: "border-b-lime-500",
    },
  };

  const colors = companyColors[company];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-2 border-foreground bg-background w-full h-full relative"
      style={{ boxShadow: `8px 8px 0px 0px ${colors.shadowColor}` }}
    >
      {/* Right accent border with black border - matches shadow position */}
      <div
        className={`absolute ${colors.accent} border-2 border-foreground`}
        style={{ right: "-10px", top: "-2px", bottom: "-10px", width: "8px" }}
      ></div>
      {/* Bottom accent border with black border - matches shadow position */}
      <div
        className={`absolute ${colors.accent} border-2 border-foreground`}
        style={{ bottom: "-10px", left: "-2px", right: "-10px", height: "8px" }}
      ></div>

      {/* Badge Header - Company Logo Area */}
      <div className="bg-foreground text-background px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 bg-background flex items-center justify-center border-2 ${colors.accentBorder} overflow-hidden`}
          >
            {company === "Meta" ? (
              <img src="/meta.png" alt="Meta" className="w-full h-full object-contain p-1" />
            ) : company === "NVIDIA" ? (
              <span className="text-[9px] font-black tracking-tighter text-[#76B900]">NV</span>
            ) : company === "Google" ? (
              <svg viewBox="0 0 48 48" className="w-full h-full p-1" role="img" aria-label="Google">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            ) : (
              <img
                src="/stanford.png"
                alt="Stanford"
                className="w-full h-full object-contain p-1"
              />
            )}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">{company}</p>
            <p className="text-[10px] opacity-90">
              {company === "Stanford" ? "Research ID Card" : "Employee ID Card"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] opacity-90">ID: {employeeId}</p>
        </div>
      </div>

      {/* Badge Body */}
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          {/* Photo Area */}
          <div className="flex-shrink-0">
            <div className="w-20 h-24 bg-muted/10 flex items-center justify-center overflow-hidden">
              {photo ? (
                <img src={photo} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-2">
                  <div className="w-12 h-12 bg-foreground/10 rounded-full mx-auto mb-1"></div>
                  <p className="text-[8px] text-muted">PHOTO</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-space)" }}>
              {name}
            </h3>
            <p className="text-xs font-semibold text-muted mb-1">{title}</p>
            <p className="text-[10px] text-muted mb-2">{department}</p>
            <div className="border-t border-border pt-2 mt-2">
              {location && (
                <p className="text-[9px] text-muted">
                  <span className="font-semibold">Location:</span> {location}
                </p>
              )}
              <p className="text-[9px] text-muted">
                <span className="font-semibold">Tenure:</span> {startDate} - {endDate}
              </p>
            </div>
          </div>
        </div>

        {/* Access Level Badges */}
        <div className="border-t border-border pt-3 mb-3">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted mb-2">
            Access Level
          </p>
          <div className="flex flex-wrap gap-1.5">
            {accessLevel.map((level) => (
              <span
                key={level}
                className={`text-[8px] px-2 py-0.5 border ${colors.accentBorder} bg-background font-semibold uppercase`}
              >
                {level}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="border-t border-border pt-3 mb-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted mb-2">
              Key Achievements
            </p>
            <ul className="space-y-1.5">
              {achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="text-[10px] text-foreground flex items-start gap-2"
                >
                  <span className="text-foreground mt-0.5">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
