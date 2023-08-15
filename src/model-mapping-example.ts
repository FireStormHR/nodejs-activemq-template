type FirstObject = { name: string; surname: string; yearOfBirth: number /* firstDeepObj: FirstDeepObject */ };
type FirstDeepObject = { key: string };

const firstObjectExample: FirstObject = { name: 'MHTTH', surname: 'VKWJW', yearOfBirth: 1960 /* firstDeepObj: { key: 'value' } */ };

type SecondObject = { fullName: string; age: number };
type SecondDeepObject = { sleutel: string };

const firstObjectToSecondObject = (input: FirstObject): SecondObject => ({ fullName: 'iemand', age: 46 });
