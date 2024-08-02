import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homepage';
import CharacterList from './CharacterList';
import ComicList from './ComicsList';
import NotFound from './NotFound';
import NavBar from './NavigationBar';

const App = () => {
    return (
        <Router>
          <NavBar/>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/characters" element={<CharacterList />} />
                <Route path="/comics" element={<ComicList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;