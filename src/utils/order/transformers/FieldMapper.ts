/**
 * Utility class for mapping fields between different data formats
 * Handles common field mapping patterns and type conversions
 */
export class FieldMapper {
 /**
 * Maps a string field from multiple possible field names
 * @param data The source data object
 * @param fieldNames Array of possible field names to check
 * @returns The mapped string value or empty string as fallback
 */
 static mapStringField(data: Record<string, unknown>, fieldNames: string[]): string {
 for (const fieldName of fieldNames) {
 const value = data[fieldName];
 if (value !== undefined && value !== null) {
 return value as string;
 }
 }
 return '';
 }

 /**
 * Maps a number field from multiple possible field names
 * @param data The source data object
 * @param fieldNames Array of possible field names to check
 * @returns The mapped number value or 0 as fallback
 */
 static mapNumberField(data: Record<string, unknown>, fieldNames: string[]): number {
 for (const fieldName of fieldNames) {
 const value = data[fieldName];
 if (value !== undefined && value !== null) {
 return value as number;
 }
 }
 return 0;
 }

 /**
 * Maps a boolean field from multiple possible field names
 * @param data The source data object
 * @param fieldNames Array of possible field names to check
 * @returns The mapped boolean value or false as fallback
 */
 static mapBooleanField(data: Record<string, unknown>, fieldNames: string[]): boolean {
 for (const fieldName of fieldNames) {
 const value = data[fieldName];
 if (value !== undefined && value !== null) {
 return value as boolean;
 }
 }
 return false;
 }
} 