import { Produto } from "@/models/Produto";
import { Divider, Image, Modal, Typography } from "antd";

const { Text, Title } = Typography;

interface ProductModalProps {
    open: boolean;
    handleVisible: (state: boolean) => void;
    produto?: Produto;
    handleAddToCart: (produto?: Produto) => void;
}

export const ProductModal = ({
    open,
    handleVisible,
    produto,
    handleAddToCart,
}: ProductModalProps) => {
    return (
        <Modal
            open={open}
            afterOpenChange={(open) => {
                handleVisible(open);
            }}
            onCancel={() => {
                handleVisible(false);
            }}
            onOk={() => handleAddToCart(produto)}
            okText="Adicionar ao carrinho"
            cancelText="Voltar"
        >
            <Image width={200} src={produto?.foto} />
            <Divider />
            <Title level={4}>{produto?.nome}</Title>
            <Text strong>R$ {produto?.preco.toString().replace(`.`, `,`)}</Text>
            <br />
            <Text italic>{produto?.descricao}</Text>
        </Modal>
    );
};
