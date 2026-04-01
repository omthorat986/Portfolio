const express = require('express');
const { getAnalytics, insertAnalyticsEvent } = require('../db');

const router = express.Router();

function validateAnalyticsPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return 'Request body must be a JSON object.';
  }

  if (typeof payload.eventType !== 'string' || !payload.eventType.trim()) {
    return 'eventType is required and must be a non-empty string.';
  }

  if (typeof payload.pagePath !== 'string' || !payload.pagePath.trim()) {
    return 'pagePath is required and must be a non-empty string.';
  }

  if (payload.metadata != null && typeof payload.metadata !== 'object') {
    return 'metadata must be an object when provided.';
  }

  return null;
}

router.get('/', async (req, res, next) => {
  try {
    const rawLimit = Number.parseInt(req.query.limit, 10);
    const limit = Number.isNaN(rawLimit) ? 100 : rawLimit;
    const analytics = await getAnalytics(limit);

    return res.status(200).json({
      data: analytics,
      meta: {
        count: analytics.length,
        limit: Math.min(Math.max(limit, 1), 1000)
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const validationError = validateAnalyticsPayload(req.body);
    if (validationError) {
      return res.status(400).json({
        error: {
          code: 'INVALID_PAYLOAD',
          message: validationError
        }
      });
    }

    const event = await insertAnalyticsEvent(req.body);

    return res.status(201).json({
      data: event
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
