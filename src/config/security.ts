// Security configuration for the application
export const SECURITY_CONFIG = {
 // Logging security settings
 LOGGING: {
 // Disable sensitive data logging in production
 SANITIZE_LOGS: process.env.NODE_ENV === 'production',
 
 // Log levels allowed in production
 PRODUCTION_LOG_LEVELS: ['error', 'warn', 'info'],
 
 // Sensitive keywords to redact from logs
 SENSITIVE_KEYWORDS: [
 'password',
 'secret',
 'token',
 'key',
 'auth',
 'credential',
 'private',
 'confidential',
 'api_key',
 'access_token',
 'refresh_token',
 'session_id'
 ]
 },
 
 // Password security requirements
 PASSWORD: {
 MIN_LENGTH: 8,
 REQUIRE_UPPERCASE: false,
 REQUIRE_LOWERCASE: false,
 REQUIRE_NUMBERS: false,
 REQUIRE_SPECIAL_CHARS: false,
 
 // Temporary password settings
 TEMP_PASSWORD_LENGTH: 12,
 TEMP_PASSWORD_EXPIRY_HOURS: 24
 },
 
 // Session security
 SESSION: {
 TIMEOUT_MINUTES: 60,
 REFRESH_THRESHOLD_MINUTES: 15,
 MAX_CONCURRENT_SESSIONS: 3
 },
 
 // Rate limiting
 RATE_LIMITING: {
 LOGIN_ATTEMPTS: {
 MAX_ATTEMPTS: 5,
 WINDOW_MINUTES: 15,
 LOCKOUT_MINUTES: 30
 },
 
 API_REQUESTS: {
 MAX_REQUESTS_PER_MINUTE: 100,
 MAX_REQUESTS_PER_HOUR: 1000
 }
 },
 
 // Data validation
 VALIDATION: {
 EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 PHONE_REGEX: /^[+]?[1-9][\d]{0,15}$/,
 
 // Input sanitization
 STRIP_HTML: true,
 MAX_INPUT_LENGTH: 1000,
 ALLOWED_FILE_TYPES: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']
 },
 
 // Security headers
 HEADERS: {
 CONTENT_SECURITY_POLICY: {
 'default-src': ["'self'"],
 'script-src': ["'self'","'unsafe-inline'", 'https://js.stripe.com'],
 'style-src': ["'self'","'unsafe-inline'", 'https://fonts.googleapis.com'],
 'font-src': ["'self'", 'https://fonts.gstatic.com'],
 'img-src': ["'self'", 'data:', 'https:'],
 'connect-src': ["'self'", 'https://api.stripe.com', 'wss://'],
 'frame-src': ["'self'", 'https://js.stripe.com']
 },
 
 X_FRAME_OPTIONS: 'DENY',
 X_CONTENT_TYPE_OPTIONS: 'nosniff',
 X_XSS_PROTECTION: '1; mode=block',
 REFERRER_POLICY: 'strict-origin-when-cross-origin'
 },
 
 // Environment-specific settings
 ENVIRONMENT: {
 IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
 IS_PRODUCTION: process.env.NODE_ENV === 'production',
 IS_TEST: process.env.NODE_ENV === 'test',
 
 // Debug settings
 ENABLE_DEBUG_LOGS: process.env.NODE_ENV === 'development',
 ENABLE_PERFORMANCE_MONITORING: process.env.NODE_ENV === 'production'
 }
} as const;

// Security utility functions
export const SecurityUtils = {
 /**
 * Check if current environment allows debug logging
 */
 canLogDebug(): boolean {
 return SECURITY_CONFIG.ENVIRONMENT.ENABLE_DEBUG_LOGS;
 },
 
 /**
 * Check if a log level is allowed in current environment
 */
 isLogLevelAllowed(level: string): boolean {
 if (SECURITY_CONFIG.ENVIRONMENT.IS_PRODUCTION) {
 return SECURITY_CONFIG.LOGGING.PRODUCTION_LOG_LEVELS.includes(level as 'error' | 'warn' | 'info');
 }
 return true;
 },
 
 /**
 * Generate a secure temporary password
 */
 generateSecurePassword(length: number = SECURITY_CONFIG.PASSWORD.TEMP_PASSWORD_LENGTH): string {
 const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
 let password = '';
 
 for (let i = 0; i < length; i++) {
 const randomIndex = Math.floor(Math.random() * charset.length);
 password += charset[randomIndex];
 }
 
 return password;
 },
 
 /**
 * Validate password strength
 */
 validatePassword(password: string): { isValid: boolean; errors: string[] } {
 const errors: string[] = [];
 const config = SECURITY_CONFIG.PASSWORD;
 
 if (password.length < config.MIN_LENGTH) {
 errors.push(`Password must be at least ${config.MIN_LENGTH} characters long`);
 }
 
 if (config.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
 errors.push('Password must contain at least one uppercase letter');
 }
 
 if (config.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
 errors.push('Password must contain at least one lowercase letter');
 }
 
 if (config.REQUIRE_NUMBERS && !/\d/.test(password)) {
 errors.push('Password must contain at least one number');
 }
 
 if (config.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
 errors.push('Password must contain at least one special character');
 }
 
 return {
 isValid: errors.length === 0,
 errors
 };
 }
};

export default SECURITY_CONFIG; 