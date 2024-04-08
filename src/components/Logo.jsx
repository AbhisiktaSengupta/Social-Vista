import React from 'react'

function Logo({ width = '200px', height = 'auto' }) {
  return (
    <div>
      <img src='./src/simplified-background-remover.png' width={width} height={height} alt="Logo" />
    </div>
  );
}

export default Logo