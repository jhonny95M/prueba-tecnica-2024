namespace Prueba.Tecnica;

public class OrderRange
{
    public IEnumerable<IEnumerable<int>> Build(IEnumerable<int> numerosPositivos)
    {
        if(numerosPositivos == null) throw new ArgumentNullException(nameof(numerosPositivos));
        if (numerosPositivos.Any(c => c <= 0)) throw new ArgumentException("Los numero de entrada debe ser numeros enteros positivos.");
        var firstNumber=numerosPositivos.OrderBy(c=>c).First();
        var pares = numerosPositivos.Where(c=>c%2==0).OrderBy(c=>c).ToList();
        var impares = numerosPositivos.Where(c=>c%2!=0).OrderBy(c=>c).ToList();
        if(firstNumber%2==0)
            return new List<List<int>>() { pares,impares };
        return new List<List<int>>() { impares,pares  };


    }
}
