"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
      >
        <h1>🛑 Studio Disabled in Production</h1>
        <p style={{ color: "#888" }}>
          The Sanity Studio is available only in local development.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
