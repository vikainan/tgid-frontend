import { Produto } from "./Produto";

export type ProdutoCarrinho = Produto & { quantidade: number };

export type Carrinho = {
    produtos: Produto[];
};
