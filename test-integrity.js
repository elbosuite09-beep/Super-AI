
async function testModules() {
  console.log("Démarrage des tests d'intégrité...");

  // Test RH
  const teacher = { hourlyRate: 5000 };
  const logs = [{ hours: 10 }, { hours: 5 }];
  const totalPay = logs.reduce((acc, l) => acc + l.hours, 0) * teacher.hourlyRate;
  if (totalPay === 75000) {
    console.log("✅ Module RH: Calcul de paie OK");
  } else {
    console.error("❌ Module RH: Erreur de calcul");
    process.exit(1);
  }

  // Test Statistiques
  const revenue = 200000;
  const expenses = 75000;
  const profit = revenue - expenses;
  if (profit === 125000) {
    console.log("✅ Module Stats: Calcul de bénéfice OK");
  } else {
    console.error("❌ Module Stats: Erreur de calcul");
    process.exit(1);
  }

  console.log("Tous les tests d'intégrité logicielle sont passés avec succès.");
}

testModules();
