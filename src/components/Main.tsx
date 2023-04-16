const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-screen w-full font-inherit overflow-scroll">
            <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col">{children}</div>
        </main>
    );
};

export default Main;
