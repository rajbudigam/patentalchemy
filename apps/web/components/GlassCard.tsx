import * as React from "react";

export default function GlassCard({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className="card rounded-xl2 shadow-glass p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold tracking-tight">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}
