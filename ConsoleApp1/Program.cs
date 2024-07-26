// See https://aka.ms/new-console-template for more information
using Prueba.Tecnica;

Console.WriteLine("Hello, World!");

MoneyParts moneyParts = new MoneyParts();

var result = moneyParts.Build("0.1");
//PrintResult(result);

result = moneyParts.Build("10.50");
PrintResult(result);

//result = moneyParts.Build("10.50");
//PrintResult(result);
static void PrintResult(IEnumerable<IEnumerable<decimal>> result)
{
    foreach (var combination in result)
    {
        Console.WriteLine(string.Join(", ", combination));
    }
}
