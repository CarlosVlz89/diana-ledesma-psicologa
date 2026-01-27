// src/components/ui/Section.jsx
import React from 'react';

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

export default Section;