'use client';

import { use } from 'react';

export default function FontSelect() {
  const fonts = use(fetchFonts());
  return (
    <label className="d-flex align-items-center m-0">
      <span className="me-2">Font</span>
      <select name="font" className="form-select">
        {fonts.map((font, i) => (
          <option key={i}>{font.family}</option>
        ))}
      </select>
    </label>
  );
}

async function fetchFonts(): Promise<any[]> {
  const res = await fetch(
    `https://webfonts.googleapis.com/v1/webfonts?sort=POPULARITY&key=AIzaSyAKYz3WR8RB4olia1hz1E8_YZ45zY1pqcI`
  );

  const data = await res.json();

  return data.items.slice(0, 10);
}
