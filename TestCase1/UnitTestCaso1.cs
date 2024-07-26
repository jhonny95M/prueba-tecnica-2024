using Prueba.Tecnica;

namespace TestCase1
{
    public class UnitTestCaso1
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            OrderRange orderRange = new OrderRange();
            int[] Entrada1 = { 2,1,4,5};
            List<List<int>> salida =
                new List<List<int>> 
                { 
                    new(){ 1, 5 },
                    new(){ 2, 4 } 
                };
            var result= orderRange.Build(Entrada1).ToList();
            CollectionAssert.AreEqual( salida, result );
        }
        [Test]
        public void Test2()
        {
            OrderRange orderRange = new OrderRange();
            int[] Entrada1 = { 4, 2, 9, 3, 6 };
            List<List<int>> salida =
                new List<List<int>>
                {
                    new(){ 2, 4, 6 },
                    new(){ 3, 9 }
                };
            var result = orderRange.Build(Entrada1).ToList();
            CollectionAssert.AreEqual(salida, result);
        }
        [Test]
        public void Test3()
        {
            OrderRange orderRange = new OrderRange();
            int[] Entrada1 = { 58, 60, 55, 48, 57, 73 };
            List<List<int>> salida =
                new List<List<int>>
                {
                    new(){ 48, 58, 60 },
                    new(){ 55, 57,73 }
                };
            var result = orderRange.Build(Entrada1).ToList();
            CollectionAssert.AreEqual(salida, result);
        }
    }
}