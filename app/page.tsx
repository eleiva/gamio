"use client";

import React from 'react';
import GamingApp from '@/components/GamingApp';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <GamingApp />
    </ErrorBoundary>
  );
}