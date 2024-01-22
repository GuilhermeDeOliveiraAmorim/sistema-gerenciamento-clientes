import { Form, Button, message, List, Skeleton } from "antd";
import Input from "rc-input";
import { CustomerHttpGateway } from "./@core/infra/gateways/customer.http.gateway";
import { CreateCustomerUseCase } from "./@core/application/create.customer";
import { http } from "./util/http";
import { useEffect, useState } from "react";
import CustomerOrderModal from "./components/CustomerOrderModal";
import { Customer } from "./@core/domain/customer";
import InfiniteScroll from "react-infinite-scroll-component";
import { FindAllCustomersUseCase } from "./@core/application/find.all.customers";
import axios from "axios";

function App() {
  const [form] = Form.useForm();
  const [isModalVisible, setModalVisible] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();

      const gatewayCustomer = new CustomerHttpGateway(http);
      const createCustomer = new CreateCustomerUseCase(gatewayCustomer);

      await createCustomer.execute(
        values._email,
        values._name,
        values._phone,
        values._x,
        values._y
      );

      const findAllCustomers = new FindAllCustomersUseCase(gatewayCustomer);

      const updatedCustomers = await findAllCustomers.execute();

      setCustomers(updatedCustomers);

      message.success("Cliente cadastrado com sucesso!");
      form.resetFields();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        let errorMessage = "Erro ao cadastrar cliente. Verifique os campos.";

        if (axios.isAxiosError(error)) {
          // Tratamento específico para erros do Axios
          if (error.response?.data.messages) {
            errorMessage = error.response.data.messages
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((message: { detail: any }) => message.detail)
              .join(" ");
          }
        } else {
          // Outro tipo de erro
          console.error("Erro ao cadastrar cliente:", error);
        }

        console.error(errorMessage);
        message.error(errorMessage);
      } else {
        console.error("Erro ao cadastrar cliente:", error);
        message.error("Erro ao cadastrar cliente. Verifique os campos.");
      }
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const gatewayCustomer = new CustomerHttpGateway(http);
        const findAllCustomers = new FindAllCustomersUseCase(gatewayCustomer);
        setCustomers(await findAllCustomers.execute());
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.error("Erro ao obter clientes (Axios):", error.message);
          message.error("Erro ao obter clientes.");
        } else {
          console.error("Erro ao obter clientes:", error);
          message.error("Erro ao obter clientes.");
        }
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="p-4 bg-slate-100">
        <div className="h-16 flex justify-center align-middle content-center items-center">
          <Button onClick={handleOpenModal}>Mostrar Ordem de Visitação</Button>
          <CustomerOrderModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            customers={customers}
          />
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <div className="flex">
          <div className="w-1/2 p-4">
            <div className="bg-blue-500 h-16">
              <div className="bg-slate-100 p-4">
                <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                  <Form.Item
                    label="Nome"
                    name="_name"
                    rules={[
                      { required: true, message: "Por favor, insira o nome." },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="E-mail"
                    name="_email"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira o e-mail.",
                      },
                      { type: "email", message: "E-mail inválido." },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Telefone"
                    name="_phone"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira o telefone.",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Coordenada X"
                    name="_x"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira as coordenadas.",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    label="Coordenada Y"
                    name="_y"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira as coordenadas.",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="default" htmlType="submit">
                      Cadastrar
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="h-16">
              <h1>Lista de Clientes</h1>
              <InfiniteScroll
                dataLength={customers.length}
                next={() => {}}
                hasMore={false}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              >
                <List
                  dataSource={customers}
                  renderItem={(customer) => (
                    <List.Item>
                      <List.Item.Meta
                        title={customer._name}
                        description={`E-mail: ${customer._email._value}, Coordenadas: (${customer._coordinates._x}, ${customer._coordinates._y})`}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
