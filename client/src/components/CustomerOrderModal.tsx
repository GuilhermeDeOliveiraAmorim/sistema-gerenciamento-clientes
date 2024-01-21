// CustomerOrderModal.tsx
import React from "react";
import { Modal, List } from "antd";
import { Customer } from "../@core/domain/customer";

interface CustomerOrderModalProps {
  visible: boolean;
  onClose: () => void;
  customers: Customer[];
}

const CustomerOrderModal: React.FC<CustomerOrderModalProps> = ({
  visible,
  onClose,
  customers,
}) => {
  return (
    <Modal
      title="Ordem de Visitação"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <List
        dataSource={customers}
        renderItem={(customer, index) => (
          <List.Item>
            <strong>{index + 1}.</strong> {customer._name} -{" "}
            {customer._email._value}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default CustomerOrderModal;
