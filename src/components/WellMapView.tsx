import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { 
  Drill, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Activity,
  Eye,
  Download,
  Filter,
  ToggleLeft,
  ToggleRight,
  Droplets
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WellData {
  id: string;
  wellName: string;
  location: string;
  coordinates: [number, number];
  wellType: 'Exploration' | 'Development' | 'Production' | 'Injection';
  status: 'active' | 'drilling' | 'completed' | 'suspended' | 'abandoned';
  spudDate: string;
  totalDepth: number;
  currentDepth: number;
  operator: string;
  rig: string;
  field: string;
  formation: string;
  productionRate?: number;
  owner: string;
}

const WellMapView: React.FC = () => {
  const [selectedWell, setSelectedWell] = useState<WellData | null>(null);
  const [showProductionCircles, setShowProductionCircles] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const wellData: WellData[] = [
    {
      id: '1',
      wellName: 'Alpha-7H',
      location: 'North Sea, Block 15/25',
      coordinates: [58.3, 1.9],
      wellType: 'Development',
      status: 'active',
      spudDate: '2024-08-15',
      totalDepth: 4250,
      currentDepth: 4250,
      operator: 'Equinor',
      rig: 'Transocean Spitsbergen',
      field: 'Johan Sverdrup',
      formation: 'Draupne',
      productionRate: 2450,
      owner: 'Drilling Team'
    },
    {
      id: '2',
      wellName: 'Beta-12',
      location: 'Gulf of Mexico, MC 252',
      coordinates: [28.7, -88.4],
      wellType: 'Exploration',
      status: 'drilling',
      spudDate: '2024-11-20',
      totalDepth: 6800,
      currentDepth: 4200,
      operator: 'BP',
      rig: 'Deepwater Horizon II',
      field: 'Thunder Horse',
      formation: 'Miocene',
      owner: 'Exploration Team'
    },
    {
      id: '3',
      wellName: 'Gamma-3ST1',
      location: 'Permian Basin, Texas',
      coordinates: [31.9, -102.1],
      wellType: 'Production',
      status: 'completed',
      spudDate: '2023-05-10',
      totalDepth: 3850,
      currentDepth: 3850,
      operator: 'ExxonMobil',
      rig: 'Patterson UTI 219',
      field: 'Wolfcamp',
      formation: 'Wolfcamp Shale',
      productionRate: 1850,
      owner: 'Production Team'
    },
    {
      id: '4',
      wellName: 'Delta-8',
      location: 'Campos Basin, Brazil',
      coordinates: [-22.2, -39.8],
      wellType: 'Development',
      status: 'suspended',
      spudDate: '2024-03-12',
      totalDepth: 5200,
      currentDepth: 3100,
      operator: 'Petrobras',
      rig: 'Sete Brasil',
      field: 'Lula',
      formation: 'Pre-Salt Carbonate',
      owner: 'Drilling Team'
    },
    {
      id: '5',
      wellName: 'Epsilon-15H',
      location: 'Bakken, North Dakota',
      coordinates: [47.8, -103.2],
      wellType: 'Production',
      status: 'active',
      spudDate: '2024-07-08',
      totalDepth: 4100,
      currentDepth: 4100,
      operator: 'Continental Resources',
      rig: 'Nabors X-40',
      field: 'Bakken Shale',
      formation: 'Bakken',
      productionRate: 1200,
      owner: 'Production Team'
    },
    {
      id: '6',
      wellName: 'Zeta-4',
      location: 'West Africa, Angola',
      coordinates: [-8.5, 13.4],
      wellType: 'Exploration',
      status: 'abandoned',
      spudDate: '2023-12-05',
      totalDepth: 4500,
      currentDepth: 2800,
      operator: 'Total',
      rig: 'Maersk Drilling',
      field: 'Block 17',
      formation: 'Oligocene',
      owner: 'Exploration Team'
    },
    {
      id: '7',
      wellName: 'Eta-9',
      location: 'North Sea, Norway',
      coordinates: [59.1, 2.3],
      wellType: 'Production',
      status: 'active',
      spudDate: '2024-06-15',
      totalDepth: 3900,
      currentDepth: 3900,
      operator: 'Aker BP',
      rig: 'Maersk Invincible',
      field: 'Alvheim',
      formation: 'Heimdal',
      productionRate: 1950,
      owner: 'Production Team'
    },
    {
      id: '8',
      wellName: 'Theta-11H',
      location: 'Eagle Ford, Texas',
      coordinates: [28.4, -98.1],
      wellType: 'Production',
      status: 'completed',
      spudDate: '2024-04-20',
      totalDepth: 4500,
      currentDepth: 4500,
      operator: 'EOG Resources',
      rig: 'Precision Drilling',
      field: 'Eagle Ford Shale',
      formation: 'Eagle Ford',
      productionRate: 1650,
      owner: 'Production Team'
    }
  ];

  const getMarkerColor = (wellType: string, status: string) => {
    if (status === 'active') return '#00FF97';
    if (status === 'drilling') return '#00A3E0';
    if (status === 'completed') return '#00D4AA';
    if (status === 'suspended') return '#F59E0B';
    return '#6B7280';
  };

  const getWellTypeColor = (type: string) => {
    switch (type) {
      case 'Exploration': return '#8B5CF6';
      case 'Development': return '#3B82F6';
      case 'Production': return '#10B981';
      case 'Injection': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'drilling': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-cegal-primary bg-blue-50 border-blue-200';
      case 'suspended': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'abandoned': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredWells = wellData.filter(well => {
    const matchesType = filterType === 'all' || well.wellType === filterType;
    const matchesStatus = filterStatus === 'all' || well.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const createCustomIcon = (wellType: string, status: string) => {
    const color = getMarkerColor(wellType, status);
    const typeIcon = wellType === 'Production' ? '♦' : wellType === 'Exploration' ? '●' : wellType === 'Development' ? '▲' : '■';
    
    const svgString = `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
        <text x="12.5" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="${color}">${typeIcon}</text>
      </svg>
    `;
    
    // Convert Unicode characters to base64-safe format
    const base64String = btoa(unescape(encodeURIComponent(svgString)));
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${base64String}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  const getProductionCircleRadius = (productionRate: number) => {
    return Math.sqrt(productionRate) * 50; // Scale factor for visibility
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cegal-green">Well Data Map</h2>
          <p className="text-white mt-1">Geographic view of well locations and production data</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowProductionCircles(!showProductionCircles)}
            className="btn-cegal-secondary flex items-center space-x-2"
          >
            {showProductionCircles ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
            <span>Production Circles</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-cegal p-4 bg-cegal-darker border-cegal-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-cegal-gray-400" />
            <span className="text-sm font-medium text-white">Filters:</span>
          </div>
          
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-sm"
          >
            <option value="all">All Types</option>
            <option value="Exploration">Exploration</option>
            <option value="Development">Development</option>
            <option value="Production">Production</option>
            <option value="Injection">Injection</option>
          </select>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="drilling">Drilling</option>
            <option value="completed">Completed</option>
            <option value="suspended">Suspended</option>
            <option value="abandoned">Abandoned</option>
          </select>

          <div className="text-sm text-white">
            Showing {filteredWells.length} of {wellData.length} wells
          </div>
        </div>
      </div>

      {/* Map and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 card-cegal bg-cegal-darker border-cegal-gray-700">
          <div className="p-4 border-b border-cegal-gray-600">
            <h3 className="text-lg font-semibold text-cegal-green">Global Well Locations</h3>
          </div>
          <div className="h-96">
            <MapContainer
              center={[30, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              className="rounded-b-xl"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {filteredWells.map((well) => (
                <React.Fragment key={well.id}>
                  <Marker
                    position={well.coordinates as LatLngExpression}
                    icon={createCustomIcon(well.wellType, well.status)}
                    eventHandlers={{
                      click: () => setSelectedWell(well),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-semibold text-gray-900 mb-2">{well.wellName}</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Type:</span> {well.wellType}</p>
                          <p><span className="font-medium">Status:</span> {well.status}</p>
                          <p><span className="font-medium">Depth:</span> {well.currentDepth.toLocaleString()} ft</p>
                          {well.productionRate && (
                            <p><span className="font-medium">Production:</span> {well.productionRate.toLocaleString()} bpd</p>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {showProductionCircles && well.productionRate && well.status === 'active' && (
                    <Circle
                      center={well.coordinates as LatLngExpression}
                      radius={getProductionCircleRadius(well.productionRate)}
                      pathOptions={{
                        color: '#10B981',
                        fillColor: '#10B981',
                        fillOpacity: 0.1,
                        weight: 2
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Well Details */}
        <div className="space-y-4">
          {selectedWell ? (
            <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cegal-green">Well Details</h3>
                <button
                  onClick={() => setSelectedWell(null)}
                  className="text-cegal-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">{selectedWell.wellName}</h4>
                  <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedWell.status)}`}>
                    {selectedWell.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-cegal-gray-400">Type</p>
                    <p className="text-white font-medium">{selectedWell.wellType}</p>
                  </div>
                  <div>
                    <p className="text-cegal-gray-400">Operator</p>
                    <p className="text-white font-medium">{selectedWell.operator}</p>
                  </div>
                  <div>
                    <p className="text-cegal-gray-400">Field</p>
                    <p className="text-white font-medium">{selectedWell.field}</p>
                  </div>
                  <div>
                    <p className="text-cegal-gray-400">Formation</p>
                    <p className="text-white font-medium">{selectedWell.formation}</p>
                  </div>
                </div>

                <div>
                  <p className="text-cegal-gray-400 text-sm mb-2">Drilling Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="h-2 bg-cegal-primary rounded-full"
                      style={{ width: `${(selectedWell.currentDepth / selectedWell.totalDepth) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{selectedWell.currentDepth.toLocaleString()} ft</span>
                    <span className="text-cegal-gray-400">TD: {selectedWell.totalDepth.toLocaleString()} ft</span>
                  </div>
                </div>

                {selectedWell.productionRate && (
                  <div>
                    <p className="text-cegal-gray-400 text-sm">Production Rate</p>
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-green-500" />
                      <p className="text-white font-medium">{selectedWell.productionRate.toLocaleString()} bpd</p>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-cegal-gray-400 text-sm">Rig</p>
                  <p className="text-white font-medium">{selectedWell.rig}</p>
                </div>

                <div>
                  <p className="text-cegal-gray-400 text-sm">Spud Date</p>
                  <p className="text-white font-medium">{selectedWell.spudDate}</p>
                </div>

                <div className="flex space-x-2 pt-4">
                  <button className="btn-cegal-primary flex-1 flex items-center justify-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button className="btn-cegal-secondary flex-1 flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
              <div className="text-center">
                <Drill className="h-12 w-12 text-cegal-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select a Well</h3>
                <p className="text-cegal-gray-400 text-sm">Click on a marker to view well details</p>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="card-cegal p-4 bg-cegal-darker border-cegal-gray-700">
            <h4 className="font-medium text-cegal-green mb-3">Legend</h4>
            <div className="space-y-3">
              <div>
                <p className="text-white text-sm font-medium mb-2">Status</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-white">Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-white">Drilling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-white">Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-white">Suspended</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="text-white">Abandoned</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-2">Type</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400">●</span>
                    <span className="text-white">Exploration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">▲</span>
                    <span className="text-white">Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">♦</span>
                    <span className="text-white">Production</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">■</span>
                    <span className="text-white">Injection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellMapView;