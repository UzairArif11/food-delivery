import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import marker images using require to avoid TypeScript module issues
const markerIcon = require('leaflet/dist/images/marker-icon.png');
const markerIcon2x = require('leaflet/dist/images/marker-icon-2x.png');
const markerShadow = require('leaflet/dist/images/marker-shadow.png');

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address: string;
  restaurantName?: string;
  zoom?: number;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  address,
  restaurantName = 'Our Restaurant',
  zoom = 15,
  height = '400px'
}) => {
  // const position: [number, number] = [latitude, longitude];
const position = [latitude, longitude] as [number, number];

  return (
    <div style={{ height }} className="w-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-1">{restaurantName}</h3>
              <p className="text-sm text-gray-600 mb-2">{address}</p>
              <p className="text-xs text-gray-500">
                Click to open in maps
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
