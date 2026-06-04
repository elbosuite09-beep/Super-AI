
async function testCalculation() {
  const grades = [
    { value: 15, subjectId: 'math' },
    { value: 12, subjectId: 'math' },
    { value: 10, subjectId: 'french' },
    { value: 18, subjectId: 'french' },
  ];

  const average = grades.reduce((acc, curr) => acc + curr.value, 0) / grades.length;
  console.log(`Average: ${average}`);

  if (average === 13.75) {
    console.log("Calculation logic is correct.");
  } else {
    console.error("Calculation logic is incorrect.");
    process.exit(1);
  }
}

testCalculation();
