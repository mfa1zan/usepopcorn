# usePopcorn

A simple React app for searching movies, viewing details, and rating them with a custom star rating component. Built for learning React hooks, component composition, and state management.

## Clone the Repository

Clone this repo using:
```bash
git clone https://github.com/mfa1zan/usepopcorn.git
```

## Features
- Search movies (UI only, no API integration yet)
- View a list of movies with posters and release years
- Track watched movies and see summary stats (average rating, runtime, etc.)
- Custom Star Rating component with configurable colors, size, and messages
- Responsive, modern UI

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required dependencies listed in `package.json`.
2. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Search for movies using the search bar.
- Click the toggle button on each box to show/hide content.
- Rate movies using the StarRating component (see `src/StarRating.js`).

## Custom StarRating Component
- Props:
  - `maxRating` (number): Maximum number of stars
  - `color` (string): Star color
  - `size` (number): Star size in px
  - `message` (array): Array of messages for each rating
  - `defaultRating` (number): Initial rating
  - `onSetRating` (function): Callback when rating changes
- Example usage:
  ```jsx
  <StarRating maxRating={5} color="red" size={50} message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
  ```

## Project Structure
- `src/App.js`: Main app logic and components
- `src/StarRating.js`: Custom star rating component
- `src/index.js`: Entry point
- `src/index.css`: Styles

## Scripts
- `npm start`: Run development server
- `npm test`: Run tests
- `npm run build`: Build for production
- `npm run eject`: Eject configuration (not recommended)

## License
MIT

