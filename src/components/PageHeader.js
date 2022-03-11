import React from "react";
import "../styles/pageHeader.scss";

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <p className="page-header__sub-title">{subtitle}</p>
    </div>
  );
}
