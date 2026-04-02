import { z } from 'zod';

/**
 * Ethereum address validation
 */
export const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address');

/**
 * Transaction hash validation
 */
export const txHashSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash');

/**
 * UUID validation
 */
export const uuidSchema = z.string().uuid();

/**
 * Email validation
 */
export const emailSchema = z.string().email();

/**
 * Brazilian CPF validation
 */
export const cpfSchema = z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF format');

/**
 * Brazilian CNPJ validation
 */
export const cnpjSchema = z
  .string()
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'Invalid CNPJ format');

/**
 * Positive number validation
 */
export const positiveNumberSchema = z.number().positive();

/**
 * BigInt string validation (for token amounts)
 */
export const bigIntStringSchema = z.string().regex(/^\d+$/, 'Must be a valid integer string');

/**
 * ISO country code validation
 */
export const countryCodeSchema = z.string().length(2).toUpperCase();

/**
 * Pagination params schema
 */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
