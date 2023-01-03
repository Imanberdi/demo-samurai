const Message = (props) => {
  return (
    <div>
      <div id={props.id}>{props.message}</div>
    </div>
  );
};
export default Message;
