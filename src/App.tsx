import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { MainLayout } from './layouts/MainLayout';
import { HistoryPage, HomePage, SettingsPage, StatsPage, TutorialPage, } from './pages';

function App() {
  // Apply theme on mount
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="tutorial" element={<TutorialPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
