"use client";

import { useAppContext } from "@/context/context-provider";
import { Divider, Typography, List, Avatar } from "antd";

const { Text, Title } = Typography;

export default async function ResumoPage() {
    const { cart, total } = useAppContext();

    return (
        <div>
            <Title level={1}>Resumo da Compra</Title>
            <Divider />
            <List
                itemLayout="horizontal"
                dataSource={cart.produtos}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.foto} />}
                            title={item.nome}
                            description={item.preco}
                        />
                    </List.Item>
                )}
            />
            <Divider />
            <Text strong>R$ {total?.toString().replace(".", ",")}</Text>
        </div>
    );
}
