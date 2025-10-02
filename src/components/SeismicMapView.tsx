import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Calendar, 
  HardDrive, 
  Activity,
  Eye,
  Download,
  Filter,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SeismicSurvey {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  surveyArea?: [number, number][];
  surveyType: '2D' | '3D' | '4D' | 'VSP';
  status: 'active' | 'processing' | 'completed' | 'archived';
  acquisitionDate: string;
  size: string;
  contractor: string;
  vessel: string;
  quality: number;
  processingStage: string;
}

const SeismicMapView: React.FC = () => {
  const [selectedSurvey, setSelectedSurvey] = useState<SeismicSurvey | null>(null);
  const [showAreas, setShowAreas] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const seismicSurveys: SeismicSurvey[] = [
    {
      id: '1',
      name: 'North Sea Block 15/25 3D Survey',
      location: 'North Sea, UK',
      coordinates: [58.5, 1.8],
      surveyArea: [
        [58.4, 1.6],
        [58.6, 1.6],
        [58.6, 2.0],
        [58.4, 2.0]
      ],
      surveyType: '3D',
      status: 'completed',
      acquisitionDate: '2023-08-15',
      size: '2.3 TB',
      contractor: 'CGG',
      vessel: 'Ramform Titan',
      quality: 92,
      processingStage: 'Final Migration'
    },
    {
      id: '2',
      name: 'Gulf of Mexico Deepwater 4D',
      location: 'Gulf of Mexico, USA',
      coordinates: [27.5, -90.2],
      surveyArea: [
        [27.3, -90.5],
        [27.7, -90.5],
        [27.7, -89.9],
        [27.3, -89.9]
      ],
      surveyType: '4D',
      status: 'processing',
      acquisitionDate: '2024-11-10',
      size: '4.7 TB',
      contractor: 'WesternGeco',
      vessel: 'Amazon Warrior',
      quality: 88,
      processingStage: 'Pre-stack Migration'
    },
    {
      id: '3',
      name: 'Barents Sea Regional 2D',
      location: 'Barents Sea, Norway',
      coordinates: [74.5, 19.0],
      surveyArea: [
        [74.0, 18.0],
        [75.0, 18.0],
        [75.0, 20.0],
        [74.0, 20.0]
      ],
      surveyType: '2D',
      status: 'archived',
      acquisitionDate: '2019-06-20',
      size: '890 MB',
      contractor: 'TGS',
      vessel: 'Sanco Swift',
      quality: 76,
      processingStage: 'Stack'
    },
    {
      id: '4',
      name: 'Permian Basin VSP Survey',
      location: 'Texas, USA',
      coordinates: [31.8, -102.4],
      surveyType: 'VSP',
      status: 'active',
      acquisitionDate: '2024-12-01',
      size: '156 MB',
      contractor: 'Schlumberger',
      vessel: 'Land Crew',
      quality: 94,
      processingStage: 'Corridor Stack'
    },
    {
      id: '5',
      name: 'Campos Basin 3D OBC',
      location: 'Offshore Brazil',
      coordinates: [-22.5, -40.2],
      surveyArea: [
        [-22.7, -40.5],
        [-22.3, -40.5],
        [-22.3, -39.9],
        [-22.7, -39.9]
      ],
      surveyType: '3D',
      status: 'completed',
      acquisitionDate: '2024-09-05',
      size: '3.2 TB',
      contractor: 'PGS',
      vessel: 'Ramform Hyperion',
      quality: 90,
      processingStage: 'Final Stack'
    },
    {
      id: '6',
      name: 'West Africa Margin 2D',
      location: 'Offshore Angola',
      coordinates: [-8.8, 13.2],
      surveyArea: [
        [-9.2, 12.8],
        [-8.4, 12.8],
        [-8.4, 13.6],
        [-9.2, 13.6]
      ],
      surveyType: '2D',
      status: 'processing',
      acquisitionDate: '2024-10-20',
      size: '1.8 TB',
      contractor: 'Shearwater',
      vessel: 'SW Tasman',
      quality: 85,
      processingStage: 'Velocity Analysis'
    }
  ];

  const getMarkerColor = (surveyType: string, status: string) => {
    if (status === 'active') return '#00FF97';
    if (status === 'processing') return '#00A3E0';
    if (status === 'completed') return '#00D4AA';
    return '#6B7280';
  };

  const getSurveyTypeColor = (type: string) => {
    switch (type) {
      case '2D': return '#3B82F6';
      case '3D': return '#10B981';
      case '4D': return '#8B5CF6';
      case 'VSP': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-cegal-primary bg-blue-50 border-blue-200';
      case 'archived': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredSurveys = seismicSurveys.filter(survey => {
    const matchesType = filterType === 'all' || survey.surveyType === filterType;
    const matchesStatus = filterStatus === 'all' || survey.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const createCustomIcon = (surveyType: string, status: string) => {
    const color = getMarkerColor(surveyType, status);
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="${color}"/>
          <circle cx="12.5" cy="12.5" r="6" fill="white"/>
          <text x="12.5" y="16" text-anchor="middle" font-size="8" font-weight="bold" fill="${color}">${surveyType}</text>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cegal-green">Seismic Data Map</h2>
          <p className="text-white mt-1">Geographic view of seismic surveys and coverage areas</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAreas(!showAreas)}
            className="btn-cegal-secondary flex items-center space-x-2"
          >
            {showAreas ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
            <span>Survey Areas</span>
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
            <option value="2D">2D Seismic</option>
            <option value="3D">3D Seismic</option>
            <option value="4D">4D Seismic</option>
            <option value="VSP">VSP</option>
          </select>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          <div className="text-sm text-white">
            Showing {filteredSurveys.length} of {seismicSurveys.length} surveys
          </div>
        </div>
      </div>

      {/* Map and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 card-cegal bg-cegal-darker border-cegal-gray-700">
          <div className="p-4 border-b border-cegal-gray-600">
            <h3 className="text-lg font-semibold text-cegal-green">Global Survey Locations</h3>
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
              
              {filteredSurveys.map((survey) => (
                <React.Fragment key={survey.id}>
                  <Marker
                    position={survey.coordinates as LatLngExpression}
                    icon={createCustomIcon(survey.surveyType, survey.status)}
                    eventHandlers={{
                      click: () => setSelectedSurvey(survey),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-semibold text-gray-900 mb-2">{survey.name}</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Type:</span> {survey.surveyType}</p>
                          <p><span className="font-medium">Status:</span> {survey.status}</p>
                          <p><span className="font-medium">Size:</span> {survey.size}</p>
                          <p><span className="font-medium">Quality:</span> {survey.quality}%</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {showAreas && survey.surveyArea && (
                    <Polygon
                      positions={survey.surveyArea as LatLngExpression[]}
                      pathOptions={{
                        color: getSurveyTypeColor(survey.surveyType),
                        fillColor: getSurveyTypeColor(survey.surveyType),
                        fillOpacity: 0.2,
                        weight: 2
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Survey Details */}
        <div className="space-y-4">
          {selectedSurvey ? (
            <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cegal-green">Survey Details</h3>
                <button
                  onClick={() => setSelectedSurvey(null)}
                  className="text-cegal-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">{selectedSurvey.name}</h4>
                  <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedSurvey.status)}`}>
                    {selectedSurvey.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-cegal-gray-400">Type</p>
                    <p className="text-white font-medium">{selectedSurvey.surveyType}</p>
                  </div>
                  <div>
                    <p className="text-cegal-gray-400">Size</p>
                    <p className="text-white font-medium">{selectedSurvey.size}</p>
                  </div>
                  <div>
                    <p className="text-cegal-gray-400">Quality</p>
                    <p className="text-white font-medium">{selectedSurvey.quality}%</p>
                  </div>
                  <div>
                    <p className="text-cegal-gray-400">Contractor</p>
                    <p className="text-white font-medium">{selectedSurvey.contractor}</p>
                  </div>
                </div>

                <div>
                  <p className="text-cegal-gray-400 text-sm">Processing Stage</p>
                  <p className="text-white font-medium">{selectedSurvey.processingStage}</p>
                </div>

                <div>
                  <p className="text-cegal-gray-400 text-sm">Vessel</p>
                  <p className="text-white font-medium">{selectedSurvey.vessel}</p>
                </div>

                <div>
                  <p className="text-cegal-gray-400 text-sm">Acquisition Date</p>
                  <p className="text-white font-medium">{selectedSurvey.acquisitionDate}</p>
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
                <MapPin className="h-12 w-12 text-cegal-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select a Survey</h3>
                <p className="text-cegal-gray-400 text-sm">Click on a marker to view survey details</p>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="card-cegal p-4 bg-cegal-darker border-cegal-gray-700">
            <h4 className="font-medium text-cegal-green mb-3">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-white">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-white">Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                <span className="text-white">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <span className="text-white">Archived</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeismicMapView;