import Dialog from "@corvu/dialog";
import { VsTrash } from "solid-icons/vs";
import { Component } from "solid-js";
import "../../css/util/DeleteButton.css";

type DeleteButtonProps = {
  onDelete: () => void;
};

const DeleteButton: Component<DeleteButtonProps> = (props) => {
  return (
    <Dialog>
      <Dialog.Trigger class="dialog-trigger">
        <VsTrash size={25} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog-overlay" />
        <Dialog.Content class="dialog-container">
          <Dialog.Label style={{ "font-size": "larger" }}>
            Are you sure?
          </Dialog.Label>
          <button
            onClick={() => props.onDelete()}
            class="dialog-button delete-button"
          >
            Delete
          </button>
          <Dialog.Close class="dialog-button cancel-button">
            Cancel
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default DeleteButton;
