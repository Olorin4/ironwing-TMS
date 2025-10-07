# Performance Testing

This directory contains the k6 performance test scripts for the Ironwing TMS backend.

## Baseline Performance Metrics and Thresholds

The following table outlines the baseline performance metrics and thresholds for the critical endpoints. These values should be reviewed and updated periodically.

| Endpoint | Metric | Threshold |
| --- | --- | --- |
| POST /api/auth/register | p(95) < 200ms | http_req_failed < 0.01 |
| POST /api/auth/login | p(95) < 200ms | http_req_failed < 0.01 |
| POST /api/forms/sign-up-forms | p(95) < 500ms | http_req_failed < 0.01 |
| POST /api/forms/contact-forms | p(95) < 500ms | http_req_failed < 0.01 |
