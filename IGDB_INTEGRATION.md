# IGDB API Integration

This document explains how the IGDB (Internet Game Database) API integration works in this Next.js gaming application.

## Overview

The integration uses **Option 3: Next.js API Routes** for secure server-side API calls to IGDB. This approach keeps the client secret secure on the server while providing a clean interface for the frontend.

## Architecture

```
Frontend (React) → Next.js API Routes → IGDB API
                     ↓
                 Token Cache
```

## API Endpoints

### 1. Search Games
- **URL**: `/api/igdb/search`
- **Methods**: `GET`, `POST`
- **Purpose**: Search for games by name

#### GET Request
```
GET /api/igdb/search?q=Halo&limit=10
```

#### POST Request
```json
POST /api/igdb/search
{
  "query": "Halo",
  "limit": 10
}
```

### 2. Popular Games
- **URL**: `/api/igdb/games`
- **Method**: `GET`
- **Purpose**: Get list of popular games

#### GET Request
```
GET /api/igdb/games?limit=20&offset=0
```

## Authentication

The API uses Twitch OAuth2 client credentials flow:

1. **Client ID**: `mzkckl0ya4xrox75x9pk0lf3hynpmn`
2. **Client Secret**: `vv31r619ynzjlhyidrfs7vakmtwuq4`
3. **Token Endpoint**: `https://id.twitch.tv/oauth2/token`
4. **API Endpoint**: `https://api.igdb.com/v4/games`

## Token Caching

Access tokens are cached in memory to avoid repeated authentication requests:
- Tokens are cached for their full lifetime minus 1 minute buffer
- New tokens are automatically fetched when expired
- This reduces API calls and improves performance

## Rate Limits

IGDB API has rate limits:
- **Rate Limit**: 4 requests per second
- **Token Cache**: Reduces authentication requests
- **Error Handling**: Proper error responses for rate limit exceeded

## Data Transformation

IGDB data is transformed to match our internal `Game` interface:

```typescript
// IGDB Game → Our Game
{
  id: 740,
  name: "Halo: Combat Evolved",
  cover: { url: "//images.igdb.com/igdb/image/upload/t_thumb/co2r2r.jpg" },
  rating: 83.49644169217822,
  first_release_date: 1005782400
}
↓
{
  id: 740,
  title: "Halo: Combat Evolved",
  image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2r2r.jpg",
  rating: 4.2, // Converted from 0-100 to 0-5 scale
  releaseDate: "2001-11-15" // Converted from timestamp
}
```

## Usage in Components

### Custom Hook
```typescript
import { useIGDB } from '@/hooks/useIGDB';

const { searchGames, getPopularGames, isLoading, error } = useIGDB();

// Search for games
const games = await searchGames('Halo', 10);

// Get popular games
const popularGames = await getPopularGames(20);
```

### Error Handling
The integration uses the existing error handling system:
- Errors are caught and logged
- User-friendly error messages
- Retry mechanisms available

## Testing

Use the provided Postman collection (`IGDB_API_Collection.postman_collection.json`) to test the API endpoints.

### Quick Test Commands

```bash
# Test search endpoint
curl "http://localhost:3000/api/igdb/search?q=Halo&limit=5"

# Test popular games endpoint
curl "http://localhost:3000/api/igdb/games?limit=3"
```

## Files Structure

```
app/api/igdb/
├── search/route.ts    # Search games endpoint
└── games/route.ts     # Popular games endpoint

hooks/
└── useIGDB.ts         # Custom hook for IGDB integration

lib/
└── igdb-utils.ts      # Data transformation utilities

types/
└── index.ts           # IGDB type definitions
```

## Security Notes

- Client secret is never exposed to the frontend
- All API calls go through Next.js API routes
- Tokens are cached server-side only
- Rate limiting is handled gracefully

## Future Improvements

1. **Caching**: Add Redis for token and response caching
2. **Rate Limiting**: Implement per-user rate limiting
3. **Error Monitoring**: Add error tracking service
4. **Data Validation**: Add request/response validation
5. **Pagination**: Implement cursor-based pagination
