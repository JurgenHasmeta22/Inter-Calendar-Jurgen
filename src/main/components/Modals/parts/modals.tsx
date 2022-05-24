import "../modals/styles/ModalRoot.css";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Modal(props: Props) {

  return (

    <div className="modal-wrapper">
        
      <div className="modal-container">
        <div className="modal-body">{props.children}</div>
      </div>

    </div>

  );

}