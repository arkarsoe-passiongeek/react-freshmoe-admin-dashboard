export const data: {
    [id: string]: any;
} = [
        {
            id: 'NA',
            parent: null,
            nested: true,
            name: 'North America',
            layer: {
                id: 'continent',
                name: 'Continent'
            },
            priority: {
                id: 'one',
                name: 'One'
            },
            slug: 'north-america'
        },
        // country
        {
            id: 'US',
            parent: 'north-america',
            nested: true,
            name: 'United States',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'united-states'
        },
        // state and region
        {
            id: 'CA',
            parent: 'united-states',
            nested: true,
            name: 'California',
            layer: {
                id: 'state',
                name: 'State'
            },
            priority: {
                id: 'three',
                name: 'Three'
            },
            slug: 'california'
        },
        {
            id: 'TX',
            parent: 'united-states',
            nested: true,
            name: 'Texas',
            layer: {
                id: 'state',
                name: 'State'
            },
            priority: {
                id: 'three',
                name: 'Three'
            },
            slug: 'texas'
        },
        // end state and region
        {
            id: 'country-2',
            parent: 'north-america',
            nested: true,
            name: 'Canada',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'canada'
        },
        // end country
        {
            id: 'SA',
            parent: null,
            nested: true,
            name: 'South America',
            layer: {
                id: 'continent',
                name: 'Continent'
            },
            priority: {
                id: 'one',
                name: 'One'
            },
            slug: 'south-america'
        },
        // country
        {
            id: 'country-3',
            parent: 'south-america',
            nested: true,
            name: 'Brazil',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'brazil'
        },
        {
            id: 'country-4',
            parent: 'south-america',
            nested: true,
            name: 'Argentina',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'argentina'
        },
        {
            id: 'country-5',
            parent: 'south-america',
            nested: true,
            name: 'Colombia',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'colombia'
        },
        {
            id: 'country-6',
            parent: 'south-america',
            nested: true,
            name: 'Peru',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'peru'
        },
        {
            id: 'country-7',
            parent: 'south-america',
            nested: true,
            name: 'Chile',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'chile'
        },
        // end country
        {
            id: 'EU',
            parent: null,
            nested: true,
            name: 'Europe',
            layer: {
                id: 'continent',
                name: 'Continent'
            },
            priority: {
                id: 'one',
                name: 'One'
            },
            slug: 'europe'
        },
        // country
        {
            id: 'UK',
            parent: 'europe',
            nested: true,
            name: 'United Kingdom',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'united-kingdom'
        },
        {
            id: 'FR',
            parent: 'europe',
            nested: true,
            name: 'France',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'france'
        },
        {
            id: 'DE',
            parent: 'europe',
            nested: true,
            name: 'Germany',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'germany'
        },
        {
            id: 'IT',
            parent: 'europe',
            nested: true,
            name: 'Italy',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'italy'
        },
        {
            id: 'ES',
            parent: 'europe',
            nested: true,
            name: 'Spain',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'spain'
        },
        // end country
        {
            id: 'AS',
            parent: null,
            nested: true,
            name: 'Asia',
            layer: {
                id: 'continent',
                name: 'Continent'
            },
            priority: {
                id: 'one',
                name: 'One'
            },
            slug: 'asia'
        },
        // country
        {
            id: 'CN',
            parent: 'asia',
            nested: true,
            name: 'China',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'china'
        },
        {
            id: 'IN',
            parent: 'asia',
            nested: true,
            name: 'India',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'india'
        },
        {
            id: 'JP',
            parent: 'asia',
            nested: true,
            name: 'Japan',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'japan'
        },
        {
            id: 'KR',
            parent: 'asia',
            nested: true,
            name: 'South Korea',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'south-korea'
        },
        {
            id: 'ID',
            parent: 'asia',
            nested: true,
            name: 'Indonesia',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'indonesia'
        },
        // end country
        {
            id: 'AF',
            parent: null,
            nested: true,
            name: 'Africa',
            layer: {
                id: 'continent',
                name: 'Continent'
            },
            priority: {
                id: 'one',
                name: 'One'
            },
            slug: 'africa'
        },
        // country
        {
            id: 'EG',
            parent: 'africa',
            nested: true,
            name: 'Egypt',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'egypt'
        },
        {
            id: 'NG',
            parent: 'africa',
            nested: true,
            name: 'Nigeria',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'nigeria'
        },
        {
            id: 'ZA',
            parent: 'africa',
            nested: true,
            name: 'South Africa',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'south-africa'
        },
        {
            id: 'ET',
            parent: 'africa',
            nested: true,
            name: 'Ethiopia',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'ethiopia'
        },
        {
            id: 'DZ',
            parent: 'africa',
            nested: true,
            name: 'Algeria',
            layer: {
                id: 'country',
                name: 'Country'
            },
            priority: {
                id: 'two',
                name: 'Two'
            },
            slug: 'algeria'
        }
        // end country
    ];
