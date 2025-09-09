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
    return cachedToken;
  } catch (error) {
    console.error('Failed to get IGDB access token:', error);
    throw new Error('Failed to authenticate with IGDB API');
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Get access token
    const accessToken = await getAccessToken();

    // Build the IGDB query for popular games
    // We'll get games with high ratings and recent release dates
    const igdbQuery = `fields name,summary,genres.name,platforms.name,cover.url,rating,first_release_date; 
                       where rating > 80 & first_release_date > 1609459200; 
                       sort rating desc; 
                       limit ${limit}; 
                       offset ${offset};`;

    console.log(`Fetching popular games (limit: ${limit}, offset: ${offset})`);

    // Make request to IGDB API
    const response = await axios.post('https://api.igdb.com/v4/games', igdbQuery, {
      headers: {
        'Client-ID': 'mzkckl0ya4xrox75x9pk0lf3hynpmn',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'text/plain'
      }
    });

    console.log(`Found ${response.data.length} popular games`);

    return NextResponse.json({
      success: true,
      data: response.data,
      count: response.data.length,
      limit,
      offset
    });

  } catch (error) {
    console.error('IGDB API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch games',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
