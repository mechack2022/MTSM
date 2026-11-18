ALTER TABLE email_verification DROP CONSTRAINT IF EXISTS email_verification_verification_type_check;

ALTER TABLE email_verification ADD CONSTRAINT email_verification_verification_type_check
CHECK (verification_type IN ('TENANT_ADMIN', 'SCHOOL_ADMIN', 'USER_SIGNUP', 'EMAIL_CHANGE', 'PASSWORD_RESET', 'GUARDIAN_EMAIL', 'CONTACT_EMAIL'));
