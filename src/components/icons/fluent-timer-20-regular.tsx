import * as React from "react";

export function Timer20RegularIcon({
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
      <path d="M7.5 2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm7.656 1.929a.5.5 0 1 0-.707.707l1.414 1.414a.5.5 0 1 0 .707-.707zM9.5 6a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5m0 12a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0-1a6 6 0 1 1 0-12a6 6 0 0 1 0 12"/>
    </svg>
  );
}
