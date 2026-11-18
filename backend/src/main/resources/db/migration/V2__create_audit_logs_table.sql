CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    school_id UUID,
    user_id UUID,
    user_name VARCHAR(255) NOT NULL,
    user_role VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    event_title VARCHAR(500) NOT NULL,
    event_description TEXT,
    affected_entity VARCHAR(500),
    affected_entity_type VARCHAR(50),
    affected_entity_id UUID,
    ip_address VARCHAR(45),
    device_info VARCHAR(500),
    geo_location VARCHAR(255),
    change_from TEXT,
    change_to TEXT,
    change_reason TEXT,
    verification_method VARCHAR(255),
    event_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    severity VARCHAR(20),
    is_system_generated BOOLEAN NOT NULL DEFAULT FALSE,
    metadata JSONB,
    integrity_hash VARCHAR(128),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_audit_log_tenant_id ON audit_logs(tenant_id);
CREATE INDEX idx_audit_log_category ON audit_logs(category);
CREATE INDEX idx_audit_log_event_timestamp ON audit_logs(event_timestamp DESC);
CREATE INDEX idx_audit_log_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_log_school_id ON audit_logs(school_id);
CREATE INDEX idx_audit_log_severity ON audit_logs(severity);
CREATE INDEX idx_audit_log_affected_entity_id ON audit_logs(affected_entity_id);
