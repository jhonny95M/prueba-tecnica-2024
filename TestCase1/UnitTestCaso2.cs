using Prueba.Tecnica;

namespace TestCase1
{
    public class UnitTestCaso2
    {
        private const decimal Tolerancia = 0.0001M;

        [Test]
        public void Test1()
        {
            MoneyParts moneyParts = new MoneyParts();
            string entrada = "0.1";
            List<List<decimal>> salida =
                new List<List<decimal>>
                {
                    new(){ 0.05m, 0.05m },
                    new(){ 0.1m }
                };
            var result = moneyParts.Build(entrada).ToList();
            CollectionAssert.AreEqual(salida, result);
        }
        [Test]
        public void Test2()
        {
            MoneyParts moneyParts = new MoneyParts();
            string entrada = "0.5";
            List<List<decimal>> salida =
                new List<List<decimal>>
                {
                    new List<decimal> { 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M },
                    new List<decimal> { 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.100M },
                    new List<decimal> { 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.1M, 0.1M },
                    new List<decimal> { 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.05M, 0.2M },
                    new List<decimal> { 0.05M, 0.05M, 0.05M, 0.05M, 0.1M, 0.1M, 0.1M },
                    new List<decimal> { 0.05M, 0.05M, 0.05M, 0.05M, 0.1M, 0.2M },
                    new List<decimal> { 0.05M, 0.05M, 0.1M, 0.1M, 0.1M, 0.1M },
                    new List<decimal> { 0.05M, 0.0500M, 0.1M, 0.1M, 0.2M },
                    new List<decimal> { 0.05M, 0.05M, 0.2M, 0.2M },
                    new List<decimal> { 0.1M, 0.1M, 0.1M, 0.1M, 0.1M },
                    new List<decimal> { 0.1M, 0.1M, 0.1M, 0.2M },
                    new List<decimal> { 0.1M, 0.2M, 0.2M },
                    new List<decimal> { 0.500M }
                };

            var result = moneyParts.Build(entrada).ToList();
            // Check if the result contains all expected combinations
            Assert.AreEqual(salida.Count, result.Count, "Number of combinations does not match");

            foreach (var combinacion in salida)
            {
                Assert.IsTrue(result.Any(r => AreListEqual(r.ToList(),combinacion)), $"Expected combination {string.Join(", ", combinacion)} not found");
            }
        }
        private bool AreListEqual(List<decimal> expected, List<decimal> actual)
        {
            if(expected.Count != actual.Count) return false;
            for(int i = 0;i< expected.Count; i++)
            {
                if (Math.Abs(expected[i] - actual[i])>Tolerancia) return false;
            }
            return true;
        }
    }
}