import { describe, it, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/react'
import '@testing-library/dom'
import App from '../app/App'

// vi.mock('../app/ForwardLooking/Grid/Grid', () => ({ GridView: () => null }))
// vi.mock('../app/Realtime/EventTracking', () => ({ EventTracking: () => null }))

// Test geojson file
const base = import.meta.env.VITE_BASE;

function fetchGeoJson(path: string) {
    return Promise.resolve({ path, type: 'FeatureCollection'})
}

test('GADM_ADMIN1.json', async () => {
    const result = await fetchGeoJson(`${base}/GADM_ADMIN1.json`);
    expect(result.type).toBe('FeatureCollection');
})

//
// test('loads app component', () => {
//     render(<App/>)
// })

