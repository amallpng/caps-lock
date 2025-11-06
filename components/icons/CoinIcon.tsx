import React from 'react';

const CoinIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        {/* Outline */}
        <path fill="#282828" d="M5,1h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V4h1V2h2V1z"/>
        {/* Shadow */}
        <path fill="#a26a45" d="M5,2h6v1h2v2h1v5h-1v1h-1v1H5v-1H4V4h1V2z"/>
        {/* Main fill */}
        <path fill="#f4d47c" d="M5,2h6v1h1v6h-1v1H5V2z"/>
        {/* Glint */}
        <path fill="#fef2d1" d="M6,3h2v2h-1v-1h-1z"/>
    </svg>
);

export default CoinIcon;
