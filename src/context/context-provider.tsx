"use client";

import { Carrinho, ProdutoCarrinho } from "@/models/Carrinho";
import { Produto } from "@/models/Produto";
import { FC, createContext, useContext, useState } from "react";

type ContextValue = {
    produtos: Produto[];
    setProdutos: (state: Produto[]) => void;
    cart: Carrinho;
    total: number;
    addItemToCart: (item: Produto) => void;
    removeItemFromCart: (item: Produto) => void;
};

const Context = createContext<ContextValue>({} as ContextValue);

export const ContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cart, setCart] = useState<Carrinho>({ produtos: [] });
    const [total, setTotal] = useState<number>(0);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const calcularTotal = (produtos: ProdutoCarrinho[]) => {
        return produtos?.reduce(
            (acc, produto) => acc + produto.preco * produto?.quantidade,
            0
        );
    };

    const addItemToCart = (item: Produto) => {
        setCart((carrinhoAtual) => {
            const produtos = carrinhoAtual?.produtos || [];
            const produtoExiste = produtos.some(
                (produto) => produto.id === item.id
            );

            const produtosAtualizados = produtoExiste
                ? produtos.map((produto) =>
                      produto.id === item.id
                          ? { ...produto, quantidade: produto.quantidade + 1 }
                          : produto
                  )
                : [...produtos, { ...item, quantidade: 1 }];

            const novoCarrinho = {
                ...carrinhoAtual,
                produtos: produtosAtualizados,
            };
            setTotal(calcularTotal(produtosAtualizados));

            return novoCarrinho;
        });
    };

    const removeItemFromCart = (item: Produto) => {
        setCart((carrinhoAtual) => {
            const produtos = carrinhoAtual?.produtos || [];
            const produtoExiste = produtos.some(
                (produto) => produto.id === item.id
            );

            const produtosAtualizados = produtos
                .map((produto) =>
                    produto.id === item.id
                        ? { ...produto, quantidade: produto.quantidade - 1 }
                        : produto
                )
                .filter((produto) => produto.quantidade > 0);

            const novoCarrinho = {
                ...carrinhoAtual,
                produtos: produtoExiste ? produtosAtualizados : produtos,
            };
            setTotal(calcularTotal(produtosAtualizados));

            return novoCarrinho;
        });
    };

    return (
        <Context.Provider
            value={{
                produtos,
                setProdutos,
                cart,
                total,
                addItemToCart,
                removeItemFromCart,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useAppContext = (): ContextValue => useContext(Context);
