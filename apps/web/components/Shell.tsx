import * as React from "react";
import Nav from "./Nav";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="px-6 sm:px-10 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gradient-to-br from-fuchsia-400/70 via-emerald-300/70 to-cyan-300/70 shadow-lg animate-pulse" />
          <div className="text-xl font-semibold tracking-tight">PatentAlchemy</div>
        </div>
        <Nav />
      </header>
      <main className="px-6 sm:px-10 pb-16 relative z-10">{children}</main>
      <footer className="px-6 sm:px-10 py-6 text-xs opacity-80 relative z-10">
        Built for Eco‑Innovation — GS1 Digital Link & EPCIS aligned; screening factors only.
      </footer>
      <div className="flowfield" aria-hidden />
    </div>
  );
}
