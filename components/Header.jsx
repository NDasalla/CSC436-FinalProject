"use client";

import ActionsHeader from "./ActionsHeader";

const Header = () => {
  return (
    <header
      className="
    h2 bg-purple text-white font-bold my-5
    flex justify-center items-center
    shadow-xl drop-shadow-lg border-seashell border-2"
    >
      <ActionsHeader />
    </header>
  );
};

export default Header;
