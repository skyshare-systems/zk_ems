import React from 'react'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-50 flex-wrap  gap-4 w-full bg-background flex p-8 justify-between items-center shrink-0 self-stretch">
      <div className="flex  flex-wrap items-center justify-center gap-2 w-full lg:w-fit">
        <p className="ty-descriptions text-gold">
          ZK Summit{" "}
          <span className="text-white/50">• Email Marketing System</span>
        </p>
        <p className="ty-descriptions text-white/[.32]">
          &copy; All rights reserved 2025
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 w-full lg:w-fit">
        <p className="text-white/50 ty-descriptions">Need some help?</p>
        <p className="text-white/50 ty-descriptions">
          Contact an administrator.
        </p>
      </div>
    </footer>
  );
}

export default Footer