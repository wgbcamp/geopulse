import * as React from "react";

export function Options24FilledIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
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
      <path d="M8.75 14.5a3.25 3.25 0 0 1 3.163 2.5h9.337a.75.75 0 0 1 .102 1.493l-.102.007l-9.337.001a3.251 3.251 0 0 1-6.326 0L2.75 18.5a.75.75 0 0 1-.102-1.493L2.75 17h2.837a3.25 3.25 0 0 1 3.163-2.5M15.25 3a3.25 3.25 0 0 1 3.163 2.5h2.837a.75.75 0 0 1 .102 1.493L21.25 7l-2.837.001a3.252 3.252 0 0 1-6.326 0L2.75 7a.75.75 0 0 1-.102-1.493L2.75 5.5h9.337A3.25 3.25 0 0 1 15.25 3"/>
    </svg>
  );
}
