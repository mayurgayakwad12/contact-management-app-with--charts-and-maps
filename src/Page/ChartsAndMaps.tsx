import React from 'react';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components you need

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { generateUniqueId } from '../Components/utils';

// Define types for world data, country data, and historical data
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
interface WorldData {
  cases: number;
  deaths: number;
  recovered: number;
}

interface CountryInfo {
  iso2: string;
  lat: number;
  long: number;
}

interface CountryData {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: CountryInfo;
}

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

// Function to fetch world data
const fetchWorldData = async (): Promise<WorldData> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
  return data;
};

// Function to fetch country-specific data
const fetchCountryData = async (): Promise<CountryData[]> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

// Function to fetch historical data
const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};

const ChartsAndMaps: React.FC = () => {
  // Use React Query to fetch world data
  const { data: worldData, isLoading: isLoadingWorld } = useQuery<WorldData>({
    queryKey: ['worldData'],
    queryFn: fetchWorldData,
  });

  const { data: countryData, isLoading: isLoadingCountries } = useQuery<CountryData[]>({
    queryKey: ['countryData'],
    queryFn: fetchCountryData,
  });

  const { data: historicalData, isLoading: isLoadingHistorical } = useQuery<HistoricalData>({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData,
  });

  const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Prepare data for the line chart
  const chartData = {
    labels: historicalData ? Object.keys(historicalData?.cases || {}) : [],
    datasets: [
      {
        label: 'Cases',
        data: historicalData ? Object.values(historicalData?.cases || {}) : [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Deaths',
        data: historicalData ? Object.values(historicalData?.deaths || {}) : [],
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Recovered',
        data: historicalData ? Object.values(historicalData?.recovered || {}) : [],
        fill: false,
        backgroundColor: 'rgba(54,162,235,0.4)',
        borderColor: 'rgba(54,162,235,1)',
      },
    ],
  };

  if (isLoadingWorld || isLoadingCountries || isLoadingHistorical) {
    return <h1 className="text-3xl">Loading...</h1>;
  }
  console.log({ countryData });
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h2>

      {/* World Statistics */}
      <div className="mb-8 float-end">
        <h3 className="text-xl font-semibold">World Statistics</h3>
        <p>Total Cases: {worldData?.cases.toLocaleString()}</p>
        <p>Total Recovered: {worldData?.recovered.toLocaleString()}</p>
        <p>Total Deaths: {worldData?.deaths.toLocaleString()}</p>
      </div>

      {/* Line Graph */}
      <div className="mb-8 w-[85%] h-[80%]">
        <Line data={chartData} key={generateUniqueId()} />
      </div>

      {/* React Leaflet Map */}
      <div className="h-[500px] w-[100%]">
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
    
          {/* Markers for each country */}
          {countryData?.map((country) => (
            <Marker
              key={country.countryInfo.iso2}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={defaultIcon}
            >
              <Popup>
                <div key={country.country}>
                  <strong>{country.country}</strong>
                  <br />
                  Active: {country.active}
                  <br />
                  Recovered: {country.recovered}
                  <br />
                  Deaths: {country.deaths}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ChartsAndMaps;
