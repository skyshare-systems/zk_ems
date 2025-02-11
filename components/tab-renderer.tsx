'use client';

import SentEmails from '@/views/sent-emails';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'

const CreateNewEmail = dynamic(() => import("@/views/create-new-email"), {
  ssr: false,
});

const Templates = dynamic(() => import("@/views/templates"), { ssr: false });


const TabRenderer = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('t');

  function renderLayout() {
    switch(tab) {
      case 'create-new-email':
        return <CreateNewEmail />
      case 'sent-emails':
        return <SentEmails />
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
  
  return <Suspense fallback={null}>{renderLayout()}</Suspense>;
}

export default TabRenderer