'use client';

import CreateNewEmail from '@/views/create-new-email';
import Templates from '@/views/templates';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const TabRenderer = () => {


  const searchParams = useSearchParams();
  const tab = searchParams.get('t');

  function renderLayout() {
    switch(tab) {
      case 'create-new-email':
        return <CreateNewEmail />
      case 'templates':
        return <Templates />
      case 'analytics':
        return  <div>analytics</div>
      case 'address-book':
        return <div>address-book</div>;
      default:
        return  <div>Create New Email 2</div>
    }
  }
  
  return <>{renderLayout()}</>;
}

export default TabRenderer