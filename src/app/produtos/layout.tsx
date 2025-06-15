"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/context-provider";
import { CartDrawer } from "@/components/cart-drawer/cart-drawer";
import { Navbar } from "@/components/navbar/navbar";

export default function ProdutosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { cart } = useAppContext();
    const [open, setOpen] = useState(false);

    const openCart = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "#f5f5f5",
            }}
        >
            <Navbar openCart={openCart} />
            <main
                style={{
                    flex: 1,
                    padding: "32px 16px",
                    maxWidth: 1200,
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {children}
            </main>
            <CartDrawer open={open} onClose={onClose} />
        </div>
    );
}
