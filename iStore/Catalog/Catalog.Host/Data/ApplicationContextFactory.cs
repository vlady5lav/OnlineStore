using Microsoft.EntityFrameworkCore.Design;

namespace Catalog.Host.Data;

public class ApplicationContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        IConfiguration GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            return builder.Build();
        }

        var configuration = GetConfiguration();

        var dbContextOptionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

        dbContextOptionsBuilder.UseNpgsql(
            configuration["ConnectionString"],
            s => s.CommandTimeout(30));

        return new ApplicationDbContext(dbContextOptionsBuilder.Options);
    }
}
