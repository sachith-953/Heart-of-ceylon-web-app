'use client';

import { useState } from 'react';

//  the shape of the props that the ChildComponent expects to receive from its parent component.
interface ChildProps {
  parentData: string;
  onChildDataChange: (newChildData: string) => void;
  //this defines a property called onChildDataChange that is a function type. 
  //The function takes a single parameter newChildData of type string and returns nothing (indicated by void). 
  //This property represents a callback function that the child component will call to pass data back to the parent component.
}

const ChildComponent: React.FC<ChildProps> = ({ parentData, onChildDataChange,}) => {

  const [childData, setChildData] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChildData = event.target.value; // get data from input tag
    setChildData(newChildData);
    onChildDataChange(newChildData);
  };

  return (
    <div className='bg bg-yellow-600'>
      <h2>Child Component</h2>
      <p>Parent Data: {parentData}</p>
      <input
        type="text"
        className='border-2 border-red-300'
        value={childData}
        onChange={handleInputChange}
        placeholder="Enter child data"
      />
    </div>
  );
};

export default ChildComponent;