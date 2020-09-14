import React, { useState } from 'react';
import { GeolocationControl, Map, Placemark, SearchControl, YMaps } from 'react-yandex-maps';
import './Maps.scss';

export const Maps = () => {
  // в coords храним координаты, их потом отправляем вместе с заданием, для сохранения места проведения
  const [coords, setCoords] = useState<number[]>([]);

  const mapData = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  const onMapClick = (event: any) => {
    setCoords((state) => [...state, event.get('coords')]);
    console.log(coords);
  };

  return (
    <div className="task-editor-maps">
      <YMaps>
        <Map onClick={onMapClick} defaultState={mapData} width={550}>
          {coords.map((coord: any) => (
            <Placemark key={coord.join(',')} geometry={coord} />
          ))}
          <SearchControl options={{ float: 'right' }} />
          <GeolocationControl options={{ float: 'left' }} />
        </Map>
      </YMaps>
    </div>
  );
};
