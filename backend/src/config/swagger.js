import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Meal Master API',
    version: '1.0.0',
    description: 'Backend API documentation for Meal Master.'
  },
  servers: [
    ...(globalThis.process?.env?.RENDER_EXTERNAL_URL
      ? [{ url: globalThis.process.env.RENDER_EXTERNAL_URL, description: 'Production server' }]
      : []),
    {
      url: `http://localhost:${globalThis.process?.env?.PORT || 5000}`,
      description: 'Local server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  definition: swaggerDefinition,
  apis: ['src/routes/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
