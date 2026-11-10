import React, { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Main/Main.jsx";

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('studyBuddyTheme') === 'dark';
    });

    useEffect(() => {
        localStorage.setItem(
            'studyBuddyTheme',
            darkMode ? 'dark' : 'light'
        );
    }, [darkMode]);

    return (
        <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>
            <Sidebar darkMode={darkMode} />
            <Main darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
    );
};

export default App;