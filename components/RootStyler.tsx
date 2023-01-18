'use client';

interface IRootStylerProps {
  settings: Record<string, any> | null;
}

export default function RootStyler({ settings }: IRootStylerProps) {
  console.log({ settings });
  return (
    <style jsx global>
      {`
        :root {
          --bs-primary-rgb: rgb(${settings?.themeColorRGB});
        }
      `}
    </style>
  );
}
