# Unit Testing Best Practices

## 1. Overview

Unit tests are the foundation of our testing strategy. They ensure that individual components and functions work correctly in isolation.

## 2. Key Principles

- **Test One Thing at a Time:** Each test should focus on a single piece of functionality.
- **AAA Pattern:** Follow the Arrange, Act, Assert pattern to structure your tests.
- **Descriptive Names:** Use clear and descriptive names for your tests.
- **Mock Dependencies:** Isolate the component under test by mocking its dependencies.

## 3. Example

```javascript
import { add } from '../src/math';

describe('add', () => {
  it('should return the sum of two numbers', () => {
    // Arrange
    const a = 1;
    const b = 2;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(3);
  });
});