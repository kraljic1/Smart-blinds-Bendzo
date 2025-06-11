import { useState } from 'react';
import type { TestResult } from './types';

export const useTestRunner = () => {
 const [results, setResults] = useState<TestResult[]>([]);
 const [testing, setTesting] = useState(false);

 const runTest = async (testName: string, testFn: () => Promise<unknown>) => {
 try {
 const data = await testFn();
 setResults(prev => [...prev, { test: testName, success: true, data }]);
 } catch (error) {
 setResults(prev => [...prev, { 
 test: testName, 
 success: false, 
 error: error instanceof Error ? error.message : String(error) 
 }]);
 }
 };

 const clearResults = () => {
 setResults([]);
 };

 const setTestingState = (state: boolean) => {
 setTesting(state);
 };

 return {
 results,
 testing,
 runTest,
 clearResults,
 setTestingState
 };
}; 