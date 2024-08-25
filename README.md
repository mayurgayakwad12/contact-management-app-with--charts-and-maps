# Contact Management App with Charts and Maps

## Overview

This project is a Contact Management app with a simple dashboard that includes Charts and Maps. It was built using **ReactJS**, **TypeScript**, **TailwindCSS**, **React Router v6**, and **React Query**. The app allows users to manage contacts (add, edit, view, delete), visualize COVID-19 data on a dashboard, and display information on a map.

## Features

### Contact Management

- **Add Contacts**: A form to add new contacts.
- **View Contacts**: Display a list of all added contacts.
- **Edit Contacts**: Edit contact details.
- **Delete Contacts**: Remove contacts from the list.
- **Redux Integration**: Contact data is stored and managed using Redux for state management.

### Charts and Maps

- **Line Graph**: Visualize case fluctuations over time.
- **Interactive Map**: React Leaflet map with markers showing country-specific COVID-19 stats, including active, recovered, and death cases.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: JavaScript with static typing for better maintainability.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **React Router v6**: Client-side routing for navigation.
- **React Query (Tanstack Query)**: Data-fetching and caching for API calls.
- **Redux**: State management for storing contact data.
- **React Leaflet**: Map integration for displaying COVID-19 data on a map.

## APIs Used

- **Worldwide COVID-19 Data**: [`https://disease.sh/v3/covid-19/all`](https://disease.sh/v3/covid-19/all)
- **Country-Specific COVID-19 Data**: [`https://disease.sh/v3/covid-19/countries`](https://disease.sh/v3/covid-19/countries)
- **Historical Data for Graph**: [`https://disease.sh/v3/covid-19/historical/all?lastdays=all`](https://disease.sh/v3/covid-19/historical/all?lastdays=all)

## Installation and Setup

### Prerequisites

Make sure you have the following installed on your local machine:

- **Node.js** (>=14.0)
- **npm** or **yarn**

### Steps to Run the App

1. Clone the repository:

   ```bash
   gh repo clone mayurgayakwad12/contact-management-app-with-charts-and-maps
   cd contact-management-app-with-charts-and-maps
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

4. Open the app in your browser:
   The app will automatically open at `http://localhost:3000`.

### Deployment

To deploy the app on services like Vercel or Heroku, follow their deployment instructions for React apps. Here's an example of deploying on [Vercel](https://contactmanagementappwithchartsandmaps.vercel.app/) or [GitHub Pages](https://github.com/mayurgayakwad12/contact-management-app-with-charts-and-maps).

## Responsive Design

The app is responsive and optimized for both desktop and mobile devices using TailwindCSS.

## Documentation

- **API Endpoints**: See the list of APIs used for fetching COVID-19 data in the **APIs Used** section.
- **Redux State**: Contact data is managed and stored using Redux.
- **React Query**: All API data fetching and caching is handled using React Query.

## Code Comments

The codebase is fully commented to make it easy to understand the logic and flow of the app.

## Future Enhancements

- **Authentication**: Add user authentication to protect routes.
- **More Data Visualizations**: Expand the dashboard with more detailed graphs and charts.
- **Advanced Filtering**: Add filters for contact management and COVID-19 data.

## Contributing

Feel free to open a pull request or an issue if you find any bugs or want to add new features.

