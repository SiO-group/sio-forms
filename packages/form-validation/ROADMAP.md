# Roadmap

## Feature Releases

- [ ] Add custom `errorMessage` support for `isUrl()` and `isValidFile()`
- [ ] Add cross-field validation:
    - [ ] `isStrongPassword()` - Configurable password strength rules
    - [ ] `matchesField()` - Value must match another field (password confirmation)
    - [ ] `differentFrom()` - Value must be different from another field
    - [ ] `requiredIf()` - Field required based on another field's value
    - [ ] `requiredWith()` - Field required when another field is present
    - [ ] `requiresUnless()` - Field required unless another field has specific value
- [ ] Internationalisation
- [ ] Country-specific validations:
    - [ ] `isPostcode()` - With country parameter (NL, BE, UK, etc.)
    - [ ] `isPhoneNumber()` - Country-specific phone validation
    - [ ] `isVat()` - European VAT number
    - [ ] `isBankAccount()` - IBAN validation
    - [ ] `isCreditCard()` - Credit card number validation (Luhn algorithm)
- Validation composition:
    - [ ] `and()` / `or()` - Combine validators with logical operators
    - [ ] `not()` - Negate a validator
    - [ ] `when()` - Conditional validation
    - [ ] `validateIf()` - Only validate if condition met

---