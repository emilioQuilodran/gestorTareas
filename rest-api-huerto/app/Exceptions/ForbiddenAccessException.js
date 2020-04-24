'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ForbiddenAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error, {response}) {
     return response.status(403).json({
       error: 'acceso no permitido al recurso'
     });
   }
}

module.exports = ForbiddenAccessException
