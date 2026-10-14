# Learner API - Postman Test Data

Base URL: `http://localhost:8080/api/v1/learners`

## Prerequisites
- Make sure you have valid UUIDs for `schoolId` and `gradeLevelId` from your database
- Ensure you have proper authentication and authorization headers configured
- Required permissions: LEARNER_CREATE, LEARNER_READ, LEARNER_UPDATE, LEARNER_DEACTIVATE

---

## 1. Create Learner
**Endpoint:** `POST /api/v1/learners`
**Required Permission:** `LEARNER_CREATE`

### Sample Request Body:

```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "John",
  "lastName": "Doe",
  "learnerNumber": "LRN2024001",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000",
  "dateOfBirth": "2010-05-15",
  "sex": "Male",
  "previousSchoolName": "Springfield Elementary"
}
```

### Additional Test Cases:

**Minimal Required Fields:**
```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Jane",
  "lastName": "Smith",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000"
}
```

**Female Student:**
```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Emily",
  "lastName": "Johnson",
  "learnerNumber": "LRN2024002",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000",
  "dateOfBirth": "2011-08-22",
  "sex": "Female",
  "previousSchoolName": "Oakwood Primary School"
}
```

**Transfer Student:**
```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Michael",
  "lastName": "Brown",
  "learnerNumber": "LRN2024003",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000",
  "dateOfBirth": "2009-12-03",
  "sex": "Male",
  "previousSchoolName": "Riverside High School"
}
```

---

## 2. Get All Learners
**Endpoint:** `GET /api/v1/learners`
**Required Permission:** `LEARNER_READ`

### Request Examples:

**Get All Active Learners:**
```
GET /api/v1/learners
```

**Filter by Grade Level:**
```
GET /api/v1/learners?gradeLevelId=223e4567-e89b-12d3-a456-426614174000
```

**Filter by Grade Level and School:**
```
GET /api/v1/learners?gradeLevelId=223e4567-e89b-12d3-a456-426614174000&schoolId=123e4567-e89b-12d3-a456-426614174000
```

---

## 3. Get Learner by ID
**Endpoint:** `GET /api/v1/learners/{id}`
**Required Permission:** `LEARNER_READ`

### Request Example:
```
GET /api/v1/learners/323e4567-e89b-12d3-a456-426614174000
```

Replace `323e4567-e89b-12d3-a456-426614174000` with an actual learner ID from your database.

---

## 4. Update Learner
**Endpoint:** `PUT /api/v1/learners/{id}`
**Required Permission:** `LEARNER_UPDATE`

### Sample Request Body:

```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "John",
  "lastName": "Doe-Updated",
  "gradeLevelId": "323e4567-e89b-12d3-a456-426614174000",
  "dateOfBirth": "2010-05-15",
  "sex": "Male",
  "previousSchoolName": "Springfield Elementary"
}
```

### Additional Test Cases:

**Update Grade Level (Promotion):**
```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Jane",
  "lastName": "Smith",
  "gradeLevelId": "423e4567-e89b-12d3-a456-426614174000",
  "dateOfBirth": "2011-08-22",
  "sex": "Female",
  "previousSchoolName": "Oakwood Primary School"
}
```

**Update Personal Information:**
```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Michael",
  "lastName": "Brown-Williams",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000",
  "dateOfBirth": "2009-12-03",
  "sex": "Male",
  "previousSchoolName": null
}
```

---

## 5. Deactivate Learner
**Endpoint:** `PATCH /api/v1/learners/{id}/deactivate`
**Required Permission:** `LEARNER_DEACTIVATE`

### Request Example:
```
PATCH /api/v1/learners/323e4567-e89b-12d3-a456-426614174000/deactivate
```

No request body required.

---

## 6. Activate Learner
**Endpoint:** `PATCH /api/v1/learners/{id}/activate`
**Required Permission:** `LEARNER_DEACTIVATE`

### Request Example:
```
PATCH /api/v1/learners/323e4567-e89b-12d3-a456-426614174000/activate
```

No request body required.

---

## Validation Test Cases

### Invalid Data Tests (Should Fail):

**Missing Required Fields:**
```json
{
  "firstName": "Test",
  "lastName": "User"
}
```
Expected: 400 Bad Request with validation errors

**First Name Too Long (>100 chars):**
```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "ThisIsAVeryLongFirstNameThatExceedsTheMaximumAllowedLengthOfOneHundredCharactersAndShouldFailValidation",
  "lastName": "Doe",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000"
}
```
Expected: 400 Bad Request

**Invalid UUID Format:**
```json
{
  "schoolId": "invalid-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000"
}
```
Expected: 400 Bad Request

**Blank First Name:**
```json
{
  "schoolId": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "",
  "lastName": "Doe",
  "gradeLevelId": "223e4567-e89b-12d3-a456-426614174000"
}
```
Expected: 400 Bad Request

---

## Sample UUIDs for Testing

Use these UUIDs or replace with actual values from your database:

- **School ID:** `123e4567-e89b-12d3-a456-426614174000`
- **Grade Level ID 1:** `223e4567-e89b-12d3-a456-426614174000`
- **Grade Level ID 2:** `323e4567-e89b-12d3-a456-426614174000`
- **Grade Level ID 3:** `423e4567-e89b-12d3-a456-426614174000`
- **Learner ID:** `523e4567-e89b-12d3-a456-426614174000`

---

## Headers Required

Make sure to include these headers in your Postman requests:

```
Content-Type: application/json
Authorization: Bearer <your-jwt-token>
```

---

## Quick Test Workflow

1. **Create** a new learner (POST)
2. **Get All** learners to verify creation (GET)
3. **Get by ID** to verify specific learner (GET)
4. **Update** the learner details (PUT)
5. **Deactivate** the learner (PATCH)
6. **Activate** the learner again (PATCH)
7. **Filter** learners by grade level (GET with query params)
