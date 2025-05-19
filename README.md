# Alien Numeral Converter

A web application that converts numerals from an alien symbol system to integers, following specific subtractive notation rules. Built with Angular and Tailwind CSS.

![image_2025-05-19_141621519](https://github.com/user-attachments/assets/62aa5585-4caf-47d9-abd7-177888ef651a)

## Features

- **Symbol Conversion**: Convert alien symbols (A, B, Z, L, C, D, R) to integers
- **Subtractive Notation**: Handles special cases like AB=4, AZ=9, ZL=40, etc.
- **Input Validation**:
  - Rejects invalid characters
  - Enforces correct subtractive notation
  - Prevents invalid additive forms (e.g., AAAA instead of AB)
- **Interactive UI**:
  - Real-time error feedback
  - Conversion history display
  - Symbol value reference table

## Installation

1. **Prerequisites**:
   - Node.js v18+
   - npm v9+

2. **Clone the repository**:
   ```bash
   git clone https://github.com/KittituchWave/Alien-Numeral-Converter.git
   cd alien-numeral-converter
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage

1. **Start the development server**:
   ```bash
   ng serve
   ```
   The application will be available at http://localhost:4200
   
2. **Using the converter**:
   - Enter alien symbols in the input field (e.g., RCRZCAB)
   - Click "Convert" to see the integer result
   - Use "Reset" to clear all fields

**Example Valid Inputs**:
- **`AAA` → 3**
- **`LBAA` → 58**
- **`RCRZCAB` → 1944**

## Technical Details

- **Framework**: Angular 19
- **Styling**: Tailwind CSS
- **Validation**:
  - Character whitelist: `[ABZLCDR]`
  - Consecutive symbol limits
  - Valid subtractive pair checks
- **Conversion Logic**:
  - Sequential symbol parsing
  - Subtractive notation detection
  - Cumulative total calculation

## Testing

Run unit tests with:
```bash
ng test
```
Key test cases:
- Valid numeral conversions
- Invalid input detection
- Edge case handling
- Validation rule enforcement
