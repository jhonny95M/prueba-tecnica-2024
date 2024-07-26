using Microsoft.Extensions.Diagnostics.HealthChecks;
using Npgsql;

namespace WebApi_Real_Plaza.HealthChecks
{
    public class PostgreSqlHealthCheck : IHealthCheck
    {
        private readonly string connectionString;

        public PostgreSqlHealthCheck(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                using var connection = new NpgsqlConnection(connectionString);
                await connection.OpenAsync(cancellationToken);
                return HealthCheckResult.Healthy();
            }
            catch (Exception ex)
            {
                return HealthCheckResult.Unhealthy(ex.Message);
            }
        }
    }
}
