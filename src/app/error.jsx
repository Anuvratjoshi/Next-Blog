"use client";
import React from "react";

export default function ErrorBoundary({ error, reset }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>{error.message}</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
