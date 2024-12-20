export const LAYERS = [
    {
        id: 'continent',
        name: 'Continent'
    },
    {
        id: 'country',
        name: 'country'
    },
    {
        id: 'state',
        name: 'State'
    },
    {
        id: 'city',
        name: 'City'
    },
    {
        id: 'township',
        name: 'Township'
    },
]

export const getLayersArr = () => {
    return LAYERS.map(each => each.id)
}