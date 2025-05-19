import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Represents valid symbols in the alien numeral system
 * Ensures type-safe handling of symbols throughout the component
 */
type AlienSymbol = 'A' | 'B' | 'Z' | 'L' | 'C' | 'D' | 'R';

@Component({
  selector: 'app-alien-numeral-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alien-numeral-converter.component.html',
  styleUrls: ['./alien-numeral-converter.component.css'],
})
export class AlienNumeralConverterComponent {
  // User input from the text field
  alienNumeral: string = '';

  // Validated input stored at conversion time
  submittedValue: string = '';

  // Conversion result (null when no valid conversion)
  result: number | null = null;

  // Error message display (null when no error)
  error: string | null = null;

  // Conversion state flag for UI feedback
  isConverting: boolean = false;

  /**
   * Maps alien symbols to their numeric values
   * Maintains immutability with readonly modifier
   * Uses Record type for strict symbol-value mapping
   */
  public readonly SYMBOL_VALUES: Record<AlienSymbol, number> = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
  };

  /**
   * Valid subtraction combinations per problem rules
   * Keys: Subtracted symbols
   * Values: Symbols that can follow to form subtractive pairs
   */
  private readonly VALID_SUBTRACTIONS: Record<AlienSymbol, AlienSymbol[]> = {
    A: ['B', 'Z'],
    B: [],
    Z: ['L', 'C'],
    L: [],
    C: ['D', 'R'],
    D: [],
    R: [],
  };

  /**
   * Maximum allowed consecutive repetitions per symbol
   * Enforces subtractive notation requirements
   * Example: A can repeat 3 times (AAA=3) but not 4 (AAAA)
   */
  private readonly MAX_REPEATS: Record<AlienSymbol, number> = {
    A: 3,
    B: 1,
    Z: 3,
    L: 1,
    C: 3,
    D: 1,
    R: 1,
  };

  /**
   * Retrieves valid symbols for display in the reference table
   * @returns Array of valid AlienSymbols
   */
  getSymbols(): AlienSymbol[] {
    return Object.keys(this.SYMBOL_VALUES) as AlienSymbol[];
  }

  convertToUppercase(): void {
    // Convert input to uppercase and filter invalid characters
    this.alienNumeral = this.alienNumeral
      .toUpperCase()
      .replace(/[^ABZLCDR]/g, ''); // Remove any non-alien symbols
  }

  /**
   * Main conversion entry point
   * Handles validation, error states, and conversion flow
   */
  convertAlienNumeral(): void {
    this.error = null;
    this.result = null;
    this.isConverting = true;
    this.submittedValue = this.alienNumeral;

    try {
      this.validateNumeral(this.alienNumeral);
      this.result = this.alienToInteger(this.alienNumeral);
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Invalid numeral format';
    } finally {
      this.isConverting = false;
    }
  }

  /**
   * Validates numeral against problem constraints
   * @param s - Input string to validate
   * @throws Error with descriptive message for invalid cases
   */
  private validateNumeral(s: string): void {
    // Basic character validation
    if (!/^[ABZLCDR]+$/.test(s)) {
      throw new Error('Invalid characters. Only A, B, Z, L, C, D, R allowed.');
    }

    const symbols = s.split('') as AlienSymbol[];
    let currentSymbol = symbols[0];
    let count = 1;

    // Check consecutive symbol limits
    for (let i = 1; i < symbols.length; i++) {
      if (symbols[i] === currentSymbol) {
        if (++count > this.MAX_REPEATS[currentSymbol]) {
          throw new Error(
            `Invalid additive notation: ${currentSymbol.repeat(
              count
            )} must use subtractive form`
          );
        }
      } else {
        currentSymbol = symbols[i];
        count = 1;
      }
    }

    // Validate subtractive pairs
    for (let i = 0; i < symbols.length - 1; i++) {
      const current = symbols[i];
      const next = symbols[i + 1];

      if (this.SYMBOL_VALUES[current] < this.SYMBOL_VALUES[next]) {
        if (!this.VALID_SUBTRACTIONS[current]?.includes(next)) {
          throw new Error(
            `Invalid subtraction: ${current}${next} is not a valid combination`
          );
        }
        i++; // Skip next symbol as part of validated pair
      }
    }
  }

  /**
   * Converts validated alien numeral to integer
   * @param s - Validated input string
   * @returns Numeric value of the numeral
   */
  private alienToInteger(s: string): number {
    let total = 0;
    let i = 0;
    const symbols = s.split('') as AlienSymbol[];

    while (i < symbols.length) {
      const current = symbols[i];

      // Check for valid subtractive pair
      if (
        i < symbols.length - 1 &&
        this.SYMBOL_VALUES[current] < this.SYMBOL_VALUES[symbols[i + 1]]
      ) {
        total +=
          this.SYMBOL_VALUES[symbols[i + 1]] - this.SYMBOL_VALUES[current];
        i += 2; // Advance past both symbols
      } else {
        total += this.SYMBOL_VALUES[current];
        i++;
      }
    }

    return total;
  }

  /**
   * Resets all component state to initial values
   * Clears both input and conversion results
   */
  resetForm(): void {
    this.alienNumeral = '';
    this.submittedValue = '';
    this.result = null;
    this.error = null;
  }
}
