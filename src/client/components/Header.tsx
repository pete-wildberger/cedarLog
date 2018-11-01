import * as React from "react";
import { SVG } from "./Logo";

export const Header = () => {
  return (
    <div className="head">
      <SVG className="logo" name="logo" fill="#fff" />
    </div>
  );
};
