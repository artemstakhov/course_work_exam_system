import React from 'react';

const ResultBlock = ({ percentage }) => {
  const leftPercentage = percentage;
  const rightPercentage = 100 - percentage;

  return (
    <div className='result_block' style={{ display: 'flex', height: '22px', position: 'relative' }}>
      <div style={{ flex: `1 0 calc(${leftPercentage}% - 1px)`, maxWidth: percentage === 0 ? '0' : undefined, background: 'green' }}>
        {percentage > 0 && percentage < 100 && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: 'white' }}>{percentage}%</div>
        )}
      </div>
      <div style={{ flex: `1 0 calc(${rightPercentage}% - 1px)`, maxWidth: percentage === 100 ? '0' : undefined, background: 'red' }}>
        {/* {percentage > 0 && percentage < 100 && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: 'white' }}>{rightPercentage}%</div>
        )} */}
      </div>
    </div>
  );
};

  
export default ResultBlock;
