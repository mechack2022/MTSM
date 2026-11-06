-- ============================================================================
-- Nigerian States and Local Governments Tables
-- ============================================================================

-- States Table
CREATE TABLE states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_states_name ON states(name);
CREATE INDEX idx_states_code ON states(code);

-- Local Governments Table
CREATE TABLE local_governments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    state_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lga_state FOREIGN KEY (state_id)
        REFERENCES states(id) ON DELETE CASCADE,
    CONSTRAINT uk_lga_name_state UNIQUE (name, state_id)
);

CREATE INDEX idx_lga_state_id ON local_governments(state_id);
CREATE INDEX idx_lga_name ON local_governments(name);

-- Comments
COMMENT ON TABLE states IS 'Nigerian states (37 states + FCT)';
COMMENT ON TABLE local_governments IS 'Nigerian Local Government Areas (774 LGAs)';
COMMENT ON COLUMN states.code IS 'Short code for the state (e.g., LA for Lagos)';
COMMENT ON COLUMN local_governments.state_id IS 'Reference to parent state';
