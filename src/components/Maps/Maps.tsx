import React, { useState } from 'react';
import { Map, Placemark, SearchControl, YMaps } from 'react-yandex-maps';
import './Maps.scss';

export const Maps = () => {
  // в coords храним координаты, их потом отправляем вместе с заданием, для сохранения места проведения
  const [coords, setCoords] = useState<number[]>([]);

  const mapData = {
    center: [55.751574, 37.573856],
    zoom: 5,
    controls: ['zoomControl', 'fullscreenControl'],
  };

  const onMapClick = (event: any) => {
    setCoords((state) => [...state, event.get('coords')]);
  };

  return (
    <div className="task-editor-maps">
      <YMaps
        query={{
          apikey: 'a4b10d40-705d-42bc-8f57-732d5435907d',
          load: 'package.full',
          ns: 'use-load-option',
          lang: 'ru_RU',
        }}
      >
        <Map
          onClick={onMapClick}
          defaultState={mapData}
          width={600}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
        >
          {coords.map((coord: any) => (
            <Placemark key={coord.join(',')} geometry={coord} />
          ))}
          <SearchControl options={{ float: 'right' }} />
        </Map>
      </YMaps>
    </div>
  );
};
