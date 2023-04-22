import "../App.css";
function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={props.handleClose}>
          X
        </button>
        <div className="popup-content">{props.children}</div>
      </div>
    </div>
  );
}
export default Popup;
