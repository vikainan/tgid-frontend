import { Card } from "antd";
import { Produto } from "@/models/Produto";
import { Button, Divider, Typography } from "antd";

const { Meta } = Card;
const { Text, Title } = Typography;

interface ProductCardProps {
    produto: Produto;
    setProduto: (produto: Produto) => void;
    handleModalVisible: (state: boolean) => void;
}

export const ProductCard = ({
    produto,
    setProduto,
    handleModalVisible,
}: ProductCardProps) => {
    return (
        <Card
            key={produto.id}
            hoverable
            style={{ width: 240, gap: 12 }}
            cover={<img src={produto.foto} />}
        >
            <Divider />
            <Meta title={produto.nome} description={produto.resumo} />
            <br />
            <Text strong>R$ {produto.preco.toString().replace(`.`, `,`)}</Text>
            <br />
            {produto?.quantidade && <Text>{produto?.quantidade}</Text>}
            <>
                <Button
                    onClick={() => {
                        handleModalVisible(true);
                        setProduto(produto);
                    }}
                >
                    Ver produto
                </Button>
            </>
        </Card>
    );
};
