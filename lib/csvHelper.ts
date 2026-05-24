import Papa from 'papaparse';
import { Product, ProductType, StoneType } from '../types';

// CSV Headers matching Product fields
export const CSV_HEADERS = [
    'id', // For updates
    'title',
    'handle',
    'price',
    'inventory',
    'type',
    'stone',
    'image', // Primary image
    'images', // Comma separated
    'description_text', // Main Description
    'specifications', // JSON string e.g. {"Material":"Silver"}
    'stone_benefits',
    'care_guide',
    'style_note',
    'tags' // Comma separated
];

export interface CsvProductRow {
    id?: string;
    title: string;
    handle?: string;
    price: string | number; // CSV might give string
    inventory?: string | number;
    type: string;
    stone: string;
    image?: string;
    images?: string;
    description_text?: string;
    specifications?: string;
    stone_benefits?: string;
    care_guide?: string;
    style_note?: string;
    tags?: string;
}

export const generateCsvTemplate = (): string => {
    // Header row
    const headers = CSV_HEADERS.join(',');

    // Example row
    const example = [
        '', // id
        'Sample Gold Ring', // title
        'sample-gold-ring', // handle
        '1000', // price
        '50', // inventory
        'Ring', // type - Must match ProductType
        'Amethyst', // stone - Must match StoneType (case sensitive usually, but we'll normalize)
        'https://example.com/image.jpg', // image
        'https://example.com/img1.jpg,https://example.com/img2.jpg', // images
        'A beautiful amethyst ring.', // description_text
        '{"Material": "Silver", "Finish": "Gold"}', // specifications (JSON)
        'Calming and protective.', // stone_benefits
        'Avoid water.', // care_guide
        'Wear with pride.', // style_note
        'new,bestseller' // tags
    ].map(field => `"${field.replace(/"/g, '""')}"`).join(','); // Quote and escape

    return `${headers}\n${example}`;
};

export const exportProductsToCsv = (products: Product[]): string => {
    const data = products.map(p => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        price: p.price,
        inventory: p.inventory,
        type: p.type,
        stone: p.stone,
        image: p.image,
        images: p.images ? p.images.join(',') : '',
        description_text: p.description_text || '',
        specifications: JSON.stringify(p.specifications || {}),
        stone_benefits: p.stone_benefits || '',
        care_guide: p.care_guide || '',
        style_note: p.style_note || '',
        tags: p.tags ? p.tags.join(',') : ''
    }));

    return Papa.unparse(data, {
        columns: CSV_HEADERS
    });
};

export interface ValidationResult {
    valid: boolean;
    errors: string[];
    row: CsvProductRow;
    parsedProduct?: Partial<Product>;
}

export const validateAndParseRow = (row: CsvProductRow): ValidationResult => {
    const errors: string[] = [];
    const validTypes = Object.values(ProductType);
    const validStones = Object.values(StoneType);

    // Required fields
    if (!row.title) errors.push('Title is required');
    if (!row.price) errors.push('Price is required');

    // Validate Type
    // Case insensitive check
    const matchedType = validTypes.find(t => t.toLowerCase() === row.type?.toLowerCase());
    if (!matchedType) {
        errors.push(`Invalid Type: '${row.type}'. Allowed: ${validTypes.join(', ')}`);
    }

    // Validate Stone
    const matchedStone = validStones.find(s => s.toLowerCase() === row.stone?.toLowerCase());
    if (!matchedStone) {
        errors.push(`Invalid Stone: '${row.stone}'. Allowed: ${validStones.join(', ')}`);
    }

    // Parse JSON specs
    let parsedSpecs = {};
    if (row.specifications) {
        try {
            parsedSpecs = JSON.parse(row.specifications);
        } catch (e) {
            errors.push('Invalid JSON in specifications');
        }
    }

    // Construct Product Object if valid
    let parsedProduct: Partial<Product> | undefined;
    if (errors.length === 0) {
        parsedProduct = {
            id: row.id, // If present, implies update
            title: row.title,
            handle: row.handle || row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            price: Number(row.price),
            inventory: Number(row.inventory || 0),
            type: matchedType as ProductType,
            stone: matchedStone as StoneType,
            image: row.image || '',
            images: row.images ? row.images.split(',').map(s => s.trim()) : [],
            description_text: row.description_text,
            specifications: parsedSpecs,
            stone_benefits: row.stone_benefits,
            care_guide: row.care_guide,
            style_note: row.style_note,
            tags: row.tags ? row.tags.split(',').map(s => s.trim()) : []
        };
    }

    return {
        valid: errors.length === 0,
        errors,
        row,
        parsedProduct
    };
};
