// CustomersList.tsx
import React, { useEffect, useState } from "react";
import { Button, List } from "antd";
import CustomerOrderModal from "./CustomerOrderModal";
import { CustomerHttpGateway } from "../@core/infra/gateways/customer.http.gateway";
import { http } from "../util/http";
import { FindAllCustomersUseCase } from "../@core/application/find.all.customers";
import { Customer } from "../@core/domain/customer";

const CustomersList: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  console.log("customers", customers);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const gatewayCustomer = new CustomerHttpGateway(http);
        const findAllCustomers = new FindAllCustomersUseCase(gatewayCustomer);
        setCustomers(await findAllCustomers.execute());
      } catch (error) {
        console.error("Erro ao obter clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Mostrar Ordem de Visitação</Button>
      <CustomerOrderModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        customers={customers}
      />
      <h1>Lista de Clientes</h1>
      <List
        dataSource={customers}
        renderItem={(customer) => (
          <List.Item>
            <List.Item.Meta
              title={customer._name}
              description={`E-mail: ${customer._email._value}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CustomersList;
