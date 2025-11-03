import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Overview from './components/Overview';
import DataManagement from './components/DataManagement';
import DataInsights from './components/DataInsights';
import Configuration from './components/Configuration';
import ImpactAnalysis from './components/ImpactAnalysis';
import SeismicData from './components/SeismicData';
import WellData from './components/WellData';
import ProjectData from './components/ProjectData';
import ReservoirSimulation from './components/ReservoirSimulation';
import StorageManagement from './components/StorageManagement';
import Setup from './components/Setup';
import SiteMap from './components/SiteMap';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} />;
      case 'setup':
        return <Setup />;
      case 'overview':
        return <Overview />;
      case 'management':
        return <DataManagement />;
      case 'insights':
        return <DataInsights />;
      case 'configuration':
        return <Configuration />;
      case 'seismic':
        return <SeismicData />;
      case 'wells':
        return <WellData />;
      case 'projects':
        return <ProjectData />;
      case 'archive':
        return (
          <div className="card-cegal p-8 bg-cegal-darker border-cegal-gray-700">
            <h2 className="text-2xl font-bold text-cegal-green mb-4">Archive</h2>
            <p className="text-white">Archived data management and retrieval system.</p>
          </div>
        );
      case 'cleanup':
        return (
          <div className="card-cegal p-8 bg-cegal-darker border-cegal-gray-700">
            <h2 className="text-2xl font-bold text-cegal-green mb-4">Data Cleanup</h2>
            <p className="text-white">Automated cleanup tools and batch processing interface.</p>
          </div>
        );
      case 'impact':
        return (
          <ImpactAnalysis />
        );
      case 'reservoir-simulation':
        return <ReservoirSimulation />;
      case 'storage':
        return <StorageManagement />;
      case 'sitemap':
        return <SiteMap />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-cegal-darker">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 bg-cegal-darker">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;