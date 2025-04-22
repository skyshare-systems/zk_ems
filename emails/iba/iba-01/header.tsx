import { Img, Section } from "@react-email/components";
import React from "react";

const Header = () => {
  return (
    <Section className="my-0 mx-auto w-full object-cover">
      <Img
        src={`https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/header.png`}
        width="100%"
        height="100%"
        alt="Skyshare Labs"
        className="object-cover w-full"
      />
    </Section>
  );
};

export default Header;
