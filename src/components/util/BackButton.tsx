import { A } from "@solidjs/router";
import { FaSolidArrowLeft } from "solid-icons/fa";
import { Component } from "solid-js";

import "../../css/util/BackButton.css";

const BackButton: Component = () => {
  return (
    <A href="../">
      <FaSolidArrowLeft size={30} class="back-button a-disable" />
    </A>
  );
};

export default BackButton;
