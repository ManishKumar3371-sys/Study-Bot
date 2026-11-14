import React, { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Main/Main.jsx";

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('studyBuddyTheme') === 'dark';
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            'studyBuddyTheme',
            darkMode ? 'dark' : 'light'
        );
    }, [darkMode]);

    return (
        <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>
            <Sidebar 
                darkMode={darkMode} 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
            />
            <Main 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
            />
        </div>
    );
};

export default App;
