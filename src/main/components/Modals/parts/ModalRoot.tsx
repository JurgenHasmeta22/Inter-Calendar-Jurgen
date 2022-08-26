import { useState, useEffect } from "react";
import ModalService from "../modals/services/ModalService";
//@ts-ignore
import styles from "../modals/styles/ModalRoot.css";

export default function ModalRoot() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    ModalService.on("open", ({ component, props }) => {
      setModal({
        component,
        props,

        close: (value) => {
          setModal(null);
        },
      });
    });
  }, []);

  const ModalComponent = modal?.component ? modal.component : null;

  return (
    <section className={modal?.component ? styles.modalRoot : ""}>
      {ModalComponent && (
        <ModalComponent
          {...modal.props}
          close={modal.close}
          className={ModalComponent ? "d-block" : ""}
        />
      )}
    </section>
  );
}
