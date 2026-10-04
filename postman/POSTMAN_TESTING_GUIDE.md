# ClassSection API - Postman Testing Guide

## 📋 Quick Start

### 1. Import the Collection
1. Open Postman
2. Click **Import** button
3. Select `ClassSection-API-Tests.postman_collection.json`
4. The collection will be imported with all requests and variables

### 2. Set Base URL (if needed)
- Default: `http://localhost:8080`
- To change: Edit collection variables → `baseUrl`

### 3. Start Your Application
```bash
cd backend
./mvnw spring-boot:run
```

---

## 🔐 Step-by-Step Testing Flow

### **Step 1: Login & Get Access Token**

**Request:** `1. Authentication → Login as Tenant Admin`

**Expected Response (200 OK):**
```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400000
  },
  "path": "/api/v1/auth/login",
  "timestamp": "2024-01-15T10:30:00.123Z"
}
```

✅ **The token is automatically saved to collection variables!**

**Default Credentials:**
- **Tenant Admin**: `admin` / `Admin@123`
- **Platform Admin**: `superadmin` / `Admin@123`

---

### **Step 2: Get School & Tenant IDs**

**Request:** `2. Prerequisites → Get All Schools`

**Expected Response (200 OK):**
```json
{
  "status": 200,
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "tenantId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "name": "Pilot High School",
      "code": "PILOT",
      "address": "123 Education Lane, Pilot City",
      ...
    }
  ],
  ...
}
```

✅ **School ID and Tenant ID are automatically saved!**

---

### **Step 3: Create Academic Year**

**Request:** `2. Prerequisites → Create Academic Year (2024)`

**Expected Response (201 Created):**
```json
{
  "status": 201,
  "message": "Code set created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "tenantId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "codeSetGroup": "ACADEMIC_YEAR",
    "code": "2024",
    "displayName": "Academic Year 2024",
    "sortOrder": 1,
    "isActive": true,
    ...
  },
  ...
}
```

✅ **Academic Year ID is automatically saved!**

**Note:** If it already exists (409 Conflict), get the ID manually:
- Run: `Get Active Academic Years`
- Copy the ID from the response

---

### **Step 4: Create Grade Level**

**Request:** `2. Prerequisites → Create Grade Level (Grade 10)`

**Expected Response (201 Created):**
```json
{
  "status": 201,
  "message": "Code set created successfully",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "tenantId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "codeSetGroup": "GRADE_LEVEL",
    "code": "GRADE_10",
    "displayName": "Grade 10",
    "sortOrder": 10,
    "isActive": true,
    ...
  },
  ...
}
```

✅ **Grade Level ID is automatically saved!**

---

### **Step 5: Create Class Section**

**Request:** `3. ClassSection CRUD → Create Class Section - Grade 10A`

**Body (Auto-filled from variables):**
```json
{
  "schoolId": "{{schoolId}}",
  "name": "Grade 10A",
  "gradeLevelId": "{{gradeLevelId}}",
  "academicYearId": "{{academicYearId}}",
  "capacity": 35
}
```

**Expected Response (201 Created):**
```json
{
  "status": 201,
  "message": "Class created successfully",
  "data": {
    "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "tenantId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "schoolId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Grade 10A",
    "gradeLevelId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "gradeLevelDisplayName": "Grade 10",
    "academicYearId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "academicYearDisplayName": "Academic Year 2024",
    "classTeacherId": null,
    "classTeacherName": null,
    "capacity": 35,
    "isActive": true,
    "createdAt": "2024-01-15T10:35:00.123Z",
    ...
  },
  ...
}
```

✅ **Class Section ID is automatically saved!**

---

### **Step 6: Test CRUD Operations**

#### **Get All Classes**
```
GET /api/v1/classes
```

#### **Get Classes by School**
```
GET /api/v1/classes?schoolId={{schoolId}}
```

#### **Get Classes by Academic Year**
```
GET /api/v1/classes?academicYearId={{academicYearId}}
```

#### **Get Classes by Grade Level**
```
GET /api/v1/classes?gradeLevelId={{gradeLevelId}}
```

#### **Combined Filters**
```
GET /api/v1/classes?schoolId={{schoolId}}&academicYearId={{academicYearId}}
```

#### **Update Class Section**
```
PUT /api/v1/classes/{{classSectionId}}

Body:
{
  "schoolId": "{{schoolId}}",
  "name": "Grade 10A - Updated",
  "gradeLevelId": "{{gradeLevelId}}",
  "academicYearId": "{{academicYearId}}",
  "capacity": 40
}
```

#### **Deactivate**
```
PATCH /api/v1/classes/{{classSectionId}}/deactivate
```

#### **Re-activate**
```
PATCH /api/v1/classes/{{classSectionId}}/activate
```

---

## 🧪 Manual Test Data (if auto-save fails)

### Sample UUIDs Format
If you need to manually set variables, use this format:

```javascript
// In Postman → Collection Variables:
tenantId:        7c9e6679-7425-40de-944b-e07fc1f90ae7
schoolId:        550e8400-e29b-41d4-a716-446655440000
academicYearId:  a1b2c3d4-e5f6-7890-abcd-ef1234567890
gradeLevelId:    b2c3d4e5-f6a7-8901-bcde-f12345678901
classSectionId:  c3d4e5f6-a7b8-9012-cdef-123456789012
```

### Create More Test Data

**Additional Grade Levels:**
```json
// Grade 11
{
  "codeSetGroup": "GRADE_LEVEL",
  "code": "GRADE_11",
  "displayName": "Grade 11",
  "sortOrder": 11
}

// Grade 12
{
  "codeSetGroup": "GRADE_LEVEL",
  "code": "GRADE_12",
  "displayName": "Grade 12",
  "sortOrder": 12
}
```

**Additional Class Sections:**
```json
// Grade 10B
{
  "schoolId": "{{schoolId}}",
  "name": "Grade 10B",
  "gradeLevelId": "{{gradeLevelId}}",
  "academicYearId": "{{academicYearId}}",
  "capacity": 30
}

// Grade 10C
{
  "schoolId": "{{schoolId}}",
  "name": "Grade 10C",
  "gradeLevelId": "{{gradeLevelId}}",
  "academicYearId": "{{academicYearId}}",
  "capacity": 32
}
```

---

## ❌ Common Error Scenarios to Test

### 1. **Missing schoolId (400 Bad Request)**
```json
{
  "name": "Grade 10A",
  "gradeLevelId": "{{gradeLevelId}}",
  "academicYearId": "{{academicYearId}}",
  "capacity": 35
}

Response:
{
  "status": 400,
  "message": "School ID is required",
  ...
}
```

### 2. **Invalid School ID (404 Not Found)**
```json
{
  "schoolId": "00000000-0000-0000-0000-000000000000",
  "name": "Invalid School Class",
  "gradeLevelId": "{{gradeLevelId}}",
  "academicYearId": "{{academicYearId}}",
  "capacity": 30
}

Response:
{
  "status": 404,
  "message": "School not found",
  ...
}
```

### 3. **Duplicate Class Name (409 Conflict)**
Try creating "Grade 10A" twice in the same academic year:
```json
Response:
{
  "status": 409,
  "message": "Class already exists",
  ...
}
```

### 4. **Unauthorized Access (401 Unauthorized)**
Remove or use invalid Bearer token:
```json
Response:
{
  "status": 401,
  "message": "Unauthorized",
  ...
}
```

### 5. **Cross-Tenant Access (404 Not Found)**
Try to access a class section ID from another tenant - should return 404 (not 403, to avoid leaking info about other tenants)

---

## 🔍 Multi-Tenant Testing Scenarios

### Test 1: School-Scoped User Access
1. Create a new user assigned to only one school
2. Login as that user
3. Try to create a class in a different school → Should fail

### Test 2: Tenant-Scoped User Access
1. Login as tenant admin
2. Create classes in multiple schools → Should succeed
3. Query all classes → Should see classes from all schools in tenant

### Test 3: Platform Admin Access
1. Login as `superadmin`
2. Note: Platform admin operations require explicit tenant context in some endpoints

---

## 📊 Expected Database State After Full Test Run

**Tenants:** 1 (PILOT1)
**Schools:** 1 (Pilot High School)
**Academic Years:** 1 (2024)
**Grade Levels:** 1 (Grade 10)
**Class Sections:** 2+ (Grade 10A, Grade 10B, etc.)

---

## 🐛 Troubleshooting

### Token Expired
- Re-run: `Login as Tenant Admin`
- Token expires after 24 hours (86400000 ms)

### Variables Not Auto-Saving
Check Postman console (View → Show Postman Console) for JavaScript errors in test scripts

### 404 Errors
- Verify IDs in collection variables match your database
- Check that entities weren't deactivated
- Ensure you're logged in with the correct tenant user

### Connection Refused
- Ensure Spring Boot app is running on port 8080
- Check `application.yml` for correct port

---

## 📝 Next Steps

1. ✅ Test all CRUD operations
2. ✅ Verify multi-tenant isolation
3. ✅ Test error scenarios
4. Create integration tests based on these scenarios
5. Document API in Swagger/OpenAPI

---

## 🎯 Quick Test Checklist

- [ ] Login successful
- [ ] School ID retrieved
- [ ] Academic Year created
- [ ] Grade Level created
- [ ] Class Section created
- [ ] Get all classes works
- [ ] Filter by school works
- [ ] Filter by academic year works
- [ ] Filter by grade level works
- [ ] Update class works
- [ ] Deactivate/Activate works
- [ ] Cross-tenant access blocked
- [ ] Invalid school ID rejected
- [ ] Duplicate class name rejected
