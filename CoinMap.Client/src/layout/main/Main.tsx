interface MainProps {
    children: React.ReactNode
}

const Main = ({children}: MainProps) => {
    return (
        <main className="main-content">
            {children}
        </main>
    )
}

export default Main;