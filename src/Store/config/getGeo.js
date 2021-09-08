export const getGeo = async (city) => {
    const response = await fetch(`http://search.maps.sputnik.ru/search/addr?q=${city}`);
    const geo = await response.json();
    return geo.result.address[0].features[0].geometry.geometries[0].coordinates.reverse();
}

