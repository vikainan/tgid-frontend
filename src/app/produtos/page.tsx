"use client";

import { Card } from "antd";
import { Produto } from "@/models/Produto";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import { useAppContext } from "@/context/context-provider";
import { ProductModal } from "@/components/product-modal/product-modal";
import { ProductCard } from "@/components/product-card/product-card";

const { Meta } = Card;
const { Text, Title } = Typography;

export default function ProdutosPage() {
    const { addItemToCart, produtos, setProdutos } = useAppContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [produto, setProduto] = useState<Produto>();

    useEffect(() => {
        fetch("http://localhost:3001/produtos")
            .then((response) => response.json())
            .then((data) => {
                setProdutos(data);
            });
    }, []);

    const handleAddToCart = (produto?: Produto) => {
        if (produto) {
            addItemToCart(produto);
        }
        setModalVisible(false);
    };

    return (
        <div>
            <Title level={1}>Produtos</Title>
            <ul
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "space-evenly",
                }}
            >
                {produtos?.map((produto) => (
                    <ProductCard
                        key={`card-${produto.id}`}
                        produto={produto}
                        setProduto={setProduto}
                        handleModalVisible={setModalVisible}
                    />
                ))}
            </ul>
            <ProductModal
                open={modalVisible}
                handleVisible={setModalVisible}
                produto={produto}
                handleAddToCart={handleAddToCart}
            />
        </div>
    );
}
