import { Header } from "./Header"

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
        </div>
    )
}

export default Layout