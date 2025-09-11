// TODO: Remove this file when GraphQL backend endpoints are ready
// This file provides mock data for development when backend queries are not available

// Mock Users Data
export const MOCK_USERS = {
  users: {
    data: [
      {
        id: '1',
        email: 'juan.perez@email.com',
        firstName: 'Juan',
        lastName: 'Pérez',
        phone: '+1-555-0123',
        type: 'CLIENT',
        isEnabled: true,
        createdAt: '2024-01-15T10:30:00Z',
        profile: {
          avatar: null,
          address: 'Calle 123, Ciudad',
        },
      },
      {
        id: '2',
        email: 'maria.garcia@email.com',
        firstName: 'María',
        lastName: 'García',
        phone: '+1-555-0124',
        type: 'DRIVER',
        isEnabled: true,
        createdAt: '2024-01-16T14:20:00Z',
        profile: {
          avatar: null,
          address: 'Avenida 456, Ciudad',
        },
      },
      {
        id: '3',
        email: 'carlos.lopez@email.com',
        firstName: 'Carlos',
        lastName: 'López',
        phone: '+1-555-0125',
        type: 'PARTNER',
        isEnabled: false,
        createdAt: '2024-01-17T09:15:00Z',
        profile: {
          avatar: null,
          address: 'Plaza 789, Ciudad',
        },
      },
    ],
    pagination: {
      total: 3,
      page: 1,
      limit: 20,
      totalPages: 1,
    },
  },
};

export const MOCK_USER = {
  user: {
    id: '1',
    email: 'juan.perez@email.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '+1-555-0123',
    type: 'CLIENT',
    isEnabled: true,
    createdAt: '2024-01-15T10:30:00Z',
    profile: {
      avatar: null,
      address: 'Calle 123, Ciudad',
      documentNumber: '12345678',
      birthDate: '1990-05-15',
    },
  },
};

// Mock Articles Data  
export const MOCK_ARTICLES = {
  articles: {
    data: [
      {
        id: '1',
        name: 'Smartphone Samsung Galaxy',
        description: 'Teléfono inteligente de última generación',
        category: 'Electronics',
        isEnabled: true,
        createdAt: '2024-01-10T08:00:00Z',
        variants: [
          {
            id: '1-1',
            name: 'Negro 128GB',
            price: 299.99,
            stock: 50,
          },
          {
            id: '1-2',
            name: 'Blanco 256GB', 
            price: 399.99,
            stock: 30,
          },
        ],
      },
      {
        id: '2',
        name: 'Laptop HP Pavilion',
        description: 'Computadora portátil para trabajo y estudios',
        category: 'Electronics',
        isEnabled: true,
        createdAt: '2024-01-11T09:00:00Z',
        variants: [
          {
            id: '2-1',
            name: '8GB RAM, 256GB SSD',
            price: 699.99,
            stock: 25,
          },
        ],
      },
    ],
    pagination: {
      total: 2,
      page: 1,
      limit: 20,
      totalPages: 1,
    },
  },
};

export const MOCK_ARTICLE = {
  article: {
    id: '1',
    name: 'Smartphone Samsung Galaxy',
    description: 'Teléfono inteligente de última generación con características avanzadas',
    category: 'Electronics',
    isEnabled: true,
    createdAt: '2024-01-10T08:00:00Z',
    variants: [
      {
        id: '1-1',
        name: 'Negro 128GB',
        price: 299.99,
        stock: 50,
        weight: 0.2,
        dimensions: '15x7x0.8cm',
      },
      {
        id: '1-2',
        name: 'Blanco 256GB',
        price: 399.99,
        stock: 30,
        weight: 0.2,
        dimensions: '15x7x0.8cm',
      },
    ],
  },
};

// Mock Delivery Types Data
export const MOCK_DELIVERY_TYPES = {
  deliveryTypes: {
    data: [
      {
        id: '1',
        name: 'Entrega Estándar',
        description: 'Entrega en 24-48 horas',
        price: 5.99,
        estimatedTime: '1-2 días',
        isEnabled: true,
      },
      {
        id: '2',
        name: 'Entrega Express',
        description: 'Entrega en 2-4 horas',
        price: 12.99,
        estimatedTime: '2-4 horas',
        isEnabled: true,
      },
      {
        id: '3',
        name: 'Entrega Programada',
        description: 'Entrega en fecha y hora específica',
        price: 8.99,
        estimatedTime: 'Programable',
        isEnabled: true,
      },
    ],
  },
};

// Mock Orders Data
export const MOCK_ORDER = {
  order: {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'PENDING',
    type: 'DELIVERY',
    totalAmount: 315.97,
    createdAt: '2024-01-20T10:30:00Z',
    client: {
      id: '1',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@email.com',
      phone: '+1-555-0123',
    },
    driver: {
      id: '2',
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@email.com',
      phone: '+1-555-0124',
    },
    items: [
      {
        id: '1',
        article: {
          id: '1',
          name: 'Smartphone Samsung Galaxy',
          variant: 'Negro 128GB',
        },
        quantity: 1,
        price: 299.99,
      },
    ],
    deliveryAddress: {
      street: 'Calle 123',
      city: 'Ciudad',
      state: 'Estado',
      postalCode: '12345',
    },
    deliveryType: {
      id: '1',
      name: 'Entrega Estándar',
      price: 5.99,
    },
  },
};

// Mock Locations Data
export const MOCK_COUNTRIES = {
  countries: {
    data: [
      {
        id: '1',
        name: 'Argentina',
        code: 'AR',
        isEnabled: true,
      },
      {
        id: '2',
        name: 'Chile',
        code: 'CL',
        isEnabled: true,
      },
      {
        id: '3',
        name: 'Colombia',
        code: 'CO',
        isEnabled: true,
      },
    ],
  },
};

export const MOCK_STATES = {
  states: {
    data: [
      {
        id: '1',
        name: 'Buenos Aires',
        country: { id: '1', name: 'Argentina' },
        isEnabled: true,
      },
      {
        id: '2',
        name: 'Córdoba',
        country: { id: '1', name: 'Argentina' },
        isEnabled: true,
      },
    ],
  },
};

export const MOCK_CITIES = {
  cities: {
    data: [
      {
        id: '1',
        name: 'La Plata',
        state: { id: '1', name: 'Buenos Aires' },
        country: { id: '1', name: 'Argentina' },
        isEnabled: true,
      },
      {
        id: '2',
        name: 'Mar del Plata',
        state: { id: '1', name: 'Buenos Aires' },
        country: { id: '1', name: 'Argentina' },
        isEnabled: true,
      },
    ],
  },
};

export const MOCK_MUNICIPALITIES = {
  municipalities: {
    data: [
      {
        id: '1',
        name: 'Centro',
        city: { id: '1', name: 'La Plata' },
        state: { id: '1', name: 'Buenos Aires' },
        isEnabled: true,
      },
      {
        id: '2',
        name: 'Zona Norte',
        city: { id: '1', name: 'La Plata' },
        state: { id: '1', name: 'Buenos Aires' },
        isEnabled: true,
      },
    ],
  },
};

export const MOCK_NEIGHBORHOODS = {
  neighborhoods: {
    data: [
      {
        id: '1',
        name: 'Casco Urbano',
        municipality: { id: '1', name: 'Centro' },
        city: { id: '1', name: 'La Plata' },
        isEnabled: true,
      },
      {
        id: '2',
        name: 'Barrio Norte',
        municipality: { id: '2', name: 'Zona Norte' },
        city: { id: '1', name: 'La Plata' },
        isEnabled: true,
      },
    ],
  },
};

// Mock Partners Data
export const MOCK_PARTNERS = {
  partners: {
    data: [
      {
        id: '1',
        name: 'TechStore',
        email: 'contact@techstore.com',
        phone: '+1-555-0200',
        type: 'RETAILER',
        isEnabled: true,
        address: 'Av. Principal 123, Ciudad',
      },
      {
        id: '2',
        name: 'FastDelivery',
        email: 'ops@fastdelivery.com',
        phone: '+1-555-0201',
        type: 'LOGISTICS',
        isEnabled: true,
        address: 'Calle Comercio 456, Ciudad',
      },
    ],
  },
};

// Mock Pricing Data
export const MOCK_PRICING_RULES = {
  pricingRules: {
    data: [
      {
        id: '1',
        name: 'Precio Base Electrónicos',
        category: 'Electronics',
        basePrice: 10.0,
        multiplier: 1.15,
        isEnabled: true,
      },
      {
        id: '2',
        name: 'Descuento Volumen',
        category: 'All',
        basePrice: 0.0,
        multiplier: 0.9,
        minQuantity: 5,
        isEnabled: true,
      },
    ],
  },
};

// Mock Data Hooks - Replace useQuery calls temporarily
export const createMockQueryHook = (mockData: any) => ({
  data: mockData,
  loading: false,
  error: null,
  refetch: () => Promise.resolve({ data: mockData }),
  networkStatus: 7, // Ready
  called: true,
});

// Mock Mutation Hook
export const createMockMutationHook = () => [
  async (variables?: any) => {
    // Simulate successful mutation
    return { data: { success: true } };
  },
  {
    loading: false,
    error: null,
    called: false,
  },
];

// Specific mock hooks for common patterns
export const useMockUsersQuery = () => createMockQueryHook(MOCK_USERS);
export const useMockUserQuery = () => createMockQueryHook(MOCK_USER);
export const useMockArticlesQuery = () => createMockQueryHook(MOCK_ARTICLES);
export const useMockArticleQuery = () => createMockQueryHook(MOCK_ARTICLE);
export const useMockOrderQuery = () => createMockQueryHook(MOCK_ORDER);
export const useMockCountriesQuery = () => createMockQueryHook(MOCK_COUNTRIES);
export const useMockStatesQuery = () => createMockQueryHook(MOCK_STATES);
export const useMockCitiesQuery = () => createMockQueryHook(MOCK_CITIES);
export const useMockMunicipalitiesQuery = () => createMockQueryHook(MOCK_MUNICIPALITIES);
export const useMockNeighborhoodsQuery = () => createMockQueryHook(MOCK_NEIGHBORHOODS);
export const useMockPartnersQuery = () => createMockQueryHook(MOCK_PARTNERS);
export const useMockPricingRulesQuery = () => createMockQueryHook(MOCK_PRICING_RULES);
export const useMockDeliveryTypesQuery = () => createMockQueryHook(MOCK_DELIVERY_TYPES);

// Mock mutation hooks
export const useMockCreateDeliveryTypeMutation = createMockMutationHook;
export const useMockUpdateDeliveryTypeMutation = createMockMutationHook;
export const useMockCreateCityMutation = createMockMutationHook;
export const useMockCreateCountryMutation = createMockMutationHook;
export const useMockCreateStateMutation = createMockMutationHook;
export const useMockCreateMunicipalityMutation = createMockMutationHook;
export const useMockCreateNeighborhoodMutation = createMockMutationHook;