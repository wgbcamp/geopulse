import * as React from "react";

export function WeatherSunny20FilledIcon({
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
      <path d="M10 2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 10 2m4 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0m3.5.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zM10 16a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m-6.5-5.5a.5.5 0 0 0 0-1H2.463a.5.5 0 0 0 0 1zm.646-6.354a.5.5 0 0 1 .708 0l1 1a.5.5 0 1 1-.708.708l-1-1a.5.5 0 0 1 0-.708m.708 11.708a.5.5 0 0 1-.708-.708l1-1a.5.5 0 0 1 .708.708zm11-11.708a.5.5 0 0 0-.708 0l-1 1a.5.5 0 0 0 .708.708l1-1a.5.5 0 0 0 0-.708m-.708 11.708a.5.5 0 0 0 .708-.708l-1-1a.5.5 0 0 0-.708.708z"/>
    </svg>
  );
}
