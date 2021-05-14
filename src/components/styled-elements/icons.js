import React from "react";
import styled from "styled-components/macro";
import { Heart, ThumbsUp, ThumbsDown } from "react-feather";

const icons = {
  heart: Heart,
  "thumbs-up": ThumbsUp,
  "thumbs-down": ThumbsDown,
};

const Icon = ({ id, color, size, strokeWidth, ...delegated }) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > svg {
    display: block;
    stroke-width: ${(p) =>
      p.strokeWidth !== undefined ? p.strokeWidth + "px" : undefined};
  }
`;

export default Icon;
