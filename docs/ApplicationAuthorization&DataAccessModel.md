# Application Authorization & Data Access Model

## Background

The School Attendance System is a **multi-tenant SaaS platform** where a single tenant can own one or more schools.

```text
System
│
├── Tenant A
│   ├── School A
│   ├── School B
│   └── School C
│
└── Tenant B
    ├── School D
    └── School E
```

The application must ensure that users can only perform actions they are authorized to perform and only on data they are allowed to access.

To achieve this, authorization is divided into two independent concerns:

1. **Capability (RBAC)** – What can the user do?
2. **Data Access** – Which data can the user perform those actions on?

Separating these concerns provides a more flexible, maintainable, and scalable authorization model.

---

# Core Concepts

## 1. Tenant

A **Tenant** represents an organization using the platform.

Examples:

- School Group
- Diocese
- Ministry of Education
- Private Education Company

A tenant owns one or more schools.

```text
Tenant
│
├── School A
├── School B
└── School C
```

---

## 2. School

A **School** belongs to exactly one tenant.

Most operational data belongs to a school, for example:

- Learners
- Teachers
- Attendance
- Classes
- Assessments
- Fees

---

## 3. AppUser

An **AppUser** represents a person who can authenticate into the system.

Examples:

- Teacher
- Principal
- Finance Officer
- Registrar
- Tenant Administrator
- Support Staff

Every user belongs to exactly one tenant.

A user may however be assigned to:

- One school
- Multiple schools
- Every school within a tenant

Because of this, school assignments should **not** be stored directly on the user as a single `schoolId`.

Instead, the relationship should be modeled separately.

```text
AppUser
--------
id
tenantId
roleId
username
...
```

```text
AppUserSchool
--------------
userId
schoolId
```

This allows a user to be assigned to any number of schools without changing the user record.

---

# Role (RBAC)

A **Role** represents a user's job or responsibility.

Examples:

- Teacher
- Principal
- Accountant
- School Administrator
- Tenant Administrator

A role **does not determine what data a user can access.**

A role simply groups permissions.

Example:

```text
Teacher
   │
   ├── VIEW_STUDENT
   ├── MARK_ATTENDANCE
   └── EDIT_ATTENDANCE
```

---

# Permission

A **Permission** represents an action that can be performed.

Examples:

- VIEW_STUDENT
- EDIT_STUDENT
- DELETE_STUDENT
- MARK_ATTENDANCE
- CREATE_SCHOOL
- VIEW_REPORTS

Permissions answer one question:

> **What action is the user allowed to perform?**

Permissions do **not** answer:

> Which records may the user access?

---

# RolePermission

`RolePermission` associates Roles with Permissions.

```text
Teacher
      │
      ▼
RolePermission
      │
      ▼
Permissions
```

This remains a standard RBAC implementation.

---

# Resource Scope

Every permission is associated with the level of resource it protects.

Example:

| Permission | Resource Scope |
|------------|----------------|
| VIEW_STUDENT | SCHOOL |
| EDIT_STUDENT | SCHOOL |
| CREATE_SCHOOL | TENANT |
| VIEW_TENANT_REPORT | TENANT |
| CREATE_TENANT | SYSTEM |

**Resource Scope does not define who can execute the permission.**

Instead, it identifies the type of resource being protected.

---

# User Access Scope

While permissions describe **what** a user can do, **Access Scope** determines **where** those permissions may be applied.

Three access scopes are supported.

## SYSTEM

Can access every tenant.

Example:

- Platform Administrator
- System Support

---

## TENANT

Can access every school within their tenant.

Example:

- Tenant Administrator

---

## ASSIGNED_SCHOOLS

Can access only the schools explicitly assigned to them.

Examples:

- Teacher
- Principal
- Finance Officer
- Regional Supervisor

Assignments are stored in:

```text
AppUserSchool
```

Example:

```text
John
│
├── School A
├── School C
└── School D
```

---

# Authentication

Authentication answers one question:

> **Who is making the request?**

Authentication is performed using JWT.

After successful authentication, the application resolves:

- User ID
- Tenant ID
- Assigned Schools
- Role
- Permissions

This information is stored in the request context.

---

# Authorization

Authorization consists of several steps.

## Step 1 - Authenticate User

```text
JWT
 │
 ▼
AppUser
```

---

## Step 2 - Load Permissions

```text
AppUser
   │
   ▼
Role
   │
   ▼
RolePermission
   │
   ▼
Permission
```

If the required permission is missing:

```text
403 Forbidden
```

---

## Step 3 - Resolve Resource Ownership

Determine which tenant and school own the resource.

Example:

```text
Student
│
├── School A
└── Tenant A
```

---

## Step 4 - Evaluate Data Access

### SYSTEM

Access is automatically granted.

---

### TENANT

Verify:

```text
Resource Tenant == User Tenant
```

If true:

Allow.

Otherwise:

Deny.

---

### ASSIGNED_SCHOOLS

Verify:

```text
Resource School

∈

User Assigned Schools
```

If true:

Allow.

Otherwise:

Deny.

---

# Authorization Examples

## Example 1 - Teacher

John belongs to:

```text
Tenant
ABC Schools
```

Assigned schools:

```text
School A
School B
```

Permission:

```text
EDIT_STUDENT
```

Attempt:

```text
Edit Student

↓

Student belongs to School B
```

**Result:** ✅ Allowed

---

Attempt:

```text
Edit Student

↓

Student belongs to School C
```

**Result:** ❌ Denied

---

## Example 2 - Tenant Administrator

Permission:

```text
EDIT_STUDENT
```

Attempt:

```text
Edit Student

↓

Student belongs to any school under Tenant ABC
```

**Result:** ✅ Allowed

---

# Benefits

This architecture provides:

- Clear separation between Authentication, RBAC, and Data Access.
- Support for users assigned to multiple schools.
- Tenant-wide administrators without duplicating permissions.
- Standard RBAC implementation that remains simple and maintainable.
- Scalable authorization that can evolve as the platform grows.
- Consistent enforcement of authorization at both the application and database layers.
- Flexibility to support future organizational levels such as Districts or Regions without redesigning the RBAC model.

---

# Guiding Principles

The authorization model is built around three independent questions.

| Question | Responsibility |
|----------|----------------|
| **Who are you?** | Authentication (JWT → AppUser) |
| **What can you do?** | Role → Permission (RBAC) |
| **Which data can you access?** | Access Scope + School Assignments + Resource Ownership |

By separating these responsibilities, the system becomes easier to understand, easier to maintain, and easier to extend while supporting a complex multi-tenant, multi-school architecture.

---

# Design Principles

The proposed authorization model follows these principles:

1. **Authentication identifies the user.**
2. **RBAC determines the user's capabilities.**
3. **Access Scope determines the breadth of the user's authority.**
4. **Resource Scope identifies the type of resource being protected.**
5. **Authorization decisions are made by evaluating both the user's permissions and the ownership of the target resource.**
6. **User-to-school assignments are modeled explicitly rather than inferred from nullable foreign keys.**
7. **Roles define business responsibilities, not data visibility.**
8. **Permissions define operations, not ownership boundaries.**

This separation of concerns provides a clean and extensible foundation for implementing authorization across the entire School Attendance System.