# Pokémon Project 🎮🦾

A complete Pokémon experience featuring a **Pokédex** and a **Minigame**.

## 🛠️ Tech Stack

![Vite](https://img.shields.io/badge/Vite-4468F2?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PokéAPI](https://img.shields.io/badge/PokéAPI-FFCB05?style=for-the-badge&logo=pokemon&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF7300?style=for-the-badge&logo=recharts&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white)

## 🚀 Features

### 📖 Pokédex:

- 🔍 Search Pokémon by name or ID
- 📊 View detailed stats, abilities, and evolutions
- 🎛️ Filter Pokémon by type
- 🎨 Dark mode & animated UI

### 🎮 Minigame:

- 🕹️ Interactive Pokémon game (TBD mechanics)
- ⚡ Uses Pokémon API for gameplay
- 🏆 High-score tracking

---

## 📂 Project Structure

```
📁 pokedex
├── .gitignore
├── .prettierrc
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── pokedexapi_refacto_checklist.txt
├── src
│   ├── App.jsx
│   ├── api
│   │   └── pokeapi.js
│   ├── components
│   │   ├── AnimatedSprites.jsx
│   │   ├── ComparisonPanel.jsx
│   │   ├── EvolutionChain.jsx
│   │   ├── FormSelector.jsx
│   │   ├── MiniPokemonCard.jsx
│   │   ├── PokedexGrid.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonDetails.jsx
│   │   ├── RecentList.jsx
│   │   ├── RouteTransition.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SidebarPanel.jsx
│   │   ├── TransitionManager.jsx
│   │   ├── TypeFilter.jsx
│   │   └── ui
│   │   │   ├── Button.jsx
│   │   │   ├── FavButton.jsx
│   │   │   └── StatRadar.jsx
│   ├── context
│   │   └── ComparisonContext.jsx
│   ├── hooks
│   │   ├── useDebouncedValue.js
│   │   ├── useFavorites.js
│   │   ├── usePokemonDetails.js
│   │   └── usePokemonNames.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   └── Home.jsx
│   └── utils
│   │   ├── typeColors.js
│   │   └── typeEmojis.js
└── vite.config.js
```

---

## 📦 Installation & Setup

```sh
# Clone the repo
git clone https://github.com/Jackmaa/pokedex.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🔍 Features

### 📊 Pokédex:

✔️Search + Autocomplete (with keyboard nav)
✔️Filter by Type
✔️Favorites with localStorage
✔️View Pokémon details, stats, abilities
✔️View alternate forms (with sprite & description)
✔️Shiny toggle with animated sprite swap
✔️Fallback-safe API handling (for -mega, -cap, etc.)
✔️Evolution chain with clickable steps

### ⚔️ Battle Game:

✔️ Random enemy Pokémon generation  
✔️ Turn-based combat system  
✔️ HP bars & stat-based damage calculation  
✔️ Type effectiveness implementation  
✔️ Score tracking  
✔️ Game loop with increasing difficulty  
✔️ Sound effects & attack animations

⚡ _Gotta catch ’em all – but with style_

## 📖 Resources & References

Here are some useful links for development:

### **API & Data Fetching:**

- [PokéAPI Docs](https://pokeapi.co/docs/v2) – Official API documentation
- [Handling API Calls with Axios](https://axios-http.com/)
- [React Query for Efficient Data Fetching](https://react-query.tanstack.com/) (Optional)

### **UI & Animations:**

- [Framer Motion Guide](https://www.framer.com/motion/)
- [CSS Tricks – Dark Mode Guide](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)

### **Game Logic & Mechanics:**

- [Game Balancing & Type Effectiveness](https://pokemondb.net/type) (Pokémon Mechanics)

### **React & Project Setup:**

- [Vite Guide for Fast React Development](https://vitejs.dev/guide/)
- [React Router v6 Docs](https://reactrouter.com/en/main)
