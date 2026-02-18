import * as React from "react";

export function Scales20RegularIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3.5 3a.5.5 0 1 0 0 1h.75L2.077 9.215a1 1 0 0 0-.075.405a3 3 0 0 0 5.996 0a1 1 0 0 0-.075-.405L5.75 4H9.5v10H6a2 2 0 1 0 0 4h8a2 2 0 0 0 0-4h-3.5V4h3.75l-2.173 5.215a1 1 0 0 0-.075.405a3 3 0 0 0 5.996 0a1 1 0 0 0-.075-.405L15.75 4h.75a.5.5 0 0 0 0-1zM5 11.5A2 2 0 0 1 3.063 10h3.874A2 2 0 0 1 5 11.5m0-6.7L6.75 9h-3.5zM6 15h8a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2m10.75-6h-3.5L15 4.8zm-3.687 1h3.874a2.001 2.001 0 0 1-3.874 0"/>
    </svg>
  );
}
