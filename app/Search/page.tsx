import React, { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-5 text-xl">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}