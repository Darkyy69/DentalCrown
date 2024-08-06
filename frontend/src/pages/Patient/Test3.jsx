import React, { useState } from 'react';
import './test3.css';
import teethImage from '../assets/teeth.png';  // Ensure the correct path to the image

const teethNumbers = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
];

const rows_width = [
    71.5,74,73,41,40,41,39,44,44,39,41,40,41,73,73,73,
    81,77,77,41,41,40,34,33,34,33,41,41,40,77,77,81, 
]

const Test3 = () => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);

  const handleToothClick = (index) => {
    console.log('You clicked tooth number', index);
    if (selectedTeeth.includes(index)) {
      setSelectedTeeth(selectedTeeth.filter((i) => i !== index));
    } else {
      setSelectedTeeth([...selectedTeeth, index]);
    }
  };

  const renderTeeth = (teeth) => {
    return teeth.map((tooth) => {
      const isSelected = selectedTeeth.includes(tooth);
      return (
        <div
          key={tooth}
          className={`tooth ${isSelected ? 'selected' : ''}`}
          onClick={() => handleToothClick(tooth)}
          style={{width: rows_width[teethNumbers.indexOf(tooth)]}}
        />
      );
    });
  };

  return (
    <div className='test'>
    <div className="teeth-container" style={{ backgroundImage: `url(${teethImage})` }}>
      <div className="row">
        {renderTeeth(teethNumbers.slice(0, 8))}
        {renderTeeth(teethNumbers.slice(8, 16))}
      </div>
      <div className="row">
        {renderTeeth(teethNumbers.slice(16, 24))}
        {renderTeeth(teethNumbers.slice(24, 32))}
      </div>
    </div>
    </div>
  );
};

export default Test3;
