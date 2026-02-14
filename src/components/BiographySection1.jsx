"use client";

import styled from "styled-components";

/* ================= STYLES ================= */

const BioWrapper = styled.section`
  background: #f8fbff;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
//   box-shadow: 0 15px 30px rgba(0, 86, 179, 0.08);
  border: 1px solid rgba(0, 86, 179, 0.1);
`;

const BioHeader = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BioTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0056b3;
  margin: 0;
`;

const BioDivider = styled.div`
  width: 60px;
  height: 4px;
  background: #0056b3;
  border-radius: 2px;
  margin-top: 6px;
`;

const BioContent = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: #111827;
  margin: 0;
  white-space: pre-line; /* preserves line breaks */
`;

const BioQuote = styled.span`
  display: block;
  font-style: italic;
  color: #374151;
  margin-top: 1rem;
`;

/* ================= COMPONENT ================= */

export default function BiographySection1({ bio }) {
  if (!bio) return null;

  return (
    <BioWrapper>
      <BioHeader>
        <BioTitle>Biography</BioTitle>
        <BioDivider />
      </BioHeader>
      <BioContent>
        {bio}
        {/* Optional: you can highlight a quote or key line */}
        {/* <BioQuote>"Turning ideas into interactive experiences"</BioQuote> */}
      </BioContent>
    </BioWrapper>
  );
}