import { NavLink } from "react-router-dom";
import styled from "styled-components";

const DialogItem = (props) => {
  const path = "/dialogs/" + props.id;

  return (
    <Dialog>
      <NavLink to={path}>{props.name}</NavLink>
    </Dialog>
  );
};

export default DialogItem;

const Dialog = styled.div`
  & > a.active {
    color: gold;
  }
`;
