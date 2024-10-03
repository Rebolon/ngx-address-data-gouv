import {AddressAPIResult} from "../lib/ngx-address-data-gouv";

export const mock = {
  "type": "FeatureCollection",
  "version": "draft",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.792213,
          46.495502
        ]
      },
      "properties": {
        "label": "Rue napoléon 85100 Les Sables-d'Olonne",
        "score": 0.9733772727272727,
        "id": "85194_2190",
        "name": "Rue napoléon",
        "postcode": "85100",
        "citycode": "85194",
        "oldcitycode": "85194",
        "x": 332681.64,
        "y": 6610650.13,
        "city": "Les Sables-d'Olonne",
        "oldcity": "Les Sables-d'Olonne",
        "context": "85, Vendée, Pays de la Loire",
        "type": "street",
        "importance": 0.70715,
        "street": "Rue napoléon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          9.449953,
          42.698296
        ]
      },
      "properties": {
        "label": "Rue Napoleon 20200 Bastia",
        "score": 0.968470909090909,
        "id": "2B033_1170",
        "name": "Rue Napoleon",
        "postcode": "20200",
        "citycode": "2B033",
        "x": 1228557.67,
        "y": 6199231.44,
        "city": "Bastia",
        "context": "2B, Haute-Corse, Corse",
        "type": "street",
        "importance": 0.65318,
        "street": "Rue Napoleon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.079564,
          44.117731
        ]
      },
      "properties": {
        "label": "Rue Napoléon 30100 Alès",
        "score": 0.9673172727272726,
        "id": "30007_1850",
        "name": "Rue Napoléon",
        "postcode": "30100",
        "citycode": "30007",
        "x": 786406.19,
        "y": 6336004.74,
        "city": "Alès",
        "context": "30, Gard, Occitanie",
        "type": "street",
        "importance": 0.64049,
        "street": "Rue Napoléon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.377516,
          50.332984
        ]
      },
      "properties": {
        "label": "Rue Napoléon 59220 Denain",
        "score": 0.96567,
        "id": "59172_0721",
        "name": "Rue Napoléon",
        "postcode": "59220",
        "citycode": "59172",
        "x": 726914.17,
        "y": 7026199.46,
        "city": "Denain",
        "context": "59, Nord, Hauts-de-France",
        "type": "street",
        "importance": 0.62237,
        "street": "Rue Napoléon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.825544,
          49.417104
        ]
      },
      "properties": {
        "label": "Rue Napoléon 60200 Compiègne",
        "score": 0.9627745454545454,
        "id": "60159_2550",
        "name": "Rue Napoléon",
        "postcode": "60200",
        "citycode": "60159",
        "x": 687337.26,
        "y": 6924196.3,
        "city": "Compiègne",
        "context": "60, Oise, Hauts-de-France",
        "type": "street",
        "importance": 0.59052,
        "street": "Rue Napoléon"
      }
    }
  ] as AddressAPIResult[],
  "attribution": "BAN",
  "licence": "ETALAB-2.0",
  "query": "rue napoléon",
  "limit": 5
};
