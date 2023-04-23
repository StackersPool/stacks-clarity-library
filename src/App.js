import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import PageNavigation from "./components/page-navigation/PageNavigation";
import Searchbar from "./components/searchbar/Searchbar";
import { Introduction, Contract, HowItWorks } from "./pages"

function App() {
    return (
        <>
            <Navbar />
            <Searchbar />
            <PageNavigation />
            <Routes>
                <Route path="/" element={<Introduction />} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
            </Routes>
        </>
    )
}

export default App;
