import styled from "styled-components";

export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

export const Tab = styled.button`
  
`;

export const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;
