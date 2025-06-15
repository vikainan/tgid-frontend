import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface NavbarProps {
    openCart: () => void;
}

export const Navbar = ({ openCart }: NavbarProps) => {
    const [current, setCurrent] = useState("carrinho");

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);

        openCart();
    };

    const items: MenuItem[] = [
        {
            label: "Carrinho",
            key: "carrinho",
            icon: <ShoppingCartOutlined />,
        },
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{
                display: "flex",
                flexDirection: "row-reverse",
                position: "sticky",
                top: 0,
            }}
        />
    );
};
