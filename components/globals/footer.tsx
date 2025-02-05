import React from 'react'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-50 w-full bg-background flex p-8 justify-between items-center shrink-0 self-stretch">
      <div className="flex items-center gap-2">
        <p className="ty-descriptions text-gold">
          ZK Summit{" "}
          <span className="text-white/50">• Email Marketing System</span>
        </p>
        <p className="ty-descriptions text-white/[.32]">
          &copy; All rights reserved 2025
        </p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <p className='text-white/50 ty-descriptions'>Need some help?</p>
        <p className='text-white/50 ty-descriptions'>Contact an administrator.</p>
      </div>
    </footer>
  );
}

export default Footer