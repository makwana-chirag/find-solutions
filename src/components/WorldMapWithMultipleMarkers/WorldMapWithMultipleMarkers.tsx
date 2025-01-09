import React, { useState, ChangeEvent } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import worldCountries from "../../assets/maps/world-countries-sans-antarctica.json";
import countryCoordinates from "../../assets/maps/country-coordinates.json";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

interface CompanyData {
  name: string;
  country: string;
  color: string;
}

interface Company {
  name: string;
  country: string;
  coordinates: [number, number];
  color: string;
}

export const WorldMapWithMultipleMarkers: React.FC = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    country: "",
    color: "#FF5533",
  });

  const [companies, setCompanies] = useState<Company[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleAddCompany = (): void => {
    if (companyData.name && companyData.country) {
      // Normalize the country name input to lowercase
      const normalizedCountry = companyData.country.trim().toLowerCase();

      // Search for the country in the coordinates list
      const countryKey = Object.keys(countryCoordinates).find(
        (country) => country.toLowerCase() === normalizedCountry
      );

      // If the country exists in the coordinates object
      if (countryKey) {
        const coordinates = countryCoordinates[
          countryKey as keyof typeof countryCoordinates
        ] as [number, number];
        setCompanies([
          ...companies,
          {
            name: companyData.name,
            coordinates,
            country: countryKey,
            color: companyData.color,
          },
        ]);
      } else {
        alert("Country not found. Please use a valid country name.");
      }
    }
  };

  const handleDownloadMap = (): void => {
    const mapElement = document.getElementById("map-container");
    if (mapElement) {
      html2canvas(mapElement).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, "world-map.png");
          }
        });
      });
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "white" }}>Add Company Location</h2>
        <label>
          Company Name:
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleInputChange}
            placeholder="Enter company name"
            style={{ padding: "5px", margin: "10px", borderRadius: "10px" }}
          />
        </label>
        <label>
          Country:
          <select
            name="country"
            value={companyData.country}
            style={{ padding: "5px", margin: "10px", borderRadius: "10px" }}
            onChange={handleInputChange}
          >
            <option value="">Select a country</option>
            {Object.keys(countryCoordinates).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label>
          Dot Color:
          <input
            type="color"
            name="color"
            value={companyData.color}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleAddCompany}>Add Company</button>
        <button onClick={handleDownloadMap} style={{ marginLeft: "10px" }}>
          Download Map
        </button>
      </div>

      <div id="map-container" style={{ width: "80%", height: "500px" }}>
        <ComposableMap projection="geoEqualEarth">
          <Geographies geography={worldCountries}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {companies.map((company, index) => (
            <Marker key={index} coordinates={company.coordinates}>
              {/* <circle r={5} fill={company.color} /> */}
              <g
                fill="none"
                stroke={company.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={10}
                color={company.color}
                textDecoration={company.color}
                style={{
                  fontSize: "10px",
                  // fontWeight: "bold",
                  // color: "",
                }}
              >
                {company.name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};
