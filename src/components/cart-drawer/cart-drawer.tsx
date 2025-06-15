"use client";

import { Drawer, Avatar, List, Typography, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useAppContext } from "@/context/context-provider";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    const { cart, total, addItemToCart, removeItemFromCart } = useAppContext();
    const { push } = useRouter();

    return (
        <Drawer
            title="Carrinho de Compras"
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={open}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={cart?.produtos || []}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <PlusCircleOutlined
                                    onClick={() => addItemToCart(item)}
                                />,
                                <MinusCircleOutlined
                                    onClick={() => removeItemFromCart(item)}
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.foto} />}
                                title={item.nome}
                            />
                            <Text strong>
                                R$ {item.preco.toString().replace(`.`, `,`)}
                            </Text>
                            <br />
                            <Text>{item.quantidade}</Text>
                        </List.Item>
                    )}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Title level={3}>
                        R$ {total?.toString().replace(".", ",")}
                    </Title>
                    <Button
                        type="primary"
                        onClick={() => push("/resumo")}
                        block
                    >
                        Finalizar compra
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};
