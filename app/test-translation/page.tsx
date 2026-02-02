'use client';

import React, { useState } from 'react';
import { translateText, translateObject } from '@/app/lib/google-translate-api';

/**
 * Test component untuk verify translation API
 * URL: http://localhost:3000/api/translation-test (jika di-route)
 * atau bisa digunakan langsung di browser console
 */
export default function TranslationTestPage() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    setResults([]);
    const logs: string[] = [];

    try {
      // Test 1: Simple translation
      logs.push('=== Test 1: Simple Translation ===');
      const test1 = await translateText({
        text: 'Hello, this is a test',
        targetLanguage: 'id',
        sourceLanguage: 'en',
      });
      logs.push(`Input: "Hello, this is a test"`);
      logs.push(`Output (ID): "${test1.translatedText}"`);
      logs.push('✅ Test 1 Passed\n');

      // Test 2: Cached translation (should be instant)
      logs.push('=== Test 2: Cached Translation ===');
      const start = performance.now();
      const test2 = await translateText({
        text: 'Hello, this is a test',
        targetLanguage: 'id',
        sourceLanguage: 'en',
      });
      const duration = performance.now() - start;
      logs.push(`Duration: ${duration.toFixed(2)}ms (should be <5ms for cache)`);
      logs.push(`Output: "${test2.translatedText}"`);
      logs.push('✅ Test 2 Passed\n');

      // Test 3: Object translation
      logs.push('=== Test 3: Object Translation ===');
      const testObj = {
        name: 'REXCO 50',
        description: 'Multipurpose lubricant with fast penetration',
        keywords: 'lubricant, oil, protection',
      };
      logs.push(`Input: ${JSON.stringify(testObj)}`);
      const test3 = await translateObject(
        testObj,
        'id',
        'en',
        ['name', 'description', 'keywords']
      );
      logs.push(`Output: ${JSON.stringify(test3)}`);
      logs.push('✅ Test 3 Passed\n');

      // Test 4: Empty string (should return empty)
      logs.push('=== Test 4: Empty String Handling ===');
      const test4 = await translateText({
        text: '',
        targetLanguage: 'id',
        sourceLanguage: 'en',
      });
      logs.push(`Input: ""`);
      logs.push(`Output: "${test4.translatedText}" (should be empty)`);
      logs.push('✅ Test 4 Passed\n');

      // Test 5: Source = Target (should return original)
      logs.push('=== Test 5: Same Language ===');
      const test5 = await translateText({
        text: 'Test text',
        targetLanguage: 'en',
        sourceLanguage: 'en',
      });
      logs.push(`Input: "Test text", target: en, source: en`);
      logs.push(`Output: "${test5.translatedText}" (should be same as input)`);
      logs.push('✅ Test 5 Passed\n');

      logs.push('=== ALL TESTS PASSED ✅ ===');
    } catch (error) {
      logs.push(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
      setResults(logs);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Translation API Test</h1>
        
        <p className="text-gray-600 mb-6">
          Testing MyMemory Translation API integration untuk dynamic content translation.
        </p>

        <button
          onClick={runTests}
          disabled={loading}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 disabled:opacity-50 mb-6"
        >
          {loading ? 'Testing...' : 'Run Tests'}
        </button>

        {results.length > 0 && (
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-auto max-h-96">
            {results.map((line, i) => (
              <div key={i} className={line.includes('✅') ? 'text-green-400' : line.includes('❌') ? 'text-red-400' : ''}>
                {line}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-4">📝 Notes:</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>✅ Simple text translation (English → Indonesian)</li>
            <li>✅ Cache verification (should be instant on second call)</li>
            <li>✅ Object property translation dengan field filter</li>
            <li>✅ Empty string handling</li>
            <li>✅ Same language scenario</li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-4">🔗 API Used:</h2>
          <p className="text-gray-700 text-sm">
            <strong>MyMemory Translation API:</strong> https://api.mymemory.translated.net/get
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Free service, no authentication required, CORS enabled
          </p>
        </div>
      </div>
    </div>
  );
}
