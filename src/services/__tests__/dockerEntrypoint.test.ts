/**
 * docker-entrypoint.sh JSON encoding security property tests
 *
 * Validates: Requirements 18.1, 18.2
 *
 * The docker-entrypoint.sh uses Python's json.dumps() to safely encode
 * environment variable values before injecting them into window.__VAR__.
 * JSON.stringify() in JavaScript has equivalent behavior for string values.
 *
 * Key security property: json_encode() wraps the value in double quotes and
 * escapes backslashes, double quotes, newlines, and control characters —
 * preventing injection attacks that could break JS syntax.
 *
 * Known limitation: Neither Python's json.dumps() nor JSON.stringify() escapes
 * `<` or `>` by default, so a value containing `</script>` would produce
 * `"</script>"` which could close the enclosing <script> tag. This is
 * documented as a known limitation and tested explicitly below.
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// The encoding function — mirrors docker-entrypoint.sh's json_encode()
// which calls: python3 -c "import json,sys; print(json.dumps(sys.stdin.read()))"
// JSON.stringify(value) is equivalent to Python's json.dumps(str) for strings.
// ---------------------------------------------------------------------------

function jsonEncode(value: string): string {
  return JSON.stringify(value)
}

/** Builds the JS assignment statement as injected by docker-entrypoint.sh */
function buildInjection(varName: string, value: string): string {
  return `window.__${varName}__ = ${jsonEncode(value)}`
}

// ---------------------------------------------------------------------------
// Property tests
// ---------------------------------------------------------------------------

describe('docker-entrypoint.sh JSON encoding security', () => {
  /**
   * Property 1: Round-trip fidelity
   * For any string value, JSON.stringify produces output that parses back
   * to the original value.
   * Validates: Requirements 18.1, 18.2
   */
  it('property: JSON.stringify round-trips any string value', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const encoded = jsonEncode(value)
        const decoded = JSON.parse(encoded)
        expect(decoded).toBe(value)
      }),
      { numRuns: 200 }
    )
  })

  /**
   * Property 2: Encoded output is always a quoted string literal
   * The result must start and end with a double-quote character.
   * Validates: Requirements 18.1
   */
  it('property: encoded value is always wrapped in double quotes', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const encoded = jsonEncode(value)
        expect(encoded.startsWith('"')).toBe(true)
        expect(encoded.endsWith('"')).toBe(true)
      }),
      { numRuns: 200 }
    )
  })

  /**
   * Property 3: No unescaped double quotes inside the encoded value
   * Any double quote in the original value must be escaped as \".
   * Validates: Requirements 18.2
   */
  it('property: double quotes inside the value are always escaped', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const encoded = jsonEncode(value)
        // Strip the surrounding quotes, then check no bare " remains
        const inner = encoded.slice(1, -1)
        // A bare " would appear as a non-escaped quote; after JSON.stringify
        // all internal " are preceded by \
        expect(inner).not.toMatch(/(?<!\\)"/)
      }),
      { numRuns: 200 }
    )
  })

  /**
   * Property 4: No unescaped backslashes in the encoded output
   * Backslashes in the original value must be doubled (\\).
   * The safest way to verify this is via round-trip: if backslashes were not
   * properly escaped, JSON.parse would either throw or return a wrong value.
   * We also verify that a value with a backslash produces \\ in the output.
   * Validates: Requirements 18.2
   */
  it('property: backslashes in the value are always escaped (round-trip)', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const encoded = jsonEncode(value)
        // Round-trip is the definitive proof: if backslashes were unescaped,
        // JSON.parse would throw or return a different value
        expect(JSON.parse(encoded)).toBe(value)
        // Additionally: if the value contains a backslash, the encoded form
        // must contain \\ (two backslashes) for each one
        if (value.includes('\\')) {
          expect(encoded).toContain('\\\\')
        }
      }),
      { numRuns: 200 }
    )
  })

  /**
   * Property 5: No literal newlines or control characters in encoded output
   * Newlines and control chars must be escaped (\n, \r, \t, \uXXXX).
   * Validates: Requirements 18.2
   */
  it('property: newlines and control characters are always escaped', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const encoded = jsonEncode(value)
        // Literal newline, carriage return, or tab must not appear unescaped
        expect(encoded).not.toMatch(/[^\x20-\x7E\u0080-\uFFFF]/)
        // More specifically: no raw \n, \r, or \t
        expect(encoded).not.toContain('\n')
        expect(encoded).not.toContain('\r')
        expect(encoded).not.toContain('\t')
      }),
      { numRuns: 200 }
    )
  })

  /**
   * Property 6: The full window assignment is syntactically valid JS
   * eval() is used here purely to validate syntax — not to execute untrusted
   * code, since the value is generated by our own jsonEncode().
   * Validates: Requirements 18.1, 18.2
   */
  it('property: window.__VAR__ = <encoded> is syntactically valid JS', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('BRAND_ID', 'WORDPRESS_API_URL', 'API_URL', 'BACKUP_API_URL', 'WORKBENCH_URL'),
        fc.string(),
        (varName, value) => {
          const statement = buildInjection(varName, value)
          // new Function() parses (but does not execute) the statement
          expect(() => new Function(statement)).not.toThrow()
        }
      ),
      { numRuns: 200 }
    )
  })

  // ---------------------------------------------------------------------------
  // Unit tests: known injection vectors
  // ---------------------------------------------------------------------------

  describe('known injection vectors', () => {
    it('escapes double quotes', () => {
      const encoded = jsonEncode('say "hello"')
      expect(encoded).toBe('"say \\"hello\\""')
      expect(JSON.parse(encoded)).toBe('say "hello"')
    })

    it('escapes backslashes', () => {
      const encoded = jsonEncode('C:\\Users\\admin')
      expect(encoded).toBe('"C:\\\\Users\\\\admin"')
      expect(JSON.parse(encoded)).toBe('C:\\Users\\admin')
    })

    it('escapes newlines', () => {
      const encoded = jsonEncode('line1\nline2')
      expect(encoded).toBe('"line1\\nline2"')
      expect(JSON.parse(encoded)).toBe('line1\nline2')
    })

    it('escapes carriage returns', () => {
      const encoded = jsonEncode('line1\r\nline2')
      expect(encoded).toBe('"line1\\r\\nline2"')
    })

    it('escapes null bytes', () => {
      const encoded = jsonEncode('before\x00after')
      expect(encoded).toBe('"before\\u0000after"')
    })

    it('escapes single quotes (no escaping needed — they are safe in JSON)', () => {
      // Single quotes do NOT need escaping in JSON strings
      const encoded = jsonEncode("it's fine")
      expect(encoded).toBe('"it\'s fine"')
      expect(JSON.parse(encoded)).toBe("it's fine")
    })

    it('handles empty string', () => {
      expect(jsonEncode('')).toBe('""')
    })

    it('handles unicode characters', () => {
      const encoded = jsonEncode('你好世界')
      expect(JSON.parse(encoded)).toBe('你好世界')
    })

    it('handles a URL with special characters', () => {
      const url = 'https://api.example.com/wp-json?key=val&other="quoted"'
      const encoded = jsonEncode(url)
      expect(JSON.parse(encoded)).toBe(url)
      expect(() => new Function(`window.__WORDPRESS_API_URL__ = ${encoded}`)).not.toThrow()
    })

    /**
     * Known limitation: JSON.stringify does NOT escape `<` or `>`.
     * A value containing `</script>` produces `"</script>"` which could
     * close the enclosing <script> tag in an HTML context.
     * This matches the behavior of Python's json.dumps() (same limitation).
     * Mitigation: the injected script tag should use a nonce or be placed
     * outside of user-controlled content.
     */
    it('known limitation: </script> is NOT escaped by JSON.stringify', () => {
      const encoded = jsonEncode('</script>')
      // Confirm the limitation exists — the slash is not escaped
      expect(encoded).toContain('</script>')
      // Document: this is the same behavior as Python json.dumps()
    })
  })
})
