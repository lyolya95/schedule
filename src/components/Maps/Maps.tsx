import React, { FC, useCallback, useState } from 'react';
import { Map, Placemark, SearchControl, YMaps } from 'react-yandex-maps';
import { MapsProps } from './Maps.model';
import './Maps.scss';

export const Maps: FC<MapsProps> = ({ isMentorStatus, chosenCoordinates, changeCoords }) => {
  // в coords храним координаты, их потом отправляем вместе с заданием, для сохранения места проведения
  const [coords, setCoords] = useState<number[]>(chosenCoordinates);

  const mapData = {
    center: chosenCoordinates && chosenCoordinates.length > 0 ? chosenCoordinates : [55.751574, 37.573856],
    zoom: 5,
    controls: ['zoomControl', 'fullscreenControl'],
  };

  const onMapClick = useCallback(
    (event: any) => {
      const newState = event.get('coords');
      if (changeCoords) {
        changeCoords(newState);
      }
      setCoords(newState);
    },
    [changeCoords]
  );

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
        {isMentorStatus ? (
          <Map
            onClick={onMapClick}
            defaultState={mapData}
            width={600}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
          >
            {<Placemark key={coords?.join(',')} geometry={coords} />}
            <SearchControl options={{ float: 'right' }} />
          </Map>
        ) : (
          <Map defaultState={mapData} width={600} modules={['control.ZoomControl', 'control.FullscreenControl']}>
            {<Placemark key={coords?.join(',')} geometry={coords} />}
          </Map>
        )}
      </YMaps>
    </div>
  );
};
