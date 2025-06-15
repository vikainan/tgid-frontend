export default function ResumoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                padding: "32px 16px",
                maxWidth: 1200,
                margin: "0 auto",
                width: "100%",
                justifyContent: "center",
            }}
        >
            {children}
        </div>
    );
}
