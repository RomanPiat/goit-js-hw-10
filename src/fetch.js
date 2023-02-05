export default function fetchCountries(url, country) {
    return fetch(`${url}/${country}?fields=name,capital,population,flag,languages`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
    
}