
export interface AddressAPIResult {
  geometry: AddressAPIGeometry;
  properties: AddressAPIProperties;
  type: string; // @todo have a look at the documentation to put an enum here with "Point"|...
}

export interface AddressAPIProperties {
  city: string;
  oldcity: string;
  citycode: string;
  oldcitycode: string;
  context: string;
  housenumber?: string;
  id: string;
  importance: number;
  label: string;
  name: string;
  postcode: string;
  score: number;
  street: string;
  type: 'housenumber'|'street'|'locality'|'municipality';
  x: number;
  y: number;
}

interface AddressAPIGeometry {
  // tslint:disable-next-line:max-line-length
  type: 'Position'|'Point'|'MultiPoint'|'LineString'|'MultiLineString'|'Polygon'|'MultiPolygon'|'GeometryCollection'|'Antimeridian Cutting'|'Uncertainty and Precision';
  coordinates: AddressApiGeometryCoordinates;
}

interface AddressApiGeometryCoordinates {
  0: number;
  1: number;
}

export interface Address {
  address: {
    housenumber: string;
    street: string;
    postcode: string;
    city: string;
  };
  coordinates: {
    latitude: AddressApiGeometryCoordinates[0];
    longitude: AddressApiGeometryCoordinates[1];
  };
}
