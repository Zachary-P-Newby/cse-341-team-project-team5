const hookRegionSorter = () => {
    const regionSelect = document.getElementById('region-filter');
    if (regionSelect) {
        regionSelect.addEventListener('change', () => {
            const selectedRegion = regionSelect.value;
            const url = new URL(window.location.href);

            if (selectedRegion && selectedRegion !== 'all') {
                url.searchParams.set('region', selectedRegion);
            } else {
                url.searchParams.delete('region');
            }
            
            window.location.href = url.toString();
        });
    }
};

const hookSeasonSorter = () => {
    const seasonSelect = document.getElementById('season-filter');
    if (seasonSelect) {
        seasonSelect.addEventListener('change', () => {
            const selectedSeason = seasonSelect.value;
            const url = new URL(window.location.href);

            if (selectedSeason && selectedSeason !== 'all') {
                url.searchParams.set('season', selectedSeason);
            } else {
                url.searchParams.delete('season');
            }
            
            window.location.href = url.toString();
        });
    }
};

const hookTrainsCatalog = async () => {
    const listEl = document.getElementById('trains-list');
    const templateEl = document.getElementById('train-card-template');
    const loadingEl = document.getElementById('trains-loading');
    const errorEl = document.getElementById('trains-error');

    if (!listEl || !templateEl) {
        return;
    }

    try {
        const response = await fetch('/api/trains');
        if (!response.ok) {
            throw new Error(`Failed to load trains (${response.status})`);
        }

        const payload = await response.json();
        const trains = payload.trains || [];
        const fragment = document.createDocumentFragment();

        trains.forEach((train) => {
            const card = templateEl.content.cloneNode(true);
            const imageEl = card.querySelector('[data-field="image"]');

            imageEl.src = train.imageUrl;
            imageEl.alt = train.imageAlt || `${train.name} train`;

            card.querySelector('[data-field="name"]').textContent = train.name;
            card.querySelector('[data-field="operator"]').textContent = train.operator;
            card.querySelector('[data-field="type"]').textContent = train.type;
            card.querySelector('[data-field="speed"]').textContent = `${train.maxSpeedKmh} km/h`;
            card.querySelector('[data-field="seats"]').textContent = `${train.capacity} seats`;
            card.querySelector('[data-field="power"]').textContent = train.powerSource;
            card.querySelector('[data-field="description"]').textContent = train.description;
            card.querySelector('[data-field="best-for"]').textContent = train.bestFor;

            fragment.appendChild(card);
        });

        listEl.replaceChildren(fragment);
        if (loadingEl) {
            loadingEl.hidden = true;
        }
    } catch (error) {
        if (loadingEl) {
            loadingEl.hidden = true;
        }
        if (errorEl) {
            errorEl.hidden = false;
            errorEl.textContent = 'Unable to load trains right now. Please try again in a moment.';
        }
    }
};

const hookTripsCatalog = async () => {
    const loadingEl = document.getElementById('trips-loading');
    const errorEl = document.getElementById('trips-error');
    const listEl = document.getElementById('trips-list');
    const template = document.getElementById('trip-card-template');

    try {
        const response = await fetch('/api/trips');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const payload = await response.json();
        const trips = payload.trips || [];
        loadingEl.hidden = true;

        if (!Array.isArray(trips) || trips.length === 0) {
            errorEl.textContent = 'No trips available at this time.';
            errorEl.hidden = false;
            return;
        }

        trips.forEach((trip) => {
            const clone = template.content.cloneNode(true);
            const img = clone.querySelector('[data-field="image"]');

            if (trip.imageUrl) {
                img.src = trip.imageUrl;
                img.alt = trip.name;
            }

            clone.querySelector('[data-field="name"]').textContent = trip.name;
            clone.querySelector('[data-field="region"]').textContent = trip.region;
            clone.querySelector('[data-field="description"]').textContent = trip.description;
            clone.querySelector('[data-field="route"]').textContent = `${trip.startStation} → ${trip.endStation}`;
            clone.querySelector('[data-field="duration"]').textContent = trip.duration;
            clone.querySelector('[data-field="distance"]').textContent = `${trip.distance} km`;
            clone.querySelector('[data-field="bestSeason"]').textContent = trip.bestSeason || 'Year-round';
            clone.querySelector('[data-field="highlights"]').textContent = Array.isArray(trip.highlights)
                ? trip.highlights.join(', ')
                : '';

            const link = clone.querySelector('[data-field="details-link"]');
            link.href = `/trips/${encodeURIComponent(trip.id)}`;

            listEl.appendChild(clone);
        });
    } catch (error) {
        console.error('Failed to load trips:', error);
        loadingEl.hidden = true;
        errorEl.textContent = 'Unable to load trips right now. Please try again later.';
        errorEl.hidden = false;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    hookRegionSorter();
    hookSeasonSorter();
    hookTrainsCatalog();
    hookTripsCatalog();
});
