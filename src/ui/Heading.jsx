import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${({ type }) => {
    type === "h1" &&
      css`
        font-size: 3.2rem;
      `;
  }}
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-900);
  line-height: 1.2;
  margin: 0;
`;

export default Heading;
