import { Img, Section } from "@react-email/components";
import React from "react";

const Header = () => {
  return (
    <Section className="my-0 mx-auto max-w-[640px] w-full object-cover">
      <Img
        src={`https://your-skin.sgp1.cdn.digitaloceanspaces.com/header.png`}
        width="100%"
        height="100%"
        alt="Your Skin School Of Integrated Aesthetics"
        className="object-cover w-full"
      />
    </Section>
  );
};

export default Header;
