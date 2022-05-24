import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ModalBody(props: Props) {
  return <div>{props.children}</div>;
}