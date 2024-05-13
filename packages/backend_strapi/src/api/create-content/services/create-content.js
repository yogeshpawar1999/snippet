'use strict';

/**
 * create-content service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::create-content.create-content');
