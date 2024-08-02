import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./CharacterList";
import CharacterDetails from "./CharacterDetail";
import HomePage from "./HomePage"

const App = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
                <Route path="/characters" element={<CharacterList />} />
                <Route path="/character/:id" element={<CharacterDetails />} />
            </Routes>
        </Router>
    );
};

export default App;