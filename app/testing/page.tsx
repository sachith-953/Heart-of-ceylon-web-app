'use client';

import ChildComponent from '@/components/testing/ChildComp';
import { useState } from 'react';

const ParentComponent = () => {
    
  const [parentData, setParentData] = useState('Initial Parent Data');
  const [childData, setChildData] = useState('');

  //this handle by child component
  const handleChildDataChange = (newChildData: string) => {
    setChildData(newChildData);
    console.log("child is calling")
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Parent Data: {parentData}</p>
      <p>Child Data: {childData}</p>
      <ChildComponent
        parentData={parentData} // pass data to child
        onChildDataChange={handleChildDataChange} //with this, child can call parent functions(as i understand)
      />
    </div>
  );
};

export default ParentComponent;