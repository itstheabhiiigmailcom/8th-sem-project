/**
 * @typedef {'flower' | 'bush' | 'tree'} PlantType
 */

/**
 * @typedef {Object} PlantInfo
 * @property {string} name - Plant name
 * @property {string} scientificName - Scientific name
 * @property {string} description - Plant description
 * @property {PlantType} type - Type of plant
 * @property {string} color - Color of the plant
 * @property {string} height - Height of the plant
 * @property {string} nativeTo - Native region
 * @property {string} sunlight - Sunlight requirements
 * @property {string} waterNeeds - Water requirements
 * @property {string} careTips - Care tips
 * @property {Object} position - Position in 3D space
 * @property {number} position.x - X position
 * @property {number} position.y - Y position
 * @property {number} position.z - Z position
 * @property {number} scale - Scale of the plant
 */

// Plant data
const plantNames = [
  'Rose',
  'Tulip',
  'Daisy',
  'Sunflower',
  'Lily',
  'Orchid',
  'Carnation',
  'Daffodil',
  'Hydrangea',
  'Marigold',
  'Peony',
  'Chrysanthemum',
  'Lavender',
  'Oak',
  'Maple',
  'Pine',
  'Birch',
  'Willow',
  'Cedar',
  'Redwood',
  'Spruce',
  'Boxwood',
  'Azalea',
  'Rhododendron',
  'Holly',
  'Juniper',
  'Forsythia',
];

const scientificNames = [
  'Rosa spp.',
  'Tulipa spp.',
  'Bellis perennis',
  'Helianthus annuus',
  'Lilium spp.',
  'Orchidaceae',
  'Dianthus caryophyllus',
  'Narcissus spp.',
  'Hydrangea macrophylla',
  'Tagetes spp.',
  'Paeonia lactiflora',
  'Chrysanthemum spp.',
  'Lavandula spp.',
  'Quercus spp.',
  'Acer spp.',
  'Pinus spp.',
  'Betula spp.',
  'Salix spp.',
  'Cedrus spp.',
  'Sequoia sempervirens',
  'Picea spp.',
  'Buxus spp.',
  'Azalea spp.',
  'Rhododendron spp.',
  'Ilex spp.',
  'Juniperus spp.',
  'Forsythia spp.',
];

const descriptions = [
  'A classic garden favorite with fragrant blooms in various colors.',
  'Known for their cup-shaped flowers and wide range of colors.',
  'Simple yet charming flowers with white petals and yellow centers.',
  'Tall plants with large, bright yellow flowers that track the sun.',
  'Elegant flowers known for their striking appearance and sweet fragrance.',
  'Exotic and delicate flowers with intricate patterns and shapes.',
  'Popular cut flowers with ruffled petals and spicy fragrance.',
  'Spring-blooming bulbs with trumpet-shaped flowers.',
  'Shrubs with large, showy flower clusters that change color based on soil pH.',
  'Bright and cheerful flowers that bloom throughout the summer.',
  'Lush, full flowers with a sweet fragrance and impressive blooms.',
  'Fall-blooming flowers with intricate petal arrangements.',
  'Aromatic herb with purple flower spikes and silver-green foliage.',
  'Majestic trees known for their strength, longevity, and acorn production.',
  'Deciduous trees with distinctive lobed leaves that change color in fall.',
  'Evergreen coniferous trees with needle-like leaves and distinctive cones.',
  'Trees with distinctive white bark and delicate, triangular leaves.',
  'Graceful trees with long, sweeping branches that often grow near water.',
  'Aromatic evergreen trees with scale-like foliage.',
  'Towering evergreen trees known as some of the tallest in the world.',
  'Coniferous trees with a classic pyramidal shape and short needles.',
  'Dense evergreen shrubs often used for hedges and topiary.',
  'Flowering shrubs with vibrant blooms in spring.',
  'Large-flowered shrubs with leathery, evergreen leaves.',
  'Evergreen shrubs with glossy leaves and bright berries in winter.',
  'Versatile evergreen shrubs with scale-like or needle-like foliage.',
  'Early-blooming shrubs with bright yellow flowers that appear before leaves.',
];

const nativeRegions = [
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Africa',
  'Mediterranean',
  'Australia',
  'Japan',
  'China',
  'Mexico',
  'India',
  'Middle East',
  'Pacific Islands',
  'New Zealand',
];

const sunlightNeeds = [
  'Full sun',
  'Partial shade',
  'Full shade',
  'Morning sun/afternoon shade',
  'Dappled sunlight',
  'Bright indirect light',
];

const waterNeeds = [
  'Low (drought tolerant)',
  'Moderate',
  'High (regular watering)',
  'Keep soil moist',
  'Allow to dry between watering',
];

const careTips = [
  'Prune after flowering to maintain shape and encourage new growth.',
  'Fertilize monthly during growing season for best results.',
  'Protect from strong winds and extreme temperatures.',
  'Mulch around base to retain moisture and suppress weeds.',
  'Watch for pests like aphids and treat promptly if spotted.',
  'Divide every few years to prevent overcrowding and promote vigor.',
  'Apply balanced fertilizer in early spring before new growth appears.',
  'Provide support for tall varieties to prevent damage from wind or rain.',
  'Remove spent flowers regularly to encourage continued blooming.',
  'Apply organic compost annually to enrich soil and improve drainage.',
];

const flowerColors = [
  '#FF5555',
  '#FF88AA',
  '#FFAACC',
  '#FFDD99',
  '#FFFF88',
  '#DDFF99',
  '#AAFFAA',
  '#99FFEE',
  '#AADDFF',
  '#CCAAFF',
  '#FFAAFF',
  '#FFFFFF',
];

const foliageColors = [
  '#005500',
  '#007700',
  '#009900',
  '#00BB00',
  '#00DD00',
  '#227722',
  '#225522',
  '#447744',
  '#669966',
];

/**
 * Generate random plant data
 * @param {number} count - Number of plants to generate
 * @returns {PlantInfo[]} Array of plant data
 */
export function generatePlants(count) {
  const plants = [];

  for (let i = 0; i < count; i++) {
    // Determine plant type
    let type;
    const typeRand = Math.random();

    if (typeRand < 0.6) {
      type = 'flower';
    } else if (typeRand < 0.85) {
      type = 'bush';
    } else {
      type = 'tree';
    }

    // Set position with some clustering
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;

    // Set y position and scale based on type
    let y = 0;
    let scale = 1;

    if (type === 'flower') {
      y = 0;
      scale = Math.random() * 0.5 + 0.5;
    } else if (type === 'bush') {
      y = 0;
      scale = Math.random() * 0.7 + 0.8;
    } else {
      y = 0;
      scale = Math.random() * 1.5 + 1.5;
    }

    // Set color based on type
    const color =
      type === 'flower'
        ? flowerColors[Math.floor(Math.random() * flowerColors.length)]
        : foliageColors[Math.floor(Math.random() * foliageColors.length)];

    // Set height based on type and scale
    let height;
    if (type === 'flower') {
      height = `${Math.floor(scale * 30 + 10)} cm`;
    } else if (type === 'bush') {
      height = `${Math.floor(scale * 50 + 30)} cm`;
    } else {
      height = `${Math.floor(scale * 3 + 2)} m`;
    }

    // Create plant info
    const nameIndex = Math.floor(Math.random() * plantNames.length);

    plants.push({
      name: plantNames[nameIndex],
      scientificName: scientificNames[nameIndex % scientificNames.length],
      description: descriptions[nameIndex % descriptions.length],
      type,
      color,
      height,
      nativeTo: nativeRegions[Math.floor(Math.random() * nativeRegions.length)],
      sunlight: sunlightNeeds[Math.floor(Math.random() * sunlightNeeds.length)],
      waterNeeds: waterNeeds[Math.floor(Math.random() * waterNeeds.length)],
      careTips: careTips[Math.floor(Math.random() * careTips.length)],
      position: { x, y, z },
      scale,
    });
  }

  return plants;
}
