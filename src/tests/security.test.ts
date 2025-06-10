import { describe } from 'vitest';

// Import all focused security test suites
import './security/xss-protection.test';
import './security/sql-injection.test';
import './security/email-validation.test';
import './security/rate-limiting.test';
import './security/business-logic.test';
import './security/authentication.test';

describe('Security Tests Suite', () => {
  // All individual security tests are imported above
  // This serves as the main entry point for security testing
  // Each test category is now in its own focused file:
  // - XSS Protection: xss-protection.test.ts
  // - SQL Injection: sql-injection.test.ts  
  // - Email Validation: email-validation.test.ts
  // - Rate Limiting: rate-limiting.test.ts
  // - Business Logic: business-logic.test.ts
  // - Authentication: authentication.test.ts
}); 