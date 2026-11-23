CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    school_id UUID NOT NULL,
    tenant_id UUID NOT NULL,
    staff_number VARCHAR(50) UNIQUE,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),

    school_section VARCHAR(50) NOT NULL,
    primary_role VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    subjects_taught TEXT,

    highest_qualification VARCHAR(100),
    institution_attended VARCHAR(200),
    year_of_graduation INTEGER,
    trcn_license_number VARCHAR(50),
    trcn_verified BOOLEAN NOT NULL DEFAULT FALSE,

    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    state_of_origin VARCHAR(100),
    local_government VARCHAR(100),

    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(50),

    employment_type VARCHAR(50),
    employment_status VARCHAR(50),
    date_of_employment DATE,
    contract_end_date DATE,

    basic_salary DOUBLE PRECISION,
    bank_name VARCHAR(100),
    account_number VARCHAR(20),
    account_name VARCHAR(100),

    is_form_tutor BOOLEAN NOT NULL DEFAULT FALSE,
    assigned_class_id UUID,
    assigned_class_name VARCHAR(100),

    bio TEXT,
    specialization VARCHAR(200),
    years_of_experience INTEGER,
    profile_photo_url VARCHAR(500),

    account_provisioned BOOLEAN NOT NULL DEFAULT FALSE,
    invitation_sent_at TIMESTAMP,
    invitation_accepted_at TIMESTAMP,
    account_activated_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    created_by UUID,
    updated_by UUID,

    CONSTRAINT fk_staff_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_staff_school FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    CONSTRAINT fk_staff_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE INDEX idx_staff_user_id ON staff(user_id);
CREATE INDEX idx_staff_school_id ON staff(school_id);
CREATE INDEX idx_staff_email ON staff(email);
CREATE INDEX idx_staff_number ON staff(staff_number);
CREATE INDEX idx_staff_section ON staff(school_section);
CREATE INDEX idx_staff_primary_role ON staff(primary_role);
CREATE INDEX idx_staff_employment_status ON staff(employment_status);
CREATE INDEX idx_staff_deleted_at ON staff(deleted_at);
