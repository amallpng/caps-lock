import React from 'react';

// A collection of 16 monochrome green, pixel-art style avatars.
// Color Palette:
const C1 = '#d3efd3'; // lightest
const C2 = '#9bbc9b'; // medium-light
const C3 = '#4a6b4a'; // medium-dark
const C4 = '#1f3b1f'; // darkest

const PixelAvatar1: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C3} width="24" height="24"/>
    <path fill={C2} d="M7 9H17V19H15V20H9V19H7V9Z"/>
    <path fill={C4} d="M6 5H18V6H19V9H17V8H7V9H5V6H6V5ZM7 10H8V11H7V10ZM16 10H17V11H16V10ZM9 15H11V16H9V15ZM7 19H9V20H7V19ZM15 19H17V20H15V19Z"/>
    <path fill={C1} d="M6 6H9V7H6V6ZM10 6H12V7H10V6ZM7 9H9V10H7V9ZM15 9H17V10H15V9Z"/>
  </svg>
);

const PixelAvatar2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C3} width="24" height="24"/>
    <path fill={C2} d="M6 9H18V19H17V20H7V19H6V9Z"/>
    <path fill={C4} d="M8 6H16V7H18V9H6V7H8V6ZM8 10H9V11H8V10ZM15 10H16V11H15V10ZM8 15H16V16H8V15ZM10 17H14V18H10V17Z"/>
    <path fill={C1} d="M16 7H17V8H16V7ZM7 7H8V8H7V7ZM6 10H8V11H6V10ZM16 10H18V11H16V10ZM9 16H15V17H9V16Z"/>
  </svg>
);

const PixelAvatar3: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C3} width="24" height="24"/>
    <path fill={C2} d="M6 9H18V19H17V20H8V19H6V9Z"/>
    <path fill={C4} d="M9 4H11V5H14V6H18V9H6V6H9V4ZM8 10H9V11H8V10ZM15 10H16V11H15V10ZM11 15H13V16H11V15Z"/>
    <path fill={C1} d="M11 4H14V5H11V4ZM6 6H9V7H6V6ZM14 6H18V7H14V6ZM6 9H8V10H6V9ZM16 9H18V10H16V9Z"/>
  </svg>
);

const PixelAvatar4: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C2} width="24" height="24"/>
    <path fill={C3} d="M6 9H18V19H17V20H8V19H6V9Z"/>
    <path fill={C4} d="M8 5H18V11H16V10H11V11H8V5ZM9 12H10V13H9V12ZM14 12H15V13H14V12ZM10 16H14V17H10V16Z"/>
  </svg>
);

const PixelAvatar5: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C2} width="24" height="24"/>
    <path fill={C3} d="M8 9H17V19H16V20H9V19H8V9Z"/>
    <path fill={C4} d="M9 5H16V6H17V9H8V6H9V5ZM5 12H7V14H5V12ZM9 11H10V12H9V11ZM15 11H16V12H15V11ZM11 15H14V16H11V15Z"/>
    <path fill={C1} d="M6 12H7V13H6V12Z"/>
  </svg>
);

const PixelAvatar6: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C2} width="24" height="24"/>
    <path fill={C3} d="M6 9H18V19H17V20H7V19H6V9Z"/>
    <path fill={C4} d="M8 6H16V7H18V9H6V7H8V6ZM8 11H9V12H8V11ZM15 11H16V12H15V11ZM10 16H14V17H10V16Z"/>
    <path fill={C1} d="M8 6H9V7H8V6ZM10 6H11V7H10V6ZM12 6H13V7H12V6ZM14 6H15V7H14V6ZM7 7H8V8H7V7ZM9 7H10V8H9V7ZM11 7H12V8H11V7ZM13 7H14V8H13V7ZM15 7H16V8H15V7Z"/>
  </svg>
);

const PixelAvatar7: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C3} width="24" height="24"/>
    <path fill={C2} d="M8 12H16V18H15V19H9V18H8V12Z"/>
    <path fill={C4} d="M6 7H18V8H19V11H17V12H7V11H5V8H6V7ZM8 12H16V14H8V12ZM10 16H14V17H10V16Z"/>
    <path fill={C1} d="M9 13H15V14H9V13Z"/>
  </svg>
);

const PixelAvatar8: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C3} width="24" height="24"/>
    <path fill={C2} d="M7 9H17V18H16V19H8V18H7V9Z"/>
    <path fill={C4} d="M6 6H18V9H17V8H7V9H6V6ZM7 10H10V11H7V10ZM14 10H17V11H14V10ZM11 10H13V12H11V10ZM7 12H9V13H7V12ZM15 12H17V13H15V12ZM9 15H15V16H9V15Z"/>
    <path fill={C1} d="M8 11H9V12H8V11ZM15 11H16V12H15V11Z"/>
  </svg>
);

const PixelAvatar9: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C1} width="24" height="24"/>
    <path fill={C2} d="M7 10H17V19H16V20H8V19H7V10Z"/>
    <path fill={C4} d="M8 6H16V7H17V10H7V7H8V6ZM7 11H10V12H7V11ZM14 11H17V12H14V11ZM11 11H13V13H11V11ZM7 13H9V14H7V13ZM15 13H17V14H15V13ZM9 16H15V17H9V16Z"/>
  </svg>
);

const PixelAvatar10: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C2} width="24" height="24"/>
    <path fill={C3} d="M6 9H18V19H17V20H7V19H6V9Z"/>
    <path fill={C4} d="M9 6H15V7H17V9H7V7H9V6ZM8 10H9V11H8V10ZM15 10H16V11H15V10ZM10 14H14V15H10V14ZM11 16H13V18H11V16Z"/>
  </svg>
);

const PixelAvatar11: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C2} width="24" height="24"/>
    <path fill={C3} d="M6 11H18V19H17V20H7V19H6V11Z"/>
    <path fill={C4} d="M6 7H18V8H20V10H4V8H6V7ZM9 8H15V11H9V8ZM8 12H9V13H8V12ZM15 12H16V13H15V12ZM11 16H13V17H11V16Z"/>
    <path fill={C1} d="M10 8H14V9H10V8Z"/>
  </svg>
);

const PixelAvatar12: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C3} width="24" height="24"/>
    <path fill={C2} d="M5 9H19V19H18V20H6V19H5V9Z"/>
    <path fill={C4} d="M7 6H17V7H19V9H5V7H7V6ZM7 10H8V11H7V10ZM16 10H17V11H16V10ZM9 15H15V16H9V15Z"/>
  </svg>
);

const PixelAvatar13: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C1} width="24" height="24"/>
    <path fill={C2} d="M7 9H17V14H18V19H16V20H8V19H6V14H7V9Z"/>
    <path fill={C4} d="M8 6H16V7H17V9H7V7H8V6ZM7 10H10V11H7V10ZM14 10H17V11H14V10ZM11 10H13V12H11V10ZM7 12H9V13H7V12ZM15 12H17V13H15V12ZM6 14H18V15H6V14ZM7 16H17V18H7V16Z"/>
  </svg>
);

const PixelAvatar14: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C2} width="24" height="24"/>
    <path fill={C3} d="M6 9H18V19H17V20H7V19H6V9Z"/>
    <path fill={C4} d="M7 5H17V6H18V7H19V9H5V7H6V6H7V5ZM8 10H9V11H8V10ZM15 10H16V11H15V10ZM9 15H15V16H9V15Z"/>
  </svg>
);

const PixelAvatar15: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C2} width="24" height="24"/>
    <path fill={C3} d="M6 9H18V19H17V20H7V19H6V9Z"/>
    <path fill={C4} d="M8 6H16V7H18V9H6V7H8V6ZM8 10H9V11H8V10ZM15 10H16V11H15V10ZM9 15H10V16H9V15ZM14 15H15V16H14V15ZM10 16H14V17H10V16Z"/>
  </svg>
);

const PixelAvatar16: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <rect fill={C4} width="24" height="24"/>
    <path fill={C2} d="M8 10H16V17H15V18H9V17H8V10Z"/>
    <path fill={C3} d="M6 7H18V8H19V10H5V8H6V7Z"/>
  </svg>
);

export const avatarComponents: { [key: string]: React.FC<{ className?: string }> } = {
  pixel1: PixelAvatar1,
  pixel2: PixelAvatar2,
  pixel3: PixelAvatar3,
  pixel4: PixelAvatar4,
  pixel5: PixelAvatar5,
  pixel6: PixelAvatar6,
  pixel7: PixelAvatar7,
  pixel8: PixelAvatar8,
  pixel9: PixelAvatar9,
  pixel10: PixelAvatar10,
  pixel11: PixelAvatar11,
  pixel12: PixelAvatar12,
  pixel13: PixelAvatar13,
  pixel14: PixelAvatar14,
  pixel15: PixelAvatar15,
  pixel16: PixelAvatar16,
};

export const avatarOptions = Object.keys(avatarComponents);
