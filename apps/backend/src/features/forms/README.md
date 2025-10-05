# Feature: Forms

This feature handles submissions from iron-wing-dispatching.com, such as the "Sign-Up" and "Contact Us" forms.

## Business Logic

-   Upon submission, the form data is persisted to the database.
-   An automated email is sent to the user to confirm receipt of their submission.
-   A notification email is sent to internal administrators with the details of the submission.

## API Endpoints

-   `POST /api/forms/sign-up-forms`: Handles submissions from the sign-up form.
-   `GET /api/forms/sign-up-forms`: Retrieves all sign-up form submissions (should be protected in the future).
-   `POST /api/forms/contact-forms`: Handles submissions from the contact form.
-   `GET /api/forms/contact-forms`: Retrieves all contact form submissions (should be protected in the future).