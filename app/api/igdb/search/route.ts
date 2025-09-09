import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Simple token cache to avoid repeated auth requests
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    console.log('Getting new IGDB access token...');
    
    const response = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: 'mzkckl0ya4xrox75x9pk0lf3hynpmn',
      client_secret: 'vv31r619ynzjlhyidrfs7vakmtwuq4',
      grant_type: 'client_credentials'
    });

    // Cache the token with 1 minute buffer before expiry
    cachedToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000;
    
    console.log('IGDB access token obtained successfully');
    return cachedToken!; // Non-null assertion since we just assigned it
  } catch (error) {
    console.error('Failed to get IGDB access token:', error);
    throw new Error('Failed to authenticate with IGDB API');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10 } = await request.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' }, 
        { status: 400 }
      );
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Build the IGDB query
    const igdbQuery = `fields name,summary,genres.name,platforms.name,cover.url,rating,first_release_date; search "${query}"; limit ${limit};`;

    console.log(`Searching IGDB for: "${query}" (limit: ${limit})`);

    // Make request to IGDB API
    const response = await axios.post('https://api.igdb.com/v4/games', igdbQuery, {
      headers: {
        'Client-ID': 'mzkckl0ya4xrox75x9pk0lf3hynpmn',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'text/plain'
      }
    });

    console.log(`Found ${response.data.length} games for query: "${query}"`);

    return NextResponse.json({
      success: true,
      data: response.data,
      query,
      count: response.data.length
    });

  } catch (error) {
    console.error('IGDB API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to search games',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

// Also support GET for simple testing
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || 'Halo';
  const limit = parseInt(url.searchParams.get('limit') || '10');

  try {
    const accessToken = await getAccessToken();
    
    const igdbQuery = `fields name,summary,genres.name,platforms.name,cover.url,rating,first_release_date; search "${query}"; limit ${limit};`;

    const response = await axios.post('https://api.igdb.com/v4/games', igdbQuery, {
      headers: {
        'Client-ID': 'mzkckl0ya4xrox75x9pk0lf3hynpmn',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'text/plain'
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data,
      query,
      count: response.data.length
    });

  } catch (error) {
    console.error('IGDB API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to search games',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
