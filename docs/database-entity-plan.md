# Database Entity Plan

## Objective

This plan proposes the database entities needed to turn the current frontend-only `LifeSync` prototype into a real multi-module SaaS with authenticated, user-scoped data and protected admin tooling.

It is intentionally broader than the current prototype because the prompt requires a production-ready Next.js, Prisma, PostgreSQL, and Auth.js architecture.

## Design Principles

- Every user-owned record must be tied to a user identity through `userId` or a secure relationship.
- Authentication, authorization, and application data must be modeled separately.
- Financial values should use Decimal-compatible fields.
- Sensitive document and health data must be protected and serialized safely.
- Admin operations should be auditable.
- Shared family data must not leak personal private data by default.

## Core Relationship Overview

```text
User
  -> Profile
  -> Session / Account / VerificationToken / Authenticator
  -> UserRole -> Role -> RolePermission -> Permission
  -> Task -> TaskSubtask
  -> Habit -> HabitEntry
  -> Goal -> GoalMilestone
  -> Income
  -> Expense
  -> Budget
  -> Bill
  -> Document
  -> Notification
  -> EmergencyContact
  -> Semester -> Course -> Assignment / Exam / AttendanceRecord / AcademicResult / ClassSchedule
  -> Family memberships / invitations / shared items
  -> Medicine -> MedicineSchedule / MedicineLog
  -> DoctorAppointment
  -> HealthNote
  -> Subscription
  -> Payment
  -> SupportTicket / SupportMessage
  -> Feedback
  -> AdminAuditLog (when acting as admin)
```

## Authentication Entities

### User

Purpose:

- primary identity record
- owns application data

Suggested fields:

- `id`
- `email`
- `emailVerified`
- `passwordHash`
- `phone`
- `phoneVerifiedAt`
- `isActive`
- `onboardingCompleted`
- `preferredLocale`
- `selectedPlanId`
- `deletedAt`
- `createdAt`
- `updatedAt`

Notes:

- email should be unique and normalized
- never expose `passwordHash`

### Account

Purpose:

- Auth.js OAuth account linkage

### Session

Purpose:

- Auth.js session persistence

### VerificationToken

Purpose:

- email verification and password reset token support

### Authenticator

Purpose:

- optional passkey or advanced auth support if required by adapter

## Authorization Entities

### Role

Purpose:

- named roles such as Super Admin, Admin, Support Agent, User

Fields:

- `id`
- `name`
- `slug`
- `description`

### Permission

Purpose:

- granular permission definitions

Fields:

- `id`
- `name`
- `description`

Examples:

- `users.read`
- `users.update`
- `roles.manage`
- `plans.manage`
- `support.manage`
- `audit.read`

### UserRole

Purpose:

- many-to-many between users and roles

### RolePermission

Purpose:

- many-to-many between roles and permissions

## Profile and Preferences

### Profile

Purpose:

- personal profile and onboarding details

Fields:

- `userId`
- `fullName`
- `displayName`
- `profileImagePath`
- `timezone`
- `currency`
- `theme`
- `language`
- `dateOfBirth`
- `occupation`
- `address`
- `modulePreferences`
- `dashboardPreferences`

## Tasks and Habits

### Task

Purpose:

- personal task management

Fields:

- `id`
- `userId`
- `title`
- `description`
- `status`
- `priority`
- `category`
- `dueAt`
- `reminderAt`
- `recurrenceRule`
- `completedAt`
- `deletedAt`
- `createdAt`
- `updatedAt`

### TaskSubtask

Purpose:

- child checklist items for a task

Fields:

- `taskId`
- `title`
- `isCompleted`
- `completedAt`

### Habit

Purpose:

- user habit configuration

Fields:

- `id`
- `userId`
- `name`
- `icon`
- `frequencyType`
- `frequencyConfig`
- `reminderTime`
- `isActive`
- `createdAt`
- `updatedAt`

### HabitEntry

Purpose:

- completion log for a habit on a date

Fields:

- `habitId`
- `userId`
- `entryDate`
- `status`
- `createdAt`

## Goals

### Goal

Purpose:

- user goals across finance, study, travel, health, etc.

Fields:

- `id`
- `userId`
- `title`
- `category`
- `targetValue`
- `currentValue`
- `unit`
- `deadline`
- `status`
- `notes`
- `color`
- `createdAt`
- `updatedAt`

### GoalMilestone

Purpose:

- milestone tracking for goals

Fields:

- `goalId`
- `title`
- `targetValue`
- `completedAt`
- `orderIndex`

## Finance and Bills

### Income

Purpose:

- income records

Fields:

- `id`
- `userId`
- `amount`
- `category`
- `source`
- `paymentMethod`
- `receivedAt`
- `notes`

### Expense

Purpose:

- expense records

Fields:

- `id`
- `userId`
- `amount`
- `category`
- `merchant`
- `paymentMethod`
- `spentAt`
- `notes`

### Budget

Purpose:

- user budgets by month/category

Fields:

- `id`
- `userId`
- `name`
- `category`
- `periodMonth`
- `limitAmount`
- `warningThreshold`

### Bill

Purpose:

- recurring and one-off bills

Fields:

- `id`
- `userId`
- `name`
- `provider`
- `category`
- `amount`
- `currency`
- `status`
- `dueDate`
- `paymentMethod`
- `isRecurring`
- `recurrenceRule`
- `lastPaidAt`
- `notes`

### Payment

Purpose:

- manual or subscription-related payment records

Fields:

- `id`
- `userId`
- `subscriptionId`
- `billId`
- `amount`
- `currency`
- `method`
- `status`
- `reference`
- `paidAt`

## Documents

### Document

Purpose:

- metadata for personal/government documents

Fields:

- `id`
- `userId`
- `category`
- `name`
- `maskedDocumentNumber`
- `encryptedDocumentNumber`
- `issueDate`
- `expiryDate`
- `status`
- `storageKey`
- `mimeType`
- `fileSize`
- `officialReferenceUrl`
- `renewalNotes`
- `deletedAt`
- `createdAt`
- `updatedAt`

Notes:

- private file should not be publicly addressable
- document number should never be returned in full by default

## Notifications

### Notification

Purpose:

- internal user notifications

Fields:

- `id`
- `userId`
- `type`
- `title`
- `body`
- `isRead`
- `isImportant`
- `relatedResourceType`
- `relatedResourceId`
- `deliveryStatus`
- `failureReason`
- `createdAt`
- `readAt`

## Emergency

### EmergencyContact

Purpose:

- user emergency contact information

Fields:

- `id`
- `userId`
- `name`
- `relation`
- `phone`
- `email`
- `address`
- `priority`

## Student Module

### Semester

Purpose:

- academic term

Fields:

- `id`
- `userId`
- `name`
- `startDate`
- `endDate`
- `status`

### Course

Purpose:

- course in a semester

Fields:

- `id`
- `userId`
- `semesterId`
- `code`
- `name`
- `credits`
- `instructor`

### ClassSchedule

Purpose:

- weekly class routine entries

Fields:

- `id`
- `userId`
- `courseId`
- `dayOfWeek`
- `startTime`
- `endTime`
- `location`

### Assignment

Purpose:

- assignment planning and submission tracking

Fields:

- `id`
- `userId`
- `courseId`
- `title`
- `description`
- `deadline`
- `priority`
- `status`
- `submissionStorageKey`
- `submissionNotes`
- `submittedAt`

### Exam

Purpose:

- exam scheduling and results

### AttendanceRecord

Purpose:

- attendance logging

### AcademicResult

Purpose:

- grade and GPA calculation data

Fields should support:

- grade scale
- grade points
- credits
- retake handling flags

## Family Module

### Family

Purpose:

- shared family workspace

Fields:

- `id`
- `name`
- `createdByUserId`

### FamilyMember

Purpose:

- membership record within a family

Fields:

- `id`
- `familyId`
- `userId`
- `role`
- `joinedAt`

### FamilyInvitation

Purpose:

- invite workflows

Fields:

- `familyId`
- `emailOrPhone`
- `token`
- `expiresAt`
- `usedAt`
- `status`

### FamilyTask

Purpose:

- shared tasks in a family

### SharedExpense

Purpose:

- shared family expenses

Fields:

- `familyId`
- `createdByUserId`
- `amount`
- `category`
- `notes`

## Health Module

### Medicine

Purpose:

- medicine record for a user

Fields:

- `id`
- `userId`
- `name`
- `dosage`
- `instructions`
- `startDate`
- `endDate`
- `isActive`

### MedicineSchedule

Purpose:

- schedule configuration for medicine reminders

### MedicineLog

Purpose:

- taken/skipped logging

### DoctorAppointment

Purpose:

- appointments and reminder metadata

### HealthNote

Purpose:

- private health notes and profile details

Notes:

- should be treated as sensitive
- keep out of normal admin listings

## Subscriptions and Plans

### SubscriptionPlan

Purpose:

- defines Free, Pro, Family, etc.

Fields:

- `id`
- `name`
- `slug`
- `price`
- `currency`
- `billingInterval`
- `features`
- `isActive`

### Subscription

Purpose:

- user plan enrollment

Fields:

- `id`
- `userId`
- `planId`
- `status`
- `startsAt`
- `endsAt`
- `cancelledAt`

## Support and Feedback

### SupportTicket

Purpose:

- user support cases

Fields:

- `id`
- `userId`
- `subject`
- `category`
- `priority`
- `status`

### SupportMessage

Purpose:

- threaded messages inside a ticket

Fields:

- `ticketId`
- `authorUserId`
- `body`
- `isInternal`
- `createdAt`

### Feedback

Purpose:

- product feedback collection

## Government Services and Content

### GovernmentService

Purpose:

- service CMS entries

Fields:

- `id`
- `category`
- `name`
- `slug`
- `officialUrl`
- `fees`
- `processingTime`
- `status`
- `summary`

### GovernmentServiceRequirement

Purpose:

- requirements linked to a government service

### Announcement

Purpose:

- admin-managed announcement content

## Admin Audit and Security

### AdminAuditLog

Purpose:

- persistent log of high-impact admin actions

Fields:

- `id`
- `actorUserId`
- `action`
- `targetType`
- `targetId`
- `beforeSummary`
- `afterSummary`
- `requestId`
- `ipMetadata`
- `createdAt`

## Relationship Notes

- `User` 1:1 `Profile`
- `User` 1:n `Task`, `Habit`, `Goal`, `Income`, `Expense`, `Budget`, `Bill`, `Document`, `Notification`, `EmergencyContact`
- `Task` 1:n `TaskSubtask`
- `Habit` 1:n `HabitEntry`
- `Goal` 1:n `GoalMilestone`
- `Semester` 1:n `Course`
- `Course` 1:n `Assignment`, `Exam`, `AttendanceRecord`, `ClassSchedule`, `AcademicResult`
- `Family` 1:n `FamilyMember`, `FamilyInvitation`, `FamilyTask`, `SharedExpense`
- `Role` n:n `Permission` through `RolePermission`
- `User` n:n `Role` through `UserRole`
- `SubscriptionPlan` 1:n `Subscription`
- `SupportTicket` 1:n `SupportMessage`
- `GovernmentService` 1:n `GovernmentServiceRequirement`

## Ownership and Privacy Rules

- Every user-owned entity must include `userId` directly or inherit ownership through a secure parent relation.
- Document numbers should be stored encrypted and returned masked.
- Health records should be marked sensitive and excluded from broad admin reads.
- Admin logs should summarize changes safely without leaking secrets or full sensitive values.
- Soft deletion is recommended for:
  - `User`
  - `Document`
  - important historical records where legal retention matters

## Recommended Build Sequence from the Data Side

1. Auth foundation:
   - `User`, `Account`, `Session`, `VerificationToken`, `Authenticator`
2. RBAC:
   - `Role`, `Permission`, `UserRole`, `RolePermission`
3. User profile and preferences:
   - `Profile`, `SubscriptionPlan`, `Subscription`
4. Dashboard-critical entities:
   - `Task`, `Habit`, `Goal`, `Income`, `Expense`, `Budget`, `Bill`, `Document`, `Notification`
5. Module expansions:
   - Student
   - Family
   - Health
6. Admin/support/content:
   - `SupportTicket`, `SupportMessage`, `Feedback`, `GovernmentService`, `GovernmentServiceRequirement`, `Announcement`, `AdminAuditLog`
