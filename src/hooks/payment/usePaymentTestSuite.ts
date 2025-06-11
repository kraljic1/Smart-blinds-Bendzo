import { useTestRunner } from './useTestRunner';
import {
 testDebugPaymentFunction,
 testGetOrdersFunction,
 testCreatePaymentIntent,
 testConfirmPaymentFunction
} from './paymentTestFunctions';

export const usePaymentTestSuite = () => {
 const { results, testing, runTest, clearResults, setTestingState } = useTestRunner();

 const runAllTests = async () => {
 setTestingState(true);
 clearResults();

 // Test 1: Debug Payment Function
 await runTest('Debug Payment Function', testDebugPaymentFunction);

 // Test 2: Get Orders Function
 await runTest('Get Orders Function', testGetOrdersFunction);

 // Test 3: Create Payment Intent
 await runTest('Create Payment Intent', testCreatePaymentIntent);

 // Test 4: Confirm Payment (with fake data)
 await runTest('Confirm Payment Function', testConfirmPaymentFunction);

 setTestingState(false);
 };

 return {
 results,
 testing,
 runAllTests
 };
}; 