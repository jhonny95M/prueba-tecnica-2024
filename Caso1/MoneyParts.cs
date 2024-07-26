using System.Diagnostics.CodeAnalysis;
using System.Globalization;

namespace Prueba.Tecnica;

public class MoneyParts
{
    private static readonly decimal[] denominaciones =  { 0.05m,0.1m,0.2m,0.5m,1,2,5,10,20,50,100,200 };
    public IEnumerable<IEnumerable<decimal>> Build(string montoSoles)
    {
        decimal monto=decimal.Parse(montoSoles,CultureInfo.InvariantCulture);
        var result=new List<List<decimal>>();
        BuscarConbinacion(monto,0, new List<decimal>(), result);
        return result;

    }
    private void BuscarConbinacion(decimal target,int start, List<decimal> actualCombinacion, List<List<decimal>> result)
    {
        if (target == 0)
        {
            result.Add(new List<decimal>(actualCombinacion));
            return;
        }
        for (int i = start;i<denominaciones.Length;i++) 
        {
            if (denominaciones[i] <= target)
            {
                actualCombinacion.Add(denominaciones[i]);
                BuscarConbinacion(target - denominaciones[i],i, actualCombinacion, result);
                actualCombinacion.RemoveAt(actualCombinacion.Count - 1);
            }
        }
    }
}
