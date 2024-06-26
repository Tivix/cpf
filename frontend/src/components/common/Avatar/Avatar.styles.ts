import styled, {css} from "styled-components";
import {AvatarSize} from "@app/components/common/Avatar/Avatar.interface";

export const Wrapper = styled.div<{size: AvatarSize}>`
  ${({size}) => css`
    width: ${size}px;
    height: ${size}px;
  `}
`;
