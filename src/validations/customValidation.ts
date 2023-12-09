import { LanguageMessages } from 'joi';

export const customValidation = (field: string, pattern?: string): LanguageMessages => ({
    'any.required': `${field} is required`,
    'any.empty': `${field} is not empty`,
    'array.sparse': `${field} is required with pattern: ${pattern}`,
    'string.empty': `${field} is not empty`,
    'string.min': `${field} field does not respect the minimum number of characters`,
    'string.max': `${field} field does not respect the maximum number of characters`,
    'string.pattern.base': `${field} expected with pattern: ${pattern}`,
    'number.base': `${field} is a numeric field`,
    'number.min': `${field} should be at least ${pattern}`,
    'items.min': `${field} should not be empty`,
});
