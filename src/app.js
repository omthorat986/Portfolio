const express = require('express');
const path = require('path');
const projectsRouter = require('./routes/projects');
const analyticsRouter = require('./routes/analytics');

const app = express();

app.use(express.json({ strict: true }));
app.use('/vendor', express.static(path.resolve(__dirname, '../node_modules')));

app.use('/api', (req, res, next) => {
  const acceptHeader = req.headers.accept || '';
  const acceptsJson =
    acceptHeader === '' ||
    acceptHeader.includes('application/json') ||
    acceptHeader.includes('*/*');

  if (!acceptsJson) {
    return res.status(406).json({
      error: {
        code: 'NOT_ACCEPTABLE',
        message: 'API endpoints only return application/json responses.'
      }
    });
  }

  if (['POST', 'PUT', 'PATCH'].includes(req.method) && !req.is('application/json')) {
    return res.status(415).json({
      error: {
        code: 'UNSUPPORTED_MEDIA_TYPE',
        message: 'Request body must be sent as application/json.'
      }
    });
  }

  return next();
});

app.use('/api/projects', projectsRouter);
app.use('/api/analytics', analyticsRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found.'
    }
  });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Malformed JSON request body.'
      }
    });
  }

  console.error(error);
  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.'
    }
  });
});

module.exports = app;
