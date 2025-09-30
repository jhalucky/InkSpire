"use client";

export default function Editor({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start writing..."
      className="w-full h-48 p-3 border border-border rounded-md"
    />
  );
}
