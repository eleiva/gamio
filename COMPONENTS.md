# Gaming Haven Z - Component Documentation

This project is a modular gaming platform template built with Next.js, shadcn/ui, Radix UI, and Tailwind CSS.

## Components Structure

### 1. Header Component (`components/Header.jsx`)
- Displays the Gaming Haven Z branding
- Features a pink circular logo with a gaming icon
- Clean, modern design with purple text

### 2. SearchBar Component (`components/SearchBar.jsx`)
- Reusable search input with magnifying glass icon
- Uses shadcn/ui Input component
- Customizable placeholder text
- Pink-themed styling to match the design

### 3. GameCard Component (`components/GameCard.jsx`)
- Individual game card with image and title
- Hover effect reveals delete button
- Uses shadcn/ui Card and Button components
- Responsive design with proper aspect ratio

### 4. GamesSection Component (`components/GamesSection.jsx`)
- Container for the games grid
- Displays section title
- Responsive grid layout (2-5 columns based on screen size)
- Handles game deletion through props

### 5. GamingApp Component (`components/GamingApp.jsx`)
- Main application component
- Manages state for games and search
- Implements search filtering functionality
- Includes sample game data
- Features keyboard keys background pattern

## Features

- **Modular Design**: Each component is self-contained and reusable
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Search Functionality**: Real-time filtering of games
- **Interactive Elements**: Hover effects and delete functionality
- **Modern UI**: Uses shadcn/ui components with custom styling
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Styling

- **Color Scheme**: Pink and purple gradient theme
- **Typography**: Clean, modern fonts
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and hover effects
- **Background**: Subtle keyboard keys pattern

## Usage

The main application is rendered in `app/page.js` and uses the `GamingApp` component which orchestrates all other components.

To customize:
1. Modify the sample data in `GamingApp.jsx`
2. Adjust colors in `globals.css`
3. Update component props as needed
4. Add new features to individual components
