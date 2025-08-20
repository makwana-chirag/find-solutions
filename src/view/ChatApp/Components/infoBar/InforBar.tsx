import "./InforBar.css";
export const InforBar = ({ room }: { room: string }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">Closed</a>
      </div>
    </div>
  );
};
