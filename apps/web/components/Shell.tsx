import * as React from "react";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="px-6 sm:px-10 py-6 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-tight">PatentAlchemy</div>
        <div className="text-sm opacity-80">Patent → Passport in minutes</div>
      </header>
      <main className="px-6 sm:px-10 pb-16">{children}</main>
      <footer className="px-6 sm:px-10 py-6 text-xs opacity-70">
        Built for Eco-Innovation — GS1 Digital Link & EPCIS aligned; screening factors only.
      </footer>
    </div>
  );
}
